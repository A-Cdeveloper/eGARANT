"use client";
import { deleteInvoice } from "@/actions/invoices";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const InvoiceButtons = ({ iid }: { iid: string }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const router = useRouter();
  return (
    <>
      {showModal && (
        <Modal
          message="Da li ste sigurni?"
          onClose={closeModal}
          onConfirm={async () => {
            await deleteInvoice(iid);
            closeModal();
            router.push("/invoices");
          }}
        />
      )}

      <div className="flex flex-wrap justify-center gap-5 my-4">
        <Button>Preuzmi račun</Button>
        <Button>
          <Link href={`/invoices/${iid}/edit`}>Izmeni racun</Link>
        </Button>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          Ukloni račun
        </Button>
      </div>
    </>
  );
};

export default InvoiceButtons;
