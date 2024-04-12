"use client";

import CheckoutDetails from "@/components/forms/CheckoutDetails";
import CheckoutOrder from "@/components/utility/CheckoutOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCheckoutSchema, checkoutSchema } from "@/libs/zod";
import { useEffect, useState } from "react";
import { getUserCartItems } from "@/libs/actions/cart.actions";

type CheckoutProp = {
  paystackPublicKey: string;
  user: Users;
  userId: string;
};

const Checkout = ({ paystackPublicKey, user, userId }: CheckoutProp) => {
  const [formData, setFormData] = useState<CheckoutFormData>();
  const [formReady, setFormReady] = useState<boolean>(false);
  const [userCart, setUserCart] = useState<TCartItem[]>([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      const userCart = await getUserCartItems(userId);
      setUserCart(userCart);
    };
    fetchUserCart();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TCheckoutSchema>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (data: TCheckoutSchema) => {
    setFormData({
      ...data,
      userId: user._id,
      userPhoto: user.photo,
      userCart: userCart.map((product) => product),
    });
    setFormReady(true);
  };

  return (
    <section className="flex items-start justify-between gap-8 m:flex-col m:w-full m:gap-16 xl:gap-6">
      <CheckoutDetails
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <CheckoutOrder
        paystackPublicKey={paystackPublicKey}
        formData={formData}
        userCart={userCart}
        user={user}
        formReady={formReady}
        userId={userId}
      />
    </section>
  );
};

export default Checkout;
