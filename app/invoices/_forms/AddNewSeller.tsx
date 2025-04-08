"use client";
import { addNewSeller } from "@/actions/sellers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Seller } from "@prisma/client";
import { useRouter } from "next/navigation";

import React from "react";

const AddNewSeller = ({
  addNewSellerHandler,
}: {
  addNewSellerHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const submitHandler = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const newSeller = {
      name: data.name as string,
      address: data.address as string,
      city: data.city as string,
      phone: "",
      email: "",
    };

    await addNewSeller(newSeller as Seller);
    addNewSellerHandler(false);
    router.refresh();
  };

  return (
    <div className="border-y-2  bg-white border-secondary p-4 text-[15px]">
      <h3>Dodaj novo prodajno mesto:</h3>
      <form action={submitHandler} className="space-y-2">
        <Textarea placeholder="Naziv prodajnog mesta" name="name" required />
        <Textarea placeholder="Adresa" name="address" required />
        <Input type="text" placeholder="Grad" name="city" required />
        <Input type="text" placeholder="Telefon" name="phone" />
        <Input type="email" placeholder="Email" name="email" />

        <div className="flex justify-between mt-4">
          {" "}
          <Button
            size={"sm"}
            variant="danger"
            onClick={() => addNewSellerHandler(false)}
          >
            Odustani
          </Button>
          <Button size={"sm"}>Dodaj u listu</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSeller;
