import { getProductService } from "@/services/products";
import { getAttributes } from "@/db/attributes";
import { getGiftTools } from "@/db/gift-tools";
import { getD1 } from "@/lib/cloudflare";

import ProductForm from "@/components/ProductForm/ProductForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  const d1 = await getD1();
  const product = await getProductService(d1, productId);
  const attributes = await getAttributes(d1);
  const giftTools = await getGiftTools(d1);

  return (
    <div>
      <h1>Edit Product</h1>{" "}
      <ProductForm
        data={product!}
        attributes={attributes}
        giftTools={giftTools}
      />
    </div>
  );
}
