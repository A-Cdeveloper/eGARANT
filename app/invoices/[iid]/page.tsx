import { getUserInvoice } from "@/actions/invoices";
import BackButton from "@/components/buttons/BackButton";
import { InvoiceWithSeller } from "@/types";

import { ErrorMessage } from "@/components/errors/ErrorMessage";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import InvoiceHead from "../_components/InvoiceHead";
import InvoiceProductsList from "../_components/InvoiceProductsList";
import InvoiceImage from "../_components/InvoiceImage";
import InvoiceButtons from "../_components/InvoiceButtons";

type Params = Promise<{ iid: string }>;

const InvoicePage = async ({ params }: { params: Params }) => {
  const { iid } = await params;

  return (
    <>
      <BackButton to="/invoices" />
      <h2>Detalji računa {iid}</h2>
      <Suspense
        fallback={
          <>
            <Skeleton className="w-[100%] h-[80px] mb-5 rounded-md bg-gray-200" />
            <TableSkeleton n={3} />
          </>
        }
      >
        <Invoice id={iid} />
      </Suspense>
    </>
  );
};

export default InvoicePage;

///////////////////////////////////////////////////////////////////////////////////

export const Invoice = async ({ id }: { id: string }) => {
  const { data: invoice, error } = await getUserInvoice(id, "1");

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  return (
    <>
      <InvoiceHead invoice={invoice as InvoiceWithSeller} />
      <InvoiceProductsList invoice={invoice as InvoiceWithSeller} />
      {invoice?.invoice_image && (
        <InvoiceImage iurl={invoice?.invoice_image as string} />
      )}
      <InvoiceButtons iid={invoice?.iid as string} />
    </>
  );
};
