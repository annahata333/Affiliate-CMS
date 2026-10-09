export type Product = {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  affiliateNetwork: string | null;
  affiliateUrl: string;
  asin: string | null;
  createdAt: number;
  attributeValueIds?: number[];
  giftToolIds?: number[];
};

export type ProductUpdate = {
  title?: string;
  description?: string;
  image?: string;
  affiliateNetwork?: string;
  affiliateUrl?: string;
  asin: string | null;
  attributeValueIds?: number[];
  giftToolIds?: number[];
};

export type CreateProductRequest = Product & {
  attributeValueIds: number[];
};
