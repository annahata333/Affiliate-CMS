"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Product } from "@/types/product";
import { Attributes } from "@/db/attributes";
import { GiftTools } from "@/db/gift-tools";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import GiftToolsDropdown from "../GiftToolsDropdown/GiftToolsDropdown";
import ProductAttributes from "@/components/ProductAttributes/ProductAttributes";

import styles from "./ProductForm.module.css";

export default function ProductForm({
  data,
  attributes,
  giftTools,
}: {
  data?: Product;
  attributes: Attributes;
  giftTools: GiftTools;
}) {
  const [title, setTitle] = useState(data?.title ?? "");
  const [description, setDescription] = useState(data?.description ?? "");
  const [image, setImage] = useState(data?.image ?? "");
  const [asin, setAsin] = useState(data?.asin ?? "");
  const [affiliateNetwork, setAffiliateNetwork] = useState(
    data?.affiliateNetwork ?? "",
  );
  const [affiliateUrl, setAffiliateUrl] = useState(data?.affiliateUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAttributeValueIds, setSelectedAttributeValueIds] = useState<
    number[]
  >(data?.attributeValueIds ?? []);
  const [selectedGiftToolIds, setSelectedGiftToolIds] = useState<number[]>(
    data?.giftToolIds ?? [],
  );

  const visibleAttributeIds = giftTools
    .filter((tool) => selectedGiftToolIds.includes(tool.id))
    .flatMap((tool) => tool.attributeIds);

  const visibleAttributes = attributes.filter((attr) =>
    visibleAttributeIds.includes(attr.id),
  );

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      if (data) {
        const response = await fetch(`/api/products/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            image,
            description,
            affiliateNetwork,
            affiliateUrl,
            asin,
            attributeValueIds: selectedAttributeValueIds,
            giftToolIds: selectedGiftToolIds,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();

        console.log(updatedProduct);
      } else {
        const response = await fetch(`/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            image,
            description,
            affiliateNetwork,
            affiliateUrl,
            asin,
            attributeValueIds: selectedAttributeValueIds,
            giftToolIds: selectedGiftToolIds,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create product");
        }

        const createdProduct = await response.json();

        console.log(createdProduct);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!data) return;

    try {
      const response = await fetch(`/api/products/${data.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      router.push("/");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {image && <img src={image} alt="" />}

        <label>Image Url</label>

        <input
          type="text"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>

        <textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Affiliate</label>

        <input
          type="text"
          value={affiliateNetwork}
          onChange={(e) => setAffiliateNetwork(e.target.value)}
        />

        <label>Affiliate Url</label>

        <input
          type="text"
          value={affiliateUrl}
          onChange={(e) => setAffiliateUrl(e.target.value)}
        />

        <label>ASIN</label>

        <input
          type="text"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
        />

        <GiftToolsDropdown
          giftTools={giftTools}
          selectedGiftToolIds={selectedGiftToolIds}
          setSelectedGiftToolIds={setSelectedGiftToolIds}
        />

        <ProductAttributes
          attributes={visibleAttributes}
          selectedAttributeValueIds={selectedAttributeValueIds}
          setSelectedAttributeValueIds={setSelectedAttributeValueIds}
        />

        <div className={styles.buttonWrapper}>
          <button onClick={() => setConfirmModalOpen(true)} className="delete">
            Delete
          </button>

          <button
            type="submit"
            className="rounded-md bg-yellow px-4 py-2 text-sm font-semibold text-purple-dark transition hover:bg-yellow-dark"
            disabled={loading}
          >
            {loading ? "Saving" : "Save"}
          </button>
        </div>
      </form>

      {confirmModalOpen && (
        <ConfirmModal
          deleteProduct={handleDelete}
          setConfirmModalOpen={setConfirmModalOpen}
        />
      )}
    </div>
  );
}
