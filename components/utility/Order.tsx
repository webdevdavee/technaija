import { convertDateFormat, formatNumber } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

type OrderProps = {
  order: TOrders;
};

const Order = ({ order }: OrderProps) => {
  const getCategoryLink = (category: string) => {
    switch (category) {
      case "iPhone Cases":
        return "/shop?category=iPhone+Cases&iPhone+Cases=true";
      case "Android Cases":
        return "/shop?category=Android+Cases&Android+Cases=true";
      default:
        return "/shop?category=Accessories&Accessories=true";
    }
  };

  return (
    <section>
      <div className="border-[1px] border-gray-300 p-4 flex flex-col gap-3">
        <span className="flex justify-between items-center border-b-[1px] border-b-gray-400 pb-3 ss:flex-col gap-4">
          <h2 className="capitalize font-medium m:text-sm ss:text-left">
            {order.status}
          </h2>
          <span className="flex flex-col gap-2 ss:text-left">
            <p className="text-sm font-light m:text-sm">
              <b>Order date:</b> {convertDateFormat(order.date)}
            </p>
            <p className="text-sm font-light m:text-sm">
              <b>OrderID:</b> {order.orderId}
            </p>
          </span>
        </span>
        <span className="flex flex-col gap-6">
          {order.products.map((product) => (
            <div
              key={product._id}
              className="flex gap-10 m:justify-between ss:flex-col ss:gap-3"
            >
              <Image
                src={product.photo}
                width={100}
                height={100}
                quality={100}
                alt="product-img"
              />
              <div className="flex flex-col gap-3">
                <Link
                  href={`/product/${product.productId}`}
                  className="font-medium m:text-right"
                >
                  {product.name} - {product.model}
                </Link>
                <Link
                  href={getCategoryLink(product.category)}
                  className="m:text-right"
                >
                  {product.category}
                </Link>
                <p className="m:text-right">
                  {formatNumber(product.price, "₦")} x {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </span>
        <p className="mt-4">Total: {formatNumber(order.amount, "₦")}</p>
      </div>
    </section>
  );
};

export default Order;
