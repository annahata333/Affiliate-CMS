import { Product } from "@/types/product";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  console.log("products", products);
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
