import { getUserInvoice } from "@/actions/invoices";
import BackButton from "@/components/buttons/BackButton";
import { RestrictAccessMessage } from "@/components/errors/RestrictAccessMessage";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { InvoiceWithSeller } from "@/types";
import { Metadata } from "next";
import EditInvoiceForm from "../../_forms/EditInvoiceForm";

export const metadata: Metadata = {
  title: "eGarant | Uredi račun",
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

const EditInvoicePage = async ({ params }: { params: Params }) => {
  const { uid } = await authSecurityPatch();
  const { iid } = await params;
  const { data: invoice } = await getUserInvoice(iid, uid as string);

  if (uid !== invoice?.uid) {
    return (
      <>
        <RestrictAccessMessage />
      </>
    );
  }

  return (
    <div>
      <BackButton to={`/invoices/${iid}`} />
      <h2>Izmena računa</h2>
      <EditInvoiceForm invoice={invoice as InvoiceWithSeller} />
    </div>
  );
};

export default EditInvoicePage;
