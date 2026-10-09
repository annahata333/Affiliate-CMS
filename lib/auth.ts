import { cookies } from "next/headers";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSession } from "@/db/sessions";

export async function isAuthenticated() {
  const { env } = await getCloudflareContext({ async: true });

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("cms_session")?.value;

  if (!sessionToken) {
    return false;
  }

  const session = await getSession(env.affiliate_cms_db, sessionToken);

  if (!session) {
    return false;
  }

  if (session.expiresAt < Date.now()) {
    return false;
  }

  return true;
}
