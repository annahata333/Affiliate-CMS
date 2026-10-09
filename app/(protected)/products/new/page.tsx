import { getD1 } from "@/lib/cloudflare";

import { getAttributes } from "@/db/attributes";
import { getGiftTools } from "@/db/gift-tools";
import ProductForm from "@/components/ProductForm/ProductForm";

export default async function NewProduct() {
  const d1 = await getD1();
  const attributes = await getAttributes(d1);
  const giftTools = await getGiftTools(d1);

  return (
    <div>
      <h1>New Product</h1>
      <ProductForm giftTools={giftTools} attributes={attributes} />
    </div>
  );
}
