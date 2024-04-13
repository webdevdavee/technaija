import { convertDateFormat, formatNumber } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

type OrderProps = {
  order: TOrders;
};

const Order = ({ order }: OrderProps) => {
  return (
    <section>
      <div className="border-[1px] border-[#272829] p-4 flex flex-col gap-3">
        <span className="flex justify-between items-center border-b-[1px] border-b-[#272829] pb-3">
          <h2 className="capitalize font-medium">{order.status}</h2>
          <span className="flex flex-col gap-2 text-right">
            <p className="text-sm font-light">
              <b>Order date:</b> {convertDateFormat(order.date)}
            </p>
            <p className="text-sm font-light">
              <b>OrderID:</b> {order.orderId}
            </p>
          </span>
        </span>
        <span className="flex flex-col gap-6">
          {order.products.map((product) => (
            <div className="flex gap-10">
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
                  className="font-medium"
                >
                  {product.name} - {product.model}
                </Link>
                <p>{product.category}</p>
                <p>
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
