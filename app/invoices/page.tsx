import { getAllUserInvoices } from "@/actions/invoices";
import TableComponent from "@/components/table/TableComponent";
import React from "react";
import { TableBillsColumns } from "./_components/TableBillsColumns";

const InvoicesPage = async () => {
  const invoices = await getAllUserInvoices("1");
  console.log(invoices);
  return (
    <>
      <h2>Moji računi</h2>
      <TableComponent columns={TableBillsColumns} data={invoices} />
    </>
  );
};

export default InvoicesPage;
