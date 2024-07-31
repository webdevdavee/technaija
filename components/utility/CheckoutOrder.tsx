import Coupon from "./Coupon";
import { formatNumber } from "@/libs/utils";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import EventButton from "../ui/EventButton";
import { useRouter } from "next/navigation";
import { clearUserCart } from "@/libs/actions/cart.actions";
import { reduceCouponLimit } from "@/libs/actions/coupon.actions";

type CheckoutOrderProp = {
  formData: CheckoutFormData | undefined | any;
  paystackPublicKey: string;
  userCart: TCartItem[];
  user: Users;
  formReady: boolean;
  userId: string;
  billingDetails: TBilling | undefined;
};

const CheckoutOrder = ({
  formData,
  paystackPublicKey,
  userCart,
  user,
  formReady,
  userId,
  billingDetails,
}: CheckoutOrderProp) => {
  const router = useRouter();

  const [formattedGrandTotal, setFormattedGrandTotal] = useState<string>();
  const [couponPrice, setCouponPrice] = useState<number>();
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");

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

  // Function to clear the user's cart, subtract the coupon limit and redirect the user to home page
  const afterPayment = async () => {
    if (selectedCoupon && selectedCoupon.length > 0) {
      await reduceCouponLimit({
        couponCode: selectedCoupon,
      });
    }
    await clearUserCart(userId);
    router.push("/");
  };

  return (
    <section
      className={`w-[30%] m:w-full xl:w-[45%] ${
        billingDetails && "w-full xl:w-full xxl:px-48 xxxl:px-48 ultra:px-48"
      }`}
    >
      <h2 className="mb-8 text-lg font-medium">Your order</h2>
      <div className="border-[1px] border-gray-400 p-6">
        <span className="border-b-[1px] border-gray-400 flex items-center justify-between pb-4">
          <p className="font-medium">Product</p>
          <p className="font-medium">Subtotal</p>
        </span>
        {userCart.map((item: TCartItem) => (
          <span
            key={item._id}
            className="border-b-[1px] border-gray-400 flex items-center justify-between py-4 m:gap-4 xl:gap-6"
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
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setSelectedCoupon}
      />
      {formReady ? (
        <PaystackButton
          text="Place order"
          className="w-full py-3 px-5 bg-[#272829] text-white mt-14"
          publicKey={paystackPublicKey}
          firstname={user?.firstName}
          lastname={user?.lastName}
          email={user?.email}
          amount={couponPrice ? couponPrice * 100 : grandTotal * 100}
          metadata={formData}
          onSuccess={() => afterPayment()}
        />
      ) : (
        <EventButton
          type="button"
          text="Place order"
          classname={`w-full py-3 px-5 text-sm mt-14 ${
            !formReady
              ? "bg-gray-300 text-[#272829] cursor-not-allowed"
              : "bg-[#272829] text-white"
          }`}
        />
      )}
    </section>
  );
};

export default CheckoutOrder;
