import BackButton from "@/components/buttons/BackButton";
import React from "react";

const AddNewInvoice = () => {
  return (
    <div>
      <BackButton to="/invoices" />
      <h2>Dodaj novi račun</h2>
    </div>
  );
};

export default AddNewInvoice;
