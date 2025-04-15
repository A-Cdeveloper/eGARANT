import BackButton from "@/components/buttons/BackButton";
import NewInvoiceForm from "../_forms/NewInvoiceForm";
import { getAllSellers } from "@/actions/sellers";
import { Seller } from "@prisma/client";

const AddNewInvoice = async () => {
  const { data: sellers } = await getAllSellers();
  return (
    <div>
      <BackButton to="/invoices" />
      <h2>Dodaj novi račun</h2>
      <NewInvoiceForm sellers={sellers as Seller[]} />
    </div>
  );
};

export default AddNewInvoice;
