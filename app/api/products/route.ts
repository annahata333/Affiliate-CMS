import { NextResponse, NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  getProducts,
  createProduct,
  InvalidGiftToolIdsError,
} from "@/db/products";
import { addProductAttributes } from "@/db/attributes";
import { isAuthenticated } from "@/lib/auth";

import { CreateProductRequest } from "@/types/product";

export async function GET() {
  const { env } = getCloudflareContext();

  const products = await getProducts(env.affiliate_cms_db);

  return NextResponse.json(products, {
    headers: {
      "Access-Control-Allow-Origin": "https://nice-gift-ideas.com",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { env } = getCloudflareContext();

  const data = (await request.json()) as CreateProductRequest;

  const { attributeValueIds, ...productData } = data;

  try {
    const response = await createProduct(env.affiliate_cms_db, productData);

    await addProductAttributes(
      env.affiliate_cms_db,
      response.id,
      attributeValueIds,
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof InvalidGiftToolIdsError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
}
