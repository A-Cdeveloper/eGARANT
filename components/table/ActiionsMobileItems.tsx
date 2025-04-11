import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const ActiionsMobileItems = ({
  setShowModal,
  id,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const router = useRouter();
  return (
    <>
      <Button
        size={"sm"}
        className="cursor-pointer"
        onClick={() => router.push(`/invoices/${id}`)}
      >
        Detalji računa
      </Button>
      <Button
        size={"sm"}
        className="cursor-pointer"
        onClick={() => router.push(`/invoices/${id}/edit`)}
      >
        Izmeni račun
      </Button>
      <Button
        size={"sm"}
        variant={"danger"}
        className="cursor-pointer"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Obriši račun
      </Button>
    </>
  );
};

export default ActiionsMobileItems;
