import { deleteBillingDetail } from "@/libs/actions/billing.actions";
import { createURL } from "@/libs/utils";
import { useRouter } from "next/navigation";

type BillingDetailsCardProps = {
  details: TBilling[] | undefined;
  UrlSearchParams: URLSearchParams;
};

const BillingDetailsCard = ({
  details,
  UrlSearchParams,
}: BillingDetailsCardProps) => {
  const router = useRouter();

  // Delete billing detail
  const deleteSelectedBillingDetail = async (id: string) => {
    await deleteBillingDetail(id);
    window.location.reload();
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
              <button type="button">Set as default</button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BillingDetailsCard;
