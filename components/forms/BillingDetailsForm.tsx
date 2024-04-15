"use client";

import { TBillingSchema, billingSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputBox from "../ui/InputBox";
import CountryList from "../utility/CountryList";
import {
  createBillingDetail,
  updateBillingDetail,
} from "@/libs/actions/billing.actions";
import { usePathname, useRouter } from "next/navigation";
import { billingDetailsDefaultValues } from "@/constants";

type BillingDetailsForm = {
  type: string;
  detail?: TBilling;
};

const BillingDetailsForm = ({ type, detail }: BillingDetailsForm) => {
  const pathname = usePathname();
  const router = useRouter();

  // Set initial form values based on the operation type.
  // If editing an existing billing detail, use its details; otherwise, use default values.
  const initialValues =
    detail && type === "edit"
      ? {
          ...detail,
        }
      : billingDetailsDefaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<TBillingSchema>({
    resolver: zodResolver(billingSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: TBillingSchema) => {
    // If creating a new billing detail, send a request to the create billing detail endpoint.
    if (type === "create") {
      try {
        const newBillingDetail = await createBillingDetail({
          detail: { ...data, isDefault: false },
          path: pathname,
        });

        // If the newBillingDetail is successfully created, navigate to the billing detail page and reset the form.
        if (newBillingDetail) {
          reset();
          router.push("/profile?menu=Billing+details");
        }
      } catch (error) {
        console.log(error);
      }
    }

    // If updating or editing existing billing detail, send a request to the update billing detail endpoint.
    if (type === "edit") {
      // If the detail to edit doesn't exist, navigate back.
      if (!detail) {
        router.back();
        return;
      }

      try {
        const updatedBillingDetail = await updateBillingDetail({
          detailId: detail._id,
          detail: data,
          path: pathname,
        });

        // If the billing detail is successfully updated, navigate to the billing detail page and reset the form.
        if (updatedBillingDetail) {
          reset();
          router.push("/profile?menu=Billing+details");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m:w-full xl:w-[50%]">
      <div className="flex items-center gap-6 justify-between mb-6 m:flex-col xl:flex-col">
        <InputBox
          inputRegister={register("firstname")}
          label="First name"
          htmlFor="firstname"
          inputType="text"
          error={
            errors.firstname && (
              <p className="text-red-500">{`${errors.firstname.message}`}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("lastname")}
          label="Last name"
          htmlFor="lastname"
          inputType="text"
          error={
            errors.lastname && (
              <p className="text-red-500">{`${errors.lastname.message}`}</p>
            )
          }
        />
      </div>
      <div className="flex flex-col gap-6">
        <InputBox
          inputRegister={register("email")}
          label="Email"
          htmlFor="email"
          inputType="email"
          error={
            errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )
          }
        />
        <CountryList
          setValue={setValue}
          error={
            errors.country && (
              <p className="text-red-500">{`${errors.country.message}`}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("address")}
          label="Street address"
          htmlFor="address"
          inputType="address"
          error={
            errors.address && (
              <p className="text-red-500">{`${errors.address.message}`}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("city")}
          label="Town / City"
          htmlFor="city"
          inputType="text"
          error={
            errors.city && (
              <p className="text-red-500">{`${errors.city.message}`}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("zipcode")}
          label="ZIP Code"
          htmlFor="zipcode"
          inputType="number"
          error={
            errors.zipcode && (
              <p className="text-red-500">{`${errors.zipcode.message}`}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("phone")}
          label="Phone"
          htmlFor="phone"
          inputType="number"
          error={
            errors.phone && (
              <p className="text-red-500">{`${errors.phone.message}`}</p>
            )
          }
        />
      </div>
      <button
        type="submit"
        className={`mt-6 p-3 disabled:bg-gray-100 disabled:text-[#272829] duration-200 transition disabled:duration-200 disabled:transition disabled:cursor-not-allowed ${
          isSubmitting
            ? "bg-gray-100 text-[#272829]"
            : "bg-[#272829] text-white"
        }`}
        disabled={isSubmitting ? true : false}
      >
        {isSubmitting
          ? "...submitting"
          : type === "create"
          ? "Create billing detail"
          : "Edit billing detail"}
      </button>
    </form>
  );
};

export default BillingDetailsForm;
