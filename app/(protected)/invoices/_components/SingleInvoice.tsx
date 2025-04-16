import { getUserInvoice } from "@/actions/invoices";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import { InvoiceWithSeller } from "@/types";
import InvoiceHead from "./InvoiceHead";
import InvoiceProductsList from "./InvoiceProductsList";
import InvoiceImage from "./InvoiceImage";
import InvoiceButtons from "./InvoiceButtons";
import { getUserFromCookies } from "@/actions/auth";
import { RestrictAccessMessage } from "@/components/errors/RestrictAccessMessage";

export const SingleInvoice = async ({ id }: { id: string }) => {
  const { data: user } = (await getUserFromCookies()) ?? null;
  const { data: invoice, error } = await getUserInvoice(
    id,
    user?.uid as string
  );

  if (user?.uid !== invoice?.uid) {
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
