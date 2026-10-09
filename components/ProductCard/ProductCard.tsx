import Link from "next/link";
import { Product } from "@/types/product";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Link href={`/products/${product.id}`}>
        <div className={styles.imageContainer}>
          {product.image && (
            <img src={product.image || ""} alt={product.title} />
          )}
        </div>
        <h2>{product.title}</h2>
      </Link>
    </article>
  );
}
