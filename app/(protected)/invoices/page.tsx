import { getAllUserInvoices } from "@/actions/invoices";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import FilterInput from "@/components/filters/FilterInput";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableComponent from "@/components/table/TableComponent";
import { Suspense } from "react";
import NoInvoices from "./_components/NoInvoices";
import { TableInvoicesColumns } from "./_components/TableInvoicesColumns";
import FilterSelector from "@/components/filters/FilterSelector";
import { authSecurityPatch } from "@/lib/authSecurityPatch";

const InvoicesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  await authSecurityPatch();
  const { filter, sort } = await searchParams;
  return (
    <>
      <h2>Moji računi</h2>
      <Suspense fallback={<TableSkeleton n={5} />}>
        <div className="my-3 flex flex-wrap justify-between gap-3 sm:gap-0">
          <div className="w-full sm:w-1/2 max-w-full sm:max-w-[280px]">
            <FilterInput />
          </div>
          <div className="w-full sm:w-1/2 max-w-full sm:max-w-[280px]">
            <FilterSelector />
          </div>
        </div>

        <Invoices filter={filter} sort={sort || ""} />
      </Suspense>
    </>
  );
};

export default InvoicesPage;

//////////////////////////////////////////////////////////////////////
export const Invoices = async ({
  filter,
  sort,
}: {
  filter: string | undefined;
  sort: string;
}) => {
  const { data: invoices, error } = await getAllUserInvoices("1", filter, sort);

  if (invoices && invoices.length === 0) {
    return <NoInvoices filter={filter || ""} />;
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
