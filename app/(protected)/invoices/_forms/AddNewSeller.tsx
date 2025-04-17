"use client";
import { addNewSeller } from "@/actions/sellers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { useActionState } from "react";
import FormErrorMessages from "./FormErrorMessages";
import FormSuccessMessage from "./FormSuccessMessage";
import SubmitButton from "@/components/buttons/SubmitButton";

const AddNewSeller = ({
  addNewSellerHandler,
}: {
  addNewSellerHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [state, action, isPending] = useActionState(addNewSeller, {
    data: null,
    error: null,
  });

  return (
    <>
      {state.error && <FormErrorMessages errors={state.error as string[]} />}
      {!state.error && state.data ? (
        <FormSuccessMessage>
          Prodajno mesto uspešno dodato na listu.
        </FormSuccessMessage>
      ) : (
        <div className="border-y-2  bg-white border-secondary p-4 text-[15px]">
          <h3>Dodaj novo prodajno mesto:</h3>
          <form action={action} className="space-y-2">
            <Textarea
              placeholder="Naziv prodajnog mesta"
              name="name"
              defaultValue={state.data?.name}
            />
            <Textarea
              placeholder="Adresa"
              name="address"
              defaultValue={state.data?.address}
            />
            <Input
              type="text"
              placeholder="Grad"
              name="city"
              defaultValue={state.data?.city as string}
            />
            <Input
              type="text"
              placeholder="Telefon"
              name="phone"
              defaultValue={state.data?.phone as string}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={state.data?.email as string}
            />

            <div className="flex justify-between mt-4">
              {" "}
              <Button
                size={"sm"}
                variant="danger"
                onClick={() => addNewSellerHandler(false)}
                disabled={isPending}
              >
                Zatvori
              </Button>
              <SubmitButton size={"sm"}>Dodaj u listu</SubmitButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewSeller;
