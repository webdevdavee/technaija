"use client";

import CheckoutDetails from "@/components/forms/CheckoutDetails";
import CheckoutOrder from "@/components/utility/CheckoutOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBillingSchema, billingSchema } from "@/libs/zod";
import { useEffect, useState } from "react";
import { getDefaultBillingDetail } from "@/libs/actions/billing.actions";

type CheckoutProp = {
  paystackPublicKey: string;
  userCart: TCartItem[];
  user: Users;
  userId: string;
};

const Checkout = ({
  paystackPublicKey,
  userCart,
  user,
  userId,
}: CheckoutProp) => {
  const [formData, setFormData] = useState<CheckoutFormData | TBilling>();
  const [billingDetails, setBillingDetails] = useState<TBilling | undefined>();
  const [formReady, setFormReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchDefaultBillingDetail = async () => {
      const detail = await getDefaultBillingDetail();
      setBillingDetails(detail);
    };
    fetchDefaultBillingDetail();
  }, []);

  // If billing details exists, make the form ready or allow for payment
  useEffect(() => {
    setFormReady(billingDetails ? true : false);
    setFormData(
      billingDetails
        ? {
            ...billingDetails,
            userId: user._id,
            userPhoto: user.photo,
            userCart: userCart.map((product) => product),
          }
        : formData
    );
  }, [billingDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TBillingSchema>({
    resolver: zodResolver(billingSchema),
  });

  const onSubmit = async (data: TBillingSchema) => {
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
      {!billingDetails && (
        <CheckoutDetails
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      )}
      <CheckoutOrder
        paystackPublicKey={paystackPublicKey}
        formData={formData}
        userCart={userCart}
        user={user}
        formReady={formReady}
        userId={userId}
        billingDetails={billingDetails}
      />
    </section>
  );
};

export default Checkout;
