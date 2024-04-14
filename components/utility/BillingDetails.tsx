"use client";

import { getBillingDetails } from "@/libs/actions/billing.actions";
import { useEffect, useState } from "react";
import BillingDetailsCard from "./BillingDetailsCard";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const BillingDetails = () => {
  const searchParams = useSearchParams();

  const [details, setDetails] = useState<TBilling[] | undefined>([]);

  const UrlSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const fetchBillingDetails = async () => {
      const details = await getBillingDetails();
      setDetails(details);
    };
    fetchBillingDetails();
  }, []);

  return (
    <section>
      {details && details.length > 0 ? (
        <BillingDetailsCard
          details={details}
          UrlSearchParams={UrlSearchParams}
        />
      ) : (
        <p className="my-10">You have no billing details</p>
      )}
      <div className="w-fit mt-4 bg-[#272829] py-2 px-3 text-white">
        <Link
          href="/profile/create-billing-details"
          className="flex gap-2 items-center"
        >
          <Image src="/plus-white.svg" width={20} height={20} alt="add" />
          <p>Add new billing details</p>
        </Link>
      </div>
    </section>
  );
};

export default BillingDetails;
