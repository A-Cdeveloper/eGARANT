import BackButton from "@/components/buttons/BackButton";
import React from "react";
import EditInvoiceForm from "../../_forms/EditInvoiceForm";
import { getUserInvoice } from "@/actions/invoices";
import { InvoiceWithSeller } from "@/types";
import { authSecurityPatch } from "@/lib/authSecurityPatch";

type Params = Promise<{ iid: string }>;

const EditInvoicePage = async ({ params }: { params: Params }) => {
  const { iid } = await params;
  const { data: invoice } = await getUserInvoice(iid, "1");

  await authSecurityPatch();

  return (
    <div>
      <BackButton to="/invoices" />
      <h2>Izmena računa</h2>
      <EditInvoiceForm invoice={invoice as InvoiceWithSeller} />
    </div>
  );
};

export default EditInvoicePage;
