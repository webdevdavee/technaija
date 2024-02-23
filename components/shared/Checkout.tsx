"use client";

import CheckoutDetails from "@/components/shared/CheckoutDetails";
import CheckoutOrder from "@/components/shared/CheckoutOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCheckoutSchema, checkoutSchema } from "@/libs/zod";
import { TCartItem } from "@/libs/database/models/cart.model";

type CheckoutProp = {
  userId: string;
  paystackPublicKey: string;
  userCart: TCartItem[];
  user: Users;
};

const Checkout = ({
  userId,
  paystackPublicKey,
  userCart,
  user,
}: CheckoutProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TCheckoutSchema>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (data: TCheckoutSchema) => {
    reset();
  };

  return (
    <section className="flex items-start justify-between gap-8">
      <CheckoutDetails
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <CheckoutOrder
        paystackPublicKey={paystackPublicKey}
        userCart={userCart}
        user={user}
      />
    </section>
  );
};

export default Checkout;
