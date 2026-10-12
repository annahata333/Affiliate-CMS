import { NextRequest, NextResponse } from "next/server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createSession } from "@/db/sessions";
import { isRecord } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });

  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  if (
    !isRecord(data) ||
    typeof data.username !== "string" ||
    typeof data.password !== "string" ||
    !data.username.trim() ||
    !data.password
  ) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  const { username, password } = data;

  if (username !== env.CMS_USERNAME || password !== env.CMS_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Keep the rest of your existing code here:
  // Generate token, create session, set cookie, return response.
}
