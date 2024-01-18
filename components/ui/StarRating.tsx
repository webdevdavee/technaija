import Image from "next/image";
import { useState } from "react";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import { TReviewSchema } from "@/libs/zod";

type StarRatingProp = {
  setValue: UseFormSetValue<TReviewSchema>;
  error?: any;
};

const StarRating = ({ setValue, error }: StarRatingProp) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setValue("rating", index + 1);
  };

  const stars = ["1", "2", "3", "4", "5"];

  return (
    <section>
      <div className="flex items-center gap-1">
        {stars.map((_, index) => (
          <Image
            className="cursor-pointer transition"
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => handleClick(index)}
            src={`${index <= activeIndex ? "/star.svg" : "/gray-star.svg"}`}
            width={14}
            height={14}
            alt="star"
          />
        ))}
      </div>
      {error}
    </section>
  );
};

export default StarRating;
