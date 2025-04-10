"use client";
import { addInvoice } from "@/actions/invoices";
import { DatePickerWrapper } from "@/components/datepicker/DatePickerWrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Seller } from "@prisma/client";
import AddInvoiceImage from "./AddInvoiceImage";

import { useActionState, useEffect } from "react";
import AddInvoiceProducts from "./AddInvoiceProducts";
import FormErrorMessages from "./FormErrorMessages";
import { Product } from "@/types";

import { useRouter } from "next/navigation";

const AddInvoiceData = ({
  sellers,
  addNewSellerHandler,
}: {
  sellers: Seller[];
  addNewSellerHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [state, action] = useActionState(addInvoice, {
    data: null,
    error: null,
  });

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
        <div className="flex flex-col gap-2">
          {sellers && sellers.length > 0 && (
            <>
              <h3>Izaberi prodajno mesto iz liste:</h3>
              <Select name="sid" defaultValue={state.data?.sid}>
                <SelectTrigger className="w-full sm:w-[280px] bg-white">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {sellers.map((s) => (
                    <SelectItem key={s.sid} value={s.sid}>
                      {s.name} - {s.address} {s.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <div className="border-b border-gray-200 pb-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                addNewSellerHandler(true);
              }}
              className="h-6 p-0"
            >
              Dodaj novo prodajno mesto.
            </Button>
          </div>

          {/* Datum */}
          <div className="border-b border-gray-200 py-2">
            <span className="font-semibold"> Datum prometa:</span>
            <DatePickerWrapper defaultValue={new Date()} />
          </div>
          {/* Products */}
          <div className="border-b border-gray-200 py-2">
            <AddInvoiceProducts
              defaultProducts={(state.data?.products as Product[]) || []}
            />
          </div>

          {/* Image */}
          <div className="border-b border-gray-200 py-2">
            <span className="font-semibold">
              {" "}
              Fotografija fiskalnog računa:
            </span>
            <AddInvoiceImage invoice_image={state.data?.invoice_image || ""} />
          </div>
        </div>
        <div className="flex justify-center sm:justify-end mt-4">
          <Button
            variant="secondary_full"
            size="lg"
            className="w-full sm:w-auto"
          >
            Sačuvaj račun
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddInvoiceData;
