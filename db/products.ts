import { eq } from "drizzle-orm";

import { createDb } from "./client";
import {
  products,
  productAttributes,
  attributeValues,
  attributes,
} from "@/db/schema";
import { Product, ProductUpdate } from "@/types/product";

export async function getProducts(d1: D1Database) {
  const db = createDb(d1);

  const productRows = await db.select().from(products);

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

    return {
      ...product,
      giftToolIds: JSON.parse(product.giftToolIds || "[]") as number[],
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

  const parsedGiftToolIds = JSON.parse(product.giftToolIds || "[]");

  const giftToolIds = Array.isArray(parsedGiftToolIds)
    ? parsedGiftToolIds
    : [parsedGiftToolIds];

  const rows = await db
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
    .all();

  return {
    ...product,
    giftToolIds,
    attributeIds: [...new Set(rows.map((row) => row.attributeId))],
    attributeValueIds: rows.map((row) => row.attributeValueId),
  };
}

export async function createProduct(d1: D1Database, data: Product) {
  const db = createDb(d1);

  const [product] = await db
    .insert(products)
    .values({
      ...data,
      giftToolIds: JSON.stringify(data.giftToolIds ?? []),
      createdAt: Date.now(),
    })
    .returning({
      id: products.id,
    });

  return product;
}

export async function updateProduct(
  d1: D1Database,
  id: number,
  data: ProductUpdate,
) {
  const db = createDb(d1);

  const { attributeValueIds, ...productData } = data;

  // Update the product
  await db
    .update(products)
    .set({
      ...productData,
      giftToolIds: JSON.stringify(productData.giftToolIds ?? []),
    })
    .where(eq(products.id, id))
    .run();

  // Remove existing attribute values
  await db
    .delete(productAttributes)
    .where(eq(productAttributes.productId, id))
    .run();

  // Add the new attribute values
  if (attributeValueIds?.length) {
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

  return getProduct(d1, id);
}

export async function deleteProduct(d1: D1Database, id: number) {
  const db = createDb(d1);

  return db.delete(products).where(eq(products.id, id));
}
