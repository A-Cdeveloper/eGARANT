import BackButton from "@/components/buttons/BackButton";
import React from "react";
import EditInvoiceForm from "../../_forms/EditInvoiceForm";
import { getUserInvoice } from "@/actions/invoices";
import { InvoiceWithSeller } from "@/types";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { getUserFromCookies } from "@/actions/auth";
import { RestrictAccessMessage } from "@/components/errors/RestrictAccessMessage";

type Params = Promise<{ iid: string }>;

const EditInvoicePage = async ({ params }: { params: Params }) => {
  await authSecurityPatch();
  const { data: user } = (await getUserFromCookies()) ?? null;
  const { iid } = await params;
  const { data: invoice } = await getUserInvoice(iid, user?.uid as string);

  if (user?.uid !== invoice?.uid) {
    return (
      <>
        <RestrictAccessMessage />
      </>
    );
  }

  return (
    <div>
      <BackButton to="/invoices" />
      <h2>Izmena računa</h2>
      <EditInvoiceForm invoice={invoice as InvoiceWithSeller} />
    </div>
  );
};

export default EditInvoicePage;
