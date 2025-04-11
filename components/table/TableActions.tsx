"use client";
import { deleteInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../modals/Modal";
import ActiionsMobileItems from "./ActiionsMobileItems";

const TableActions = ({ id }: { id: string }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          title="Da li ste sigurni?"
          onClose={closeModal}
          onConfirm={async () => {
            await deleteInvoice(id);
            closeModal();
          }}
        />
      )}
      {/* MOBILE */}
      <div className="flex flex-wrap justify-end gap-4 items-center sm:hidden">
        <ActiionsMobileItems setShowModal={setShowModal} id={id} />
      </div>
      {/* DESKTOP */}
      <div className="hidden sm:block text-start sm:text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/invoices/${id}`)}
            >
              Detalji računa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/invoices/${id}/edit`)}
            >
              Izmeni račun
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Obriši račun
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TableActions;
