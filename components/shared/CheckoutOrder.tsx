import { TCartItem } from "@/libs/database/models/cart.model";
import Coupon from "./Coupon";
import { formatNumber } from "@/libs/utils";
import { PaystackButton } from "react-paystack";
import { useState } from "react";

type CheckoutOrderProp = {
  paystackPublicKey: string;
  userCart: TCartItem[];
  user: Users;
};

const CheckoutOrder = async ({
  paystackPublicKey,
  userCart,
  user,
}: CheckoutOrderProp) => {
  const [formattedGrandTotal, setFormattedGrandTotal] = useState<string>();
  const [couponPrice, setCouponPrice] = useState<number>();

  // Array to hold total amounts for each cart item
  const totals = userCart?.map((item: TCartItem) => {
    const total = item.price * item.quantity;
    return total;
  });

  // Use reduce to sum up the numbers
  const grandTotal: number =
    totals &&
    totals.reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  return (
    <section className="w-[30%]">
      <h2 className="mb-8 text-lg font-medium">Your order</h2>
      <div className="border-[1px] border-gray-400 p-6">
        <span className="border-b-[1px] border-gray-400 flex items-center justify-between pb-4">
          <p className="font-medium">Product</p>
          <p className="font-medium">Subtotal</p>
        </span>
        {userCart.map((item: TCartItem) => (
          <span
            key={item._id}
            className="border-b-[1px] border-gray-400 flex items-center justify-between py-4"
          >
            <p className="text-sm">
              {item.name} - {item.model} <b>x {item.quantity}</b>
            </p>
            <p className="text-sm">{formatNumber(item.price, "₦")}</p>
          </span>
        ))}
        <span className="flex items-center justify-between pt-6">
          <p className="text-base font-medium">Total</p>
          <span className="flex gap-2">
            <p
              className={`text-base font-medium ${
                formattedGrandTotal && "line-through text-red-400"
              }`}
            >
              {formatNumber(grandTotal, "₦")}
            </p>
            {formattedGrandTotal && (
              <p className="text-base font-medium">{formattedGrandTotal}</p>
            )}
          </span>
        </span>
      </div>
      <Coupon
        grandTotal={grandTotal}
        setFormattedGrandTotal={setFormattedGrandTotal}
        setCouponPrice={setCouponPrice}
      />
      <PaystackButton
        text="Place order"
        className="w-full py-3 px-5 bg-[#272829] text-white mt-14"
        publicKey={paystackPublicKey}
        email={user?.email as string}
        amount={couponPrice ? couponPrice * 100 : grandTotal * 100}
      />
    </section>
  );
};

export default CheckoutOrder;
