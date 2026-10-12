type ProductFields = {
  title: string;
  description: string | null;
  image: string | null;
  affiliateNetwork: string | null;
  affiliateUrl: string;
  asin: string | null;
};

type ProductRelations = {
  giftToolIds?: number[];
  attributeValueIds?: number[];
};

export type Product = ProductFields &
  ProductRelations & {
    id: number;
    createdAt: number;
  };

export type CreateProductInput = ProductFields & {
  giftToolIds?: number[];
};

export type ProductUpdate = Partial<ProductFields> & ProductRelations;

export type CreateProductRequest = CreateProductInput & {
  attributeValueIds?: number[];
};
