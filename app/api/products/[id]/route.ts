import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import {
  updateProduct,
  deleteProduct,
  InvalidGiftToolIdsError,
} from "@/db/products";
import { ProductUpdate } from "@/types/product";
import { isAuthenticated } from "@/lib/auth";

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

  const data = (await request.json()) as ProductUpdate;

  try {
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
  } catch (error) {
    if (error instanceof InvalidGiftToolIdsError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
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

  await deleteProduct(env.affiliate_cms_db, Number(id));

  return NextResponse.json({ success: true });
}
