import { getAttributes } from "@/db/attributes";

export async function getAttributesService(d1: D1Database) {
  return getAttributes(d1);
}
