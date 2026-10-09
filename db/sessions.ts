import { eq } from "drizzle-orm";

import { createDb } from "./client";
import { sessions } from "./schema";

export async function createSession(
  d1: D1Database,
  token: string,
  expiresAt: number,
) {
  const db = createDb(d1);

  return db
    .insert(sessions)
    .values({
      token,
      expiresAt,
    })
    .run();
}

export async function getSession(d1: D1Database, token: string) {
  const db = createDb(d1);

  return db.select().from(sessions).where(eq(sessions.token, token)).get();
}

export async function deleteSession(d1: D1Database, token: string) {
  const db = createDb(d1);

  return db.delete(sessions).where(eq(sessions.token, token)).run();
}
