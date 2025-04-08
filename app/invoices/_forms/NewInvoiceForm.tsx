"use client";
import { Seller } from "@prisma/client";
import AddInvoiceData from "./AddInvoiceData";
import AddNewSeller from "./AddNewSeller";
import { useState } from "react";

const NewInvoiceForm = ({ sellers }: { sellers: Seller[] }) => {
  const [showNewSellerForm, setShowNewSellerForm] = useState(false);
  return (
    <>
      {showNewSellerForm && (
        <AddNewSeller addNewSellerHandler={setShowNewSellerForm} />
      )}

      <div className="border-y-2 border-primary/10 bg-white p-4 text-[15px] my-3">
        <AddInvoiceData
          sellers={sellers}
          addNewSellerHandler={setShowNewSellerForm}
        />
      </div>
    </>
  );
};

export default NewInvoiceForm;
