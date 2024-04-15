import {
  deleteBillingDetail,
  setBillingDetailAsDefault,
} from "@/libs/actions/billing.actions";
import { createURL } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type BillingDetailsCardProps = {
  details: TBilling[] | undefined;
  UrlSearchParams: URLSearchParams;
  setSetDefault: Dispatch<SetStateAction<boolean>>;
};

const BillingDetailsCard = ({
  details,
  UrlSearchParams,
  setSetDefault,
}: BillingDetailsCardProps) => {
  const router = useRouter();

  // Delete billing detail
  const deleteSelectedBillingDetail = async (id: string) => {
    await deleteBillingDetail(id);
    window.location.reload();
  };

  // Set billing detail as default
  const makeDefault = async (id: string) => {
    await setBillingDetailAsDefault(id);
    // Toggle setDefault state to refetch billing details on "setDefault" state change
    setSetDefault((prev) => !prev);
  };

  const getBillingDetailToEdit = (detailId: string) => {
    UrlSearchParams.set("edit", detailId);
    // Call the function that creates a URL string with the data from UrlSearchParams
    const pageURL = createURL("/profile/edit-billing-details", UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${pageURL}`);
  };

  return (
    <section>
      <div className="w-fit flex flex-col gap-4">
        {details?.map((detail) => (
          <div key={detail._id} className="p-4 border-[1px] border-[#272829]">
            {detail.isDefault && (
              <p className="bg-red-100 text-red-400 py-2 px-3 w-fit rounded text-sm mb-2">
                default
              </p>
            )}
            <span>
              <p className="font-light">
                {detail.firstname} {detail.lastname}, {detail.phone}
              </p>
              <p className="font-medium">
                {detail.address}, {detail.city}, {detail.country},{" "}
                {detail.zipcode}
              </p>
            </span>
            <span className="mt-4 flex gap-4">
              <button
                type="button"
                onClick={() => getBillingDetailToEdit(detail._id)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteSelectedBillingDetail(detail._id)}
              >
                Delete
              </button>
              <button type="button" onClick={() => makeDefault(detail._id)}>
                Set as default
              </button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BillingDetailsCard;
