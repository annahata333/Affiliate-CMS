import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getGiftTools } from "@/db/gift-tools";

export async function GET() {
  const { env } = getCloudflareContext();

  const giftTools = await getGiftTools(env.affiliate_cms_db);

  return NextResponse.json(giftTools);
}
