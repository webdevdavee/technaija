import InputBox from "../ui/InputBox";
import TextArea from "../ui/TextArea";
import StarRating from "../utility/StarRating";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "@/libs/utils";
import { TReviewSchema, reviewSchema } from "@/libs/zod";
import { IProduct } from "@/libs/database/models/product.model";
import { updateProduct } from "@/libs/actions/product.action";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

type ReviewFormProp = {
  product: IProduct;
};

const ReviewForm = ({ product }: ReviewFormProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TReviewSchema>({ resolver: zodResolver(reviewSchema) });

  const onSubmit = async (data: TReviewSchema) => {
    const newReview = { ...data, date: formatDate(new Date()) as string };
    const updatedProduct = {
      ...product,
      reviews: product.reviews && [...product.reviews, newReview],
    };

    await updateProduct({
      updatedProduct,
      path: `/product/${product._id}`,
    });

    reset();
  };

  return (
    <section className="flex items-center justify-center mt-12">
      <div className="w-[65%] m:w-full">
        <h1 className="text-2xl font-medium mb-4 text-center">Add a review</h1>
        <p className="text-sm text-center">
          Your email address will not be published. Required fields are marked *
        </p>
        <span className="flex flex-col items-start gap-2 justify-center mt-12">
          <p className="text-base font-light">
            Your Rating <span className="text-red-400">*</span>
          </p>
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <StarRating
            setValue={setValue}
            error={
              errors.rating && (
                <p className="text-red-500">{`${errors.rating.message}`}</p>
              )
            }
          />
          <TextArea
            inputRegister={register("comment")}
            label="Your review"
            htmlFor="Your review"
            error={
              errors.comment && (
                <p className="text-red-500">{`${errors.comment.message}`}</p>
              )
            }
          />
          <span className="flex items-start justify-between gap-8 m:flex-col">
            <InputBox
              inputRegister={register("user")}
              label="Name"
              htmlFor="Name"
              inputType={"text"}
              error={
                errors.user && (
                  <p className="text-red-500">{`${errors.user.message}`}</p>
                )
              }
            />
            <InputBox
              inputRegister={register("email")}
              label="Email"
              htmlFor="Email"
              inputType={"text"}
              error={
                errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )
              }
            />
          </span>
          <span className="flex gap-1 items-center m:gap-3">
            <input type="checkbox" {...register("saveDetails")} />
            <p className="text-sm">
              Save my name, email, and website in this browser for the next time
              I comment.
            </p>
          </span>
          <SignedOut>
            <Link href="/sign-in">
              <button
                disabled={isSubmitting}
                className="w-fit py-3 px-12 bg-[#272829] text-white disabled:bg-gray-300 transition"
                type="submit"
              >
                {isSubmitting ? "...submitting" : "Submit"}
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <button
              disabled={isSubmitting}
              className="w-fit py-3 px-12 bg-[#272829] text-white disabled:bg-gray-300 transition"
              type="submit"
            >
              {isSubmitting ? "...submitting" : "Submit"}
            </button>
          </SignedIn>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
