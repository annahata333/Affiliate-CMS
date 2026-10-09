import type { Dispatch, SetStateAction } from "react";

import { Attributes } from "@/db/attributes";

import styles from "./ProductAttributes.module.css";

export default function ProductAttributes({
  attributes,
  selectedAttributeValueIds,
  setSelectedAttributeValueIds,
}: {
  attributes: Attributes;
  selectedAttributeValueIds: number[];
  setSelectedAttributeValueIds: Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <div>
      {attributes &&
        attributes.map((attr) => (
          <div key={attr.id}>
            <h4>{attr.name}</h4>

            {attr.values.map((value) => (
              <label className={styles.check} key={value.id}>
                <input
                  type="checkbox"
                  value={value.id}
                  checked={selectedAttributeValueIds.includes(value.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAttributeValueIds((prev) => [
                        ...prev,
                        value.id,
                      ]);
                    } else {
                      setSelectedAttributeValueIds((prev) =>
                        prev.filter((id) => id !== value.id),
                      );
                    }
                  }}
                />
                <span>{value.name}</span>
              </label>
            ))}
          </div>
        ))}
    </div>
  );
}
