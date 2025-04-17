import { getUserInvoice } from "@/actions/invoices";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import { RestrictAccessMessage } from "@/components/errors/RestrictAccessMessage";
import { InvoiceWithSeller } from "@/types";
import InvoiceButtons from "./InvoiceButtons";
import InvoiceHead from "./InvoiceHead";
import InvoiceImage from "./InvoiceImage";
import InvoiceProductsList from "./InvoiceProductsList";

export const SingleInvoice = async ({
  id,
  uid,
}: {
  id: string;
  uid: string;
}) => {
  const { data: invoice, error } = await getUserInvoice(id, uid);

  if (uid !== invoice?.uid) {
    return (
      <>
        <RestrictAccessMessage />
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
    <>
      <InvoiceHead invoice={invoice as InvoiceWithSeller} />
      <InvoiceProductsList invoice={invoice as InvoiceWithSeller} />
      {invoice?.invoice_image && (
        <InvoiceImage iurl={invoice?.invoice_image as string} />
      )}
      <InvoiceButtons
        iid={invoice?.iid as string}
        invoice_image={invoice?.invoice_image as string}
      />
    </>
  );
};
