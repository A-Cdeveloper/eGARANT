"use client";
import { DatePickerWrapper } from "@/components/datepicker/DatePickerWrapper";
import { Button } from "@/components/ui/button";
import { InvoiceWithSeller, Product } from "@/types";
import InvoiceHead from "../_components/InvoiceHead";
import AddInvoiceImage from "./AddInvoiceImage";
import AddInvoiceProducts from "./AddInvoiceProducts";
import { updateInvoice } from "@/actions/invoices";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import FormErrorMessages from "./FormErrorMessages";
import { useBeforeUnloadPrompt } from "@/hooks/useBeforeUnloadPrompt";

const EditInvoiceForm = ({ invoice }: { invoice: InvoiceWithSeller }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  const [state, action] = useActionState(updateInvoice, {
    data: null,
    error: null,
  });

  useBeforeUnloadPrompt(isDirty);
  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.data) {
      router.push("/invoices/");
    }
  }, [router, state.data, state.error]);

  return (
    <>
      {state.error !== null && state.data !== null && (
        <>
          <FormErrorMessages errors={state.error as string[]} />
        </>
      )}
      <form action={action}>
        <div className="border-y-2 border-primary/10 bg-white p-4 text-[15px] my-3">
          <InvoiceHead invoice={invoice as InvoiceWithSeller} mode="edit" />

          <Input type="hidden" name="iid" defaultValue={invoice?.iid} />
          <Input type="hidden" name="sid" defaultValue={invoice?.sid} />

          {/* Datum */}
          <div className="border-b border-gray-200 py-2">
            <span className="font-semibold"> Izmeni datum:</span>
            <DatePickerWrapper
              defaultValue={invoice?.invoice_date as Date}
              setIsDirty={setIsDirty}
            />
          </div>
          {/* Products */}
          <div className="border-b border-gray-200 py-2">
            <AddInvoiceProducts
              defaultProducts={invoice?.products as Product[]}
              setIsDirty={setIsDirty}
            />
          </div>

          {/* Image */}
          <div className="border-b border-gray-200 py-2">
            <span className="font-semibold">Fotografija fiskalnog računa:</span>
            <AddInvoiceImage
              invoice_image={invoice?.invoice_image}
              setIsDirty={setIsDirty}
              setIsLoading={setLoadingImageUpload}
              loading={loadingImageUpload}
            />
          </div>
        </div>
        <div className="flex justify-center sm:justify-end mt-4">
          <Button
            variant="secondary_full"
            size="lg"
            className="w-full sm:w-auto"
          >
            Izmeni račun
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditInvoiceForm;
