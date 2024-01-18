"use client";

import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import ReviewForm from "../ui/ReviewForm";

type Prop = {
  product: IProduct;
};

const ProductTabs = ({ product }: Prop) => {
  const [activeTab, setActiveTab] = useState(0);

  function renderStars(rating: number, totalStars = 5) {
    let stars = [];
    // Render filled stars
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Image
          key={`filled-${i}`}
          src="/star.svg"
          width={12}
          height={12}
          alt="filled star"
        />
      );
    }
    // Render grayed-out stars
    for (let i = rating; i < totalStars; i++) {
      stars.push(
        <Image
          key={`gray-${i}`}
          src="/gray-star.svg"
          width={12}
          height={12}
          alt="gray star"
        />
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  }

  return (
    <div className="w-full mt-12">
      <span className="flex items-center justify-center gap-12 mb-4">
        <p
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition ${
            activeTab === 0 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(0)}
        >
          description
        </p>
        <p
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition ${
            activeTab === 1 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(1)}
        >
          additional information
        </p>
        <p
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition ${
            activeTab === 2 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(2)}
        >
          reviews
        </p>
      </span>
      <div className="border-[1px]"></div>
      <div>
        {activeTab === 0 && (
          <div className="w-full flex items-center justify-center mt-8">
            <p className="w-[65%] text-sm">{product.description}</p>
          </div>
        )}
        {activeTab === 1 && (
          <div className="flex items-center justify-center mt-8">
            <span className="w-[65%] border-[1px] py-4">
              <span className="text-sm border-r-[1px] p-4">model</span>
              {product.additional_information?.model?.map((info) => (
                <span
                  key={info.id}
                  className="text-sm py-4 px-2"
                >{`${info.text},`}</span>
              ))}
            </span>
          </div>
        )}
        {activeTab === 2 && (
          <>
            <div className="flex items-center justify-center mt-8">
              <span className="w-[65%] p-8 border-[1px] border-gray-400 flex flex-col item-center gap-12">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews?.map((review, index) => (
                    <span
                      key={index}
                      className={`relative flex items-start justify-between overflow-hidden pb-10 ${
                        product.reviews && index === product.reviews.length - 1
                          ? "border-b-0"
                          : "border-b-[1px] border-gray-400"
                      }`}
                    >
                      <span className="flex items-start gap-6">
                        <Image
                          className="rounded-[50%]"
                          src="/avatar.png"
                          width={70}
                          height={70}
                          alt="avatar"
                        />
                        <span>
                          <span className="flex items-start flex-col gap-3">
                            <p className="text-sm">{review.date}</p>
                            <p className="text-xl font-medium">{review.user}</p>
                            <p className="text-sm">{review.comment}</p>
                          </span>
                        </span>
                      </span>

                      <span className="absolute top-0 right-0">
                        {renderStars(review.rating)}
                      </span>
                    </span>
                  ))
                ) : (
                  <p className="text-center">No reviews to display</p>
                )}
              </span>
            </div>
            <ReviewForm product={product} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
