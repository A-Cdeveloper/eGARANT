"use client";
import { deleteInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const InvoiceButtons = ({ iid }: { iid: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center gap-5 my-4">
      <Button>Preuzmi račun</Button>
      <Button>
        <Link href={`/invoices/${iid}/edit`}>Izmeni racun</Link>
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          deleteInvoice(iid);
          router.push("/invoices");
        }}
      >
        Ukloni račun
      </Button>
    </div>
  );
};

export default InvoiceButtons;
