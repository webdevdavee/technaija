"use client";

import { getBillingDetailById } from "@/libs/actions/billing.actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BillingDetailsForm from "../forms/BillingDetailsForm";
import Loader from "../ui/Loader";

const EditBillingDetails = () => {
  const [detailToEdit, setDetailToEdit] = useState<TBilling>();

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const detailId = UrlSearchParams.get("edit");

  // Retrieve the detail ID from the URL and fetch the corresponding details.
  useEffect(() => {
    const getDetailToEdit = async () => {
      try {
        // If `detailId` is present, call `getBillingDetailById` to fetch details.
        // Otherwise, pass an empty string to avoid invalid requests.
        const detail = await getBillingDetailById(detailId ? detailId : "");
        // Update the state with the fetched details for editing.
        setDetailToEdit(detail);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    getDetailToEdit();
  }, [detailId]);

  return (
    <section>
      {detailToEdit ? (
        <BillingDetailsForm type="edit" detail={detailToEdit} />
      ) : (
        <Loader className="loader2" />
      )}
    </section>
  );
};

export default EditBillingDetails;
