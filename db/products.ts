import { eq, inArray } from "drizzle-orm";

import { createDb } from "./client";
import {
  products,
  productAttributes,
  attributeValues,
  attributes,
  giftTools,
  productGiftTools,
} from "@/db/schema";
import { Product, ProductUpdate } from "@/types/product";

export class InvalidGiftToolIdsError extends Error {
  constructor() {
    super("One or more gift tool IDs are invalid");
    this.name = "InvalidGiftToolIdsError";
  }
}

async function validateGiftToolIds(
  d1: D1Database,
  giftToolIds: unknown,
): Promise<number[]> {
  if (
    !Array.isArray(giftToolIds) ||
    !giftToolIds.every(
      (giftToolId) =>
        typeof giftToolId === "number" && Number.isSafeInteger(giftToolId),
    )
  ) {
    throw new InvalidGiftToolIdsError();
  }

  const uniqueGiftToolIds = [...new Set(giftToolIds)];

  if (uniqueGiftToolIds.length === 0) {
    return uniqueGiftToolIds;
  }

  const db = createDb(d1);
  const matchingGiftTools = await db
    .select({ id: giftTools.id })
    .from(giftTools)
    .where(inArray(giftTools.id, uniqueGiftToolIds))
    .all();

  if (matchingGiftTools.length !== uniqueGiftToolIds.length) {
    throw new InvalidGiftToolIdsError();
  }

  return uniqueGiftToolIds;
}

export async function getProducts(d1: D1Database) {
  const db = createDb(d1);

  const productRows = await db.select().from(products);

  const giftToolRows = await db
    .select({
      productId: productGiftTools.productId,
      giftToolId: productGiftTools.giftToolId,
    })
    .from(productGiftTools)
    .all();

  const attributeRows = await db
    .select({
      productId: productAttributes.productId,
      attributeName: attributes.name,
      attributeValue: attributeValues.name,
    })
    .from(productAttributes)
    .innerJoin(
      attributeValues,
      eq(productAttributes.attributeValueId, attributeValues.id),
    )
    .innerJoin(attributes, eq(attributeValues.attributeId, attributes.id));

  return productRows.map((product) => {
    const productAttributesForProduct = attributeRows.filter(
      (row) => row.productId === product.id,
    );

    const groupedAttributes: Record<string, string[]> = {};

    for (const row of productAttributesForProduct) {
      if (!groupedAttributes[row.attributeName]) {
        groupedAttributes[row.attributeName] = [];
      }

      groupedAttributes[row.attributeName].push(row.attributeValue);
    }

    const giftToolIds = giftToolRows
      .filter((row) => row.productId === product.id)
      .map((row) => row.giftToolId)
      .sort((first, second) => first - second);

    return {
      ...product,
      giftToolIds,
      attributes: groupedAttributes,
    };
  });
}

export async function getProduct(d1: D1Database, id: number) {
  const db = createDb(d1);

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();

  if (!product) {
    return null;
  }

  const [giftToolRows, rows] = await Promise.all([
    db
      .select({ giftToolId: productGiftTools.giftToolId })
      .from(productGiftTools)
      .where(eq(productGiftTools.productId, id))
      .all(),
    db
      .select({
        attributeId: attributes.id,
        attributeValueId: attributeValues.id,
      })
      .from(productAttributes)
      .innerJoin(
        attributeValues,
        eq(productAttributes.attributeValueId, attributeValues.id),
      )
      .innerJoin(attributes, eq(attributeValues.attributeId, attributes.id))
      .where(eq(productAttributes.productId, id))
      .all(),
  ]);

  return {
    ...product,
    giftToolIds: giftToolRows
      .map((row) => row.giftToolId)
      .sort((first, second) => first - second),
    attributeIds: [...new Set(rows.map((row) => row.attributeId))],
    attributeValueIds: rows.map((row) => row.attributeValueId),
  };
}

export async function createProduct(d1: D1Database, data: Product) {
  const db = createDb(d1);
  const { giftToolIds, ...productData } = data;
  const validatedGiftToolIds = await validateGiftToolIds(
    d1,
    giftToolIds === undefined ? [] : giftToolIds,
  );

  const [product] = await db
    .insert(products)
    .values({
      ...productData,
      createdAt: Date.now(),
    })
    .returning({
      id: products.id,
    });

  if (validatedGiftToolIds.length > 0) {
    await db.insert(productGiftTools).values(
      validatedGiftToolIds.map((giftToolId) => ({
        productId: product.id,
        giftToolId,
      })),
    );
  }

  return product;
}

export async function updateProduct(
  d1: D1Database,
  id: number,
  data: ProductUpdate,
) {
  const db = createDb(d1);

  const { attributeValueIds, giftToolIds, ...productData } = data;
  const validatedGiftToolIds =
    giftToolIds === undefined
      ? undefined
      : await validateGiftToolIds(d1, giftToolIds);

  if (Object.values(productData).some((value) => value !== undefined)) {
    await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .run();
  }

  if (validatedGiftToolIds !== undefined) {
    await db
      .delete(productGiftTools)
      .where(eq(productGiftTools.productId, id))
      .run();

    if (validatedGiftToolIds.length > 0) {
      await db.insert(productGiftTools).values(
        validatedGiftToolIds.map((giftToolId) => ({
          productId: id,
          giftToolId,
        })),
      );
    }
  }

  if (attributeValueIds !== undefined) {
    // Remove existing attribute values
    await db
      .delete(productAttributes)
      .where(eq(productAttributes.productId, id))
      .run();

    // Add the new attribute values
    if (attributeValueIds.length > 0) {
      await db
        .insert(productAttributes)
        .values(
          attributeValueIds.map((attributeValueId) => ({
            productId: id,
            attributeValueId,
          })),
        )
        .run();
    }
  }

  return getProduct(d1, id);
}

export async function deleteProduct(d1: D1Database, id: number) {
  const db = createDb(d1);

  return db.delete(products).where(eq(products.id, id));
}
