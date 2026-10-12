import {
  integer,
  sqliteTable,
  text,
  unique,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import { relations } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  affiliateNetwork: text("affiliate_network"),
  affiliateUrl: text("affiliate_url").notNull(),
  asin: text("asin"),
  createdAt: integer("created_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey(),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at").notNull(),
});

export const attributes = sqliteTable("attributes", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: integer("created_at").notNull(),
});

export const attributeValues = sqliteTable(
  "attribute_values",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    attributeId: integer("attribute_id")
      .notNull()
      .references(() => attributes.id, {
        onDelete: "cascade",
      }),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),

    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    unique("attribute_values_attribute_slug_unique").on(
      table.attributeId,
      table.slug,
    ),
  ],
);

export const productAttributes = sqliteTable(
  "product_attributes",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),

    attributeValueId: integer("attribute_value_id")
      .notNull()
      .references(() => attributeValues.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.productId, table.attributeValueId],
    }),
  ],
);

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

export const giftTools = sqliteTable("gift_tools", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),
});

export const productGiftTools = sqliteTable(
  "product_gift_tools",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),

    giftToolId: integer("gift_tool_id")
      .notNull()
      .references(() => giftTools.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.productId, table.giftToolId],
    }),
  ],
);

export const giftToolAttributes = sqliteTable(
  "gift_tool_attributes",
  {
    giftToolId: integer("gift_tool_id")
      .notNull()
      .references(() => giftTools.id, {
        onDelete: "cascade",
      }),

    attributeId: integer("attribute_id")
      .notNull()
      .references(() => attributes.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.giftToolId, table.attributeId],
    }),
  ],
);
