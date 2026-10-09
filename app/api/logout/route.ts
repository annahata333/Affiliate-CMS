import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { deleteSession } from "@/db/sessions";

export async function POST() {
  const { env } = getCloudflareContext();

  const cookieStore = await cookies();
  const token = cookieStore.get("cms_session")?.value;

  if (token) {
    await deleteSession(env.affiliate_cms_db, token);
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete("cms_session");

  return response;
}
