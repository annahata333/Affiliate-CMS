import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { updateProduct, deleteProduct } from "@/db/products";
import { isAuthenticated } from "@/lib/auth";
import { validateProductUpdate } from "@/lib/validation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { env } = getCloudflareContext();
  const { id } = await params;

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  if (!validateProductUpdate(data)) {
    return NextResponse.json(
      { error: "Request body must be an object with at least one valid field" },
      { status: 400 },
    );
  }

  const product = await updateProduct(env.affiliate_cms_db, Number(id), {
    title: data.title,
    image: data.image,
    description: data.description,
    affiliateNetwork: data.affiliateNetwork,
    affiliateUrl: data.affiliateUrl,
    asin: data.asin,
    attributeValueIds: data.attributeValueIds,
    giftToolIds: data.giftToolIds,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { env } = getCloudflareContext();
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  await deleteProduct(env.affiliate_cms_db, productId);

  return NextResponse.json({ success: true });
}
