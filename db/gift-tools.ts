import { eq } from "drizzle-orm";
import { createDb } from "./client";
import { giftTools, giftToolAttributes } from "@/db/schema";

export async function getGiftTools(d1: D1Database) {
  const db = createDb(d1);

  const rows = await db
    .select({
      id: giftTools.id,
      name: giftTools.name,
      slug: giftTools.slug,
      attributeId: giftToolAttributes.attributeId,
    })
    .from(giftTools)
    .leftJoin(
      giftToolAttributes,
      eq(giftTools.id, giftToolAttributes.giftToolId),
    )
    .all();

  const grouped = rows.reduce(
    (acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          name: row.name,
          slug: row.slug,
          attributeIds: [],
        };
      }

      if (row.attributeId !== null) {
        acc[row.id].attributeIds.push(row.attributeId);
      }

      return acc;
    },
    {} as Record<
      number,
      {
        id: number;
        name: string;
        slug: string;
        attributeIds: number[];
      }
    >,
  );

  return Object.values(grouped);
}

export type GiftTools = Awaited<ReturnType<typeof getGiftTools>>;
