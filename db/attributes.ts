import { relations } from "drizzle-orm";

import { createDb } from "./client";
import { attributes, attributeValues, productAttributes } from "./schema";

export const attributesRelations = relations(attributes, ({ many }) => ({
  values: many(attributeValues),
}));

export const attributeValuesRelations = relations(
  attributeValues,
  ({ one }) => ({
    attribute: one(attributes, {
      fields: [attributeValues.attributeId],
      references: [attributes.id],
    }),
  }),
);

export async function getAttributes(d1: D1Database) {
  const db = createDb(d1);

  return db.query.attributes.findMany({
    with: {
      values: true,
    },
  });
}

export async function addProductAttributes(
  d1: D1Database,
  productId: number,
  attributeValueIds: number[],
) {
  const db = createDb(d1);

  if (attributeValueIds.length === 0) {
    return;
  }

  await db.insert(productAttributes).values(
    attributeValueIds.map((attributeValueId) => ({
      productId,
      attributeValueId,
    })),
  );
}

export type Attributes = Awaited<ReturnType<typeof getAttributes>>;
