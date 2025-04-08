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
import { Invoice, Prisma, Seller } from "@prisma/client";
import AddInvoiceImage from "./AddInvoiceImage";

const AddInvoiceData = ({
  sellers,
  addNewSellerHandler,
}: {
  sellers: Seller[];
  addNewSellerHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const submitHanadler = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const image = data.invoice_image as File;
    const imageName = image.name;

    const selectedDate = new Date(data.date.toString());
    selectedDate.setHours(14, 0, 0, 0);
    const newInvoice = {
      invoice_date: selectedDate,
      invoice_image: imageName,
      uid: "1",
      sid: data.sid as string,
      products: [] as Prisma.InputJsonValue,
    };

    await addInvoice(newInvoice as Invoice);
    //console.log({ ...data, invoice_image: imageName });
  };

  return (
    <form action={submitHanadler}>
      <div className="flex flex-col gap-2">
        {sellers && sellers.length > 0 && (
          <>
            <h3>Izaberi prodajno mesto iz liste:</h3>
            <Select name="sid" required>
              <SelectTrigger className="w-[200px] sm:w-[280px] bg-white">
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
            onClick={() => addNewSellerHandler(true)}
            className="h-6 p-0"
          >
            Dodaj novo prodajno mesto.
          </Button>
        </div>

        {/* Datum */}
        <div className="border-b border-gray-200 py-2">
          <span className="font-semibold"> Datum prometa:</span>
          <DatePickerWrapper />
        </div>

        {/* Iamge */}
        <div className="border-b border-gray-200 py-2">
          <span className="font-semibold"> Dodaj sliku fiskalnog računa:</span>
          <AddInvoiceImage />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Dodaj račun</Button>
      </div>
    </form>
  );
};

export default AddInvoiceData;
