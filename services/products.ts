import { getProducts, getProduct, updateProduct } from "@/db/products";
import { ProductUpdate } from "@/types/product";

export async function getProductsService(d1: D1Database) {
  return getProducts(d1);
}

export async function getProductService(d1: D1Database, id: number) {
  return getProduct(d1, id);
}

export async function updatetProductService(
  d1: D1Database,
  id: number,
  data: ProductUpdate,
) {
  return updateProduct(d1, id, data);
}
