import { getAllUserInvoices } from "@/actions/invoices";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import TableComponent from "@/components/table/TableComponent";
import NoInvoices from "./NoInvoices";
import { TableInvoicesColumns } from "./TableInvoicesColumns";

export const Invoices = async ({
  filter,
  sort,
  uid,
}: {
  filter: string | undefined;
  sort: string;
  uid: string;
}) => {
  const { data: invoices, error } = await getAllUserInvoices(uid, filter, sort);

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
