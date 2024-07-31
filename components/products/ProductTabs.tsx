"use client";

import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import ReviewForm from "../forms/ReviewForm";
import DOMPurify from "dompurify";

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

  const longDescription = DOMPurify.sanitize(
    product.description ? product.description : ""
  );

  return (
    <div className="w-full mt-12">
      <span className="flex items-center justify-center gap-12 mb-4 m:flex-col m:items-start m:gap-6">
        <button
          type="button"
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition m:text-base ${
            activeTab === 0 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(0)}
        >
          description
        </button>
        <button
          type="button"
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition m:text-base ${
            activeTab === 1 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(1)}
        >
          additional information
        </button>
        <button
          type="button"
          className={`capitalize text-sm cursor-pointer font-medium hover:text-red-400 hover:transition m:text-base ${
            activeTab === 2 && "text-red-400 border-b-[1px] border-b-red-400"
          }`}
          onClick={() => setActiveTab(2)}
        >
          reviews
        </button>
      </span>
      <div className="border-[1px]"></div>
      <div>
        {activeTab === 0 && (
          <div className="w-full flex items-center justify-center mt-8">
            <p
              className="w-[65%] text-sm m:w-full"
              dangerouslySetInnerHTML={{
                __html: longDescription,
              }}
            />
          </div>
        )}
        {activeTab === 1 && (
          <div className="flex items-center justify-center mt-8">
            <span className="w-[65%] flex border-[1px] m:w-full">
              <span className="text-sm border-r-[1px] p-4">model</span>
              <div className="flex flex-wrap items-center">
                {product.additional_information?.model?.map((info) => (
                  <span
                    key={info._id}
                    className="text-sm px-2"
                  >{`${info.text},`}</span>
                ))}
              </div>
            </span>
          </div>
        )}
        {activeTab === 2 && (
          <>
            <div className="flex items-center justify-center mt-8">
              <span className="w-[65%] p-8 border-[1px] border-gray-400 flex flex-col item-center gap-12 m:w-full sm:p-3">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews?.map((review, index) => (
                    <>
                      {/*------------------------------ Larger screens --------------*/}
                      <span
                        key={`review-${index}`}
                        className={`relative flex items-start justify-between overflow-hidden pb-10 m:hidden ${
                          product.reviews &&
                          index === product.reviews.length - 1
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
                              <p className="text-xl font-medium">
                                {review.user}
                              </p>
                              <p className="text-sm">{review.comment}</p>
                            </span>
                          </span>
                        </span>

                        <span className="absolute top-0 right-0">
                          {renderStars(review.rating)}
                        </span>
                      </span>
                      {/*----------------------------- Mobile screens------------------- */}
                      <span
                        key={`review-${index}`}
                        className={`relative flex items-start justify-between overflow-hidden pb-10 sm:pt-8 xl:hidden xxl:hidden xxxl:hidden ultra:hidden ${
                          product.reviews &&
                          index === product.reviews.length - 1
                            ? "border-b-0"
                            : "border-b-[1px] border-gray-400"
                        }`}
                      >
                        <span className="flex items-start gap-6">
                          <Image
                            className="rounded-[50%]"
                            src="/avatar.png"
                            width={35}
                            height={35}
                            alt="avatar"
                          />
                          <span>
                            <span className="flex items-start flex-col gap-3">
                              <p className="text-sm">{review.date}</p>
                              <p className="text-base font-medium">
                                {review.user}
                              </p>
                              <p className="text-sm">{review.comment}</p>
                            </span>
                          </span>
                        </span>

                        <span className="absolute top-0 right-0 sm:left-14">
                          {renderStars(review.rating)}
                        </span>
                      </span>
                    </>
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
