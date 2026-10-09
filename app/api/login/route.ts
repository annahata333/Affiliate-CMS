import { NextRequest, NextResponse } from "next/server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createSession } from "@/db/sessions";

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });

  const { username, password }: { username: string; password: string } =
    await request.json();

  if (username !== env.CMS_USERNAME || password !== env.CMS_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = crypto.randomUUID();

  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;

  await createSession(env.affiliate_cms_db, token, expiresAt);

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("cms_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return response;
}
