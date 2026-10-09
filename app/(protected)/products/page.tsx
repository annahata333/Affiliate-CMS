import { getProductsService } from "@/services/products";
import { getD1 } from "@/lib/cloudflare";

import ProductGrid from "@/components/ProductGrid/ProductGrid";

import styles from "./ProductsPage.module.css";

export default async function ProductsPage() {
  const d1 = await getD1();
  const products = await getProductsService(d1);

  const selectFile = () => document.getElementById("product-import")?.click();

  return (
    <>
      <div className={styles.headingWrapper}>
        <h1>Products</h1>
        <button className="primary-btn">Import</button>

        <input type="file" hidden id="product-import" />
      </div>
      {products && products.length ? (
        <ProductGrid products={products} />
      ) : (
        <p>No Products Added</p>
      )}
    </>
  );
}
