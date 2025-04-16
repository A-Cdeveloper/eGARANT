import { ErrorMessage } from "@/components/errors/ErrorMessage";
import NoInvoices from "./NoInvoices";
import TableComponent from "@/components/table/TableComponent";
import { TableInvoicesColumns } from "./TableInvoicesColumns";
import { getUserFromCookies } from "@/actions/auth";
import { getAllUserInvoices } from "@/actions/invoices";

export const Invoices = async ({
  filter,
  sort,
}: {
  filter: string | undefined;
  sort: string;
}) => {
  const { data: user } = (await getUserFromCookies()) ?? null;
  const { data: invoices, error } = await getAllUserInvoices(
    user?.uid as string,
    filter,
    sort
  );

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
