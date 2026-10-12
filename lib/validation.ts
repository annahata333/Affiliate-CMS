import type { CreateProductRequest, ProductUpdate } from "@/types/product";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateCreateProduct(
  data: unknown,
): data is CreateProductRequest {
  if (!isRecord(data)) {
    return false;
  }

  return (
    typeof data.title === "string" &&
    data.title.trim().length > 0 &&
    (typeof data.description === "string" || data.description === null) &&
    (typeof data.image === "string" || data.image === null) &&
    (typeof data.affiliateNetwork === "string" ||
      data.affiliateNetwork === null) &&
    typeof data.affiliateUrl === "string" &&
    data.affiliateUrl.trim().length > 0 &&
    (typeof data.asin === "string" || data.asin === null) &&
    (data.giftToolIds === undefined ||
      (Array.isArray(data.giftToolIds) &&
        data.giftToolIds.every((id) => Number.isInteger(id)))) &&
    (data.attributeValueIds === undefined ||
      (Array.isArray(data.attributeValueIds) &&
        data.attributeValueIds.every((id) => Number.isInteger(id))))
  );
}

export function validateProductUpdate(data: unknown): data is ProductUpdate {
  if (!isRecord(data)) {
    return false;
  }

  const allowedFields = new Set([
    "title",
    "description",
    "image",
    "affiliateNetwork",
    "affiliateUrl",
    "asin",
    "giftToolIds",
    "attributeValueIds",
  ]);

  const keys = Object.keys(data);

  // Require at least one field to update
  if (keys.length === 0 || keys.some((key) => !allowedFields.has(key))) {
    return false;
  }

  return (
    (data.title === undefined ||
      (typeof data.title === "string" && data.title.trim().length > 0)) &&
    (data.description === undefined ||
      typeof data.description === "string" ||
      data.description === null) &&
    (data.image === undefined ||
      typeof data.image === "string" ||
      data.image === null) &&
    (data.affiliateNetwork === undefined ||
      typeof data.affiliateNetwork === "string" ||
      data.affiliateNetwork === null) &&
    (data.affiliateUrl === undefined ||
      (typeof data.affiliateUrl === "string" &&
        data.affiliateUrl.trim().length > 0)) &&
    (data.asin === undefined ||
      typeof data.asin === "string" ||
      data.asin === null) &&
    (data.giftToolIds === undefined ||
      (Array.isArray(data.giftToolIds) &&
        data.giftToolIds.every((id) => Number.isInteger(id) && id > 0))) &&
    (data.attributeValueIds === undefined ||
      (Array.isArray(data.attributeValueIds) &&
        data.attributeValueIds.every((id) => Number.isInteger(id) && id > 0)))
  );
}
