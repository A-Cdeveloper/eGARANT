import BackButton from "@/components/buttons/BackButton";

import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { Suspense } from "react";
import { SingleInvoice } from "../_components/SingleInvoice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eGarant | Detalji računa",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type Params = Promise<{ iid: string }>;

const InvoicePage = async ({ params }: { params: Params }) => {
  await authSecurityPatch();
  const { iid } = await params;
  return (
    <>
      <BackButton to="/invoices" />
      <h2>Detalji računa</h2>
      <Suspense
        fallback={
          <>
            <Skeleton className="w-[100%] h-[80px] mb-5 rounded-md bg-gray-200" />
            <TableSkeleton n={3} />
          </>
        }
      >
        <SingleInvoice id={iid} />
      </Suspense>
    </>
  );
};

export default InvoicePage;

///////////////////////////////////////////////////////////////////////////////////
