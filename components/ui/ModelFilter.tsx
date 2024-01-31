"use client";

import Image from "next/image";
import { useState } from "react";

type ModelFilterProp = {
  models: string[];
};

const ModelFilter = ({ models }: ModelFilterProp) => {
  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-6">
        <button
          type="button"
          className="w-full flex items-center justify-between gap-5 border-b-[1px] border-b-solid border-gray-300 pb-4"
          onClick={handleShowFilter}
        >
          <h2>Model</h2>
          <Image
            className={`${
              showFilter
                ? "rotate-180 transition duration-150"
                : "transition duration-150"
            }`}
            src="/arrow-down.svg"
            width={25}
            height={25}
            alt="arrow"
          />
        </button>
        {showFilter && (
          <span className="flex flex-col gap-4">
            {models.map((model, index) => (
              <div key={index} className="flex items-center gap-3">
                <input type="checkbox" />
                <p className="text-sm text-gray-500">{model}</p>
              </div>
            ))}
          </span>
        )}
      </div>
    </section>
  );
};

export default ModelFilter;
