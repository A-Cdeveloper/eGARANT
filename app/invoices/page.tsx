import { getAllUserInvoices } from "@/actions/invoices";
import TableComponent from "@/components/table/TableComponent";
import React, { Suspense } from "react";
import { TableInvoicesColumns } from "./_components/TableInvoicesColumns";
import NoInvoicesFound from "./_components/NoInvoicesFound";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

const InvoicesPage = async () => {
  return (
    <>
      <h2>Moji računi</h2>
      <Suspense fallback={<TableSkeleton n={5} />}>
        <Invoices />
      </Suspense>
    </>
  );
};

export default InvoicesPage;

//////////////////////////////////////////////////////////////////////
export const Invoices = async () => {
  const { data: invoices, error } = await getAllUserInvoices("1");

  if (invoices && invoices.length === 0) {
    return (
      <>
        <NoInvoicesFound />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  return (
    <TableComponent columns={TableInvoicesColumns} data={invoices || []} />
  );
};
