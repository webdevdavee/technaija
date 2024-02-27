import InputBox from "../ui/InputBox";
import CountryList from "./CountryList";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { TCheckoutSchema } from "@/libs/zod";
import EventButton from "../ui/EventButton";

type CheckoutDetailsProp = {
  handleSubmit: UseFormHandleSubmit<{
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
  }>;
  onSubmit: (data: TCheckoutSchema) => Promise<void>;
  register: UseFormRegister<{
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
  }>;
  setValue: UseFormSetValue<{
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
  }>;
  errors: FieldErrors<{
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
  }>;
};

const CheckoutDetails = ({
  handleSubmit,
  onSubmit,
  register,
  setValue,
  errors,
}: CheckoutDetailsProp) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[60%]">
      <h2 className="mb-8 text-lg font-medium">Billing details</h2>
      <div className="flex items-center gap-6 justify-between mb-6">
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
      <EventButton
        type="submit"
        text="Finish"
        classname="py-3 px-5 bg-[#272829] text-white text-sm mt-4"
      />
    </form>
  );
};

export default CheckoutDetails;
