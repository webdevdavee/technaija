"use client";

import { useEffect, useState } from "react";
import Order from "./Order";
import { getUserOrders } from "@/libs/actions/orders.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createURL } from "@/libs/utils";
import SearchBox from "../ui/SearchBox";
import OrdersTabs from "./OrdersTabs";
import Loader from "../ui/Loader";

type OrdersProps = {
  userId: string;
};

const Orders = ({ userId }: OrdersProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [orders, setOrders] = useState<TOrders[]>([]);
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [ordersCount, setOrdersCount] = useState<number>();
  const [ordersSuccessCount, setOrdersSuccessCount] = useState<number>();
  const [ordersPendingCount, setOrdersPendingCount] = useState<number>();
  const [ordersFailedCount, setOrdersFailedCount] = useState<number>();
  const [query, setQuery] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentPage = parseInt(UrlSearchParams.get("page") ?? "1", 10);
  const currentStatus = UrlSearchParams.get("status");

  // Fetch user's orders
  useEffect(() => {
    const getOrders = async () => {
      const userOrders = await getUserOrders({
        limit: 5,
        userId,
        page: currentPage ?? undefined,
        status: currentStatus ?? undefined,
      });
      setOrders(userOrders?.orders);
      setOrdersCount(userOrders?.ordersCount);
      setOrdersSuccessCount(userOrders?.ordersSuccessCount);
      setOrdersPendingCount(userOrders?.ordersPendingCount);
      setOrdersFailedCount(userOrders?.ordersFailedCount);
      setPageNumbers(userOrders?.pageNumbers);
      setShowLoader(false);
    };
    getOrders();
  }, [currentStatus, userId, currentPage]);

  // Go to previous page
  const prevPage = () => {
    UrlSearchParams.set(
      "page",
      (currentPage - 1 > 0 ? currentPage - 1 : 1).toString()
    );
    // Call the function that creates a URL string with the data from UrlSearchParams
    const url = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(url);
  };

  // Go to next page
  const nextPage = () => {
    UrlSearchParams.set(
      "page",
      (currentPage !== pageNumbers?.length
        ? currentPage + 1
        : currentPage
      ).toString()
    );
    // Call the function that creates a URL string with the data from UrlSearchParams
    const url = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(url);
  };

  // Create an array based on the search input and if no input, return the original array
  const filteredOrdersSearch = orders?.filter((order) =>
    order.orderId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="w-full">
      <div>
        <SearchBox
          query={query}
          setQuery={setQuery}
          placeholder="by order ID"
        />
        <OrdersTabs
          ordersCount={ordersCount ?? 0}
          ordersSuccessCount={ordersSuccessCount ?? 0}
          ordersPendingCount={ordersPendingCount ?? 0}
          ordersFailedCount={ordersFailedCount ?? 0}
          UrlSearchParams={UrlSearchParams}
        />
      </div>
      {!showLoader ? (
        <>
          {filteredOrdersSearch && filteredOrdersSearch.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              {filteredOrdersSearch.map((order) => (
                <Order key={order._id} order={order} />
              ))}
            </div>
          )}
          {!orders ? (
            <p className="w-full mt-4 text-center">
              There are no orders available
            </p>
          ) : (
            orders &&
            orders?.length <= 0 && (
              <p className="w-full mt-4 text-center">
                There are no orders available
              </p>
            )
          )}
        </>
      ) : (
        <section className="h-[70%] my-10 flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
      {orders && orders.length > 0 && (
        <div className="w-full flex justify-end mt-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-[#272829] text-white p-3"
              onClick={prevPage}
            >
              Prev
            </button>
            <button
              type="button"
              className="bg-[#272829] text-white p-3"
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Orders;
