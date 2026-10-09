"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { GiftTools } from "@/db/gift-tools";

export default function ProductGiftTools({
  giftTools,
  selectedGiftToolIds,
  setSelectedGiftToolIds,
}: {
  giftTools: GiftTools;
  selectedGiftToolIds: number[];
  setSelectedGiftToolIds: Dispatch<SetStateAction<number[]>>;
}) {
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setSelectedGiftToolIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <div className="relative w-full max-w-md">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Gift Tools
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm hover:bg-gray-50"
      >
        <span className="text-gray-700">
          {selectedGiftToolIds.length > 0
            ? `${selectedGiftToolIds.length} selected`
            : "Select gift tools"}
        </span>

        <span className="text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          {giftTools.map((tool) => (
            <label
              key={tool.id}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedGiftToolIds.includes(tool.id)}
                onChange={() => handleCheckboxChange(tool.id)}
                className="!h-3.5 !w-3.5 shrink-0 rounded border-gray-300"
              />

              <span className="text-sm text-gray-700">{tool.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
