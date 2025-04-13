"use client";
import {
  calculateInvoiceTotal,
  formatDate,
  formatPrice,
  getJsonArrayLength,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import TableActions from "@/components/table/TableActions";
import Link from "next/link";

import { InvoiceWithSeller } from "@/types";

export const TableInvoicesColumns: ColumnDef<InvoiceWithSeller>[] = [
  {
    accessorKey: "invoice_number",
    header: "NUM",
    cell: ({ row }) => {
      return (
        <Link href={`/invoices/${row.original.iid}`} className="text-secondary">
          {row.original.invoice_number}
        </Link>
      );
    },
    size: 50,
  },

  {
    accessorKey: "invoice_date",
    header: "Datum",
    cell: ({ row }) => formatDate(row.original.invoice_date),
  },

  {
    accessorKey: "seller",
    header: "Prodavac",
    cell: ({ row }) => {
      return (
        <div className="ms-0 sm:-ms-2">
          <span className="block font-semibold">
            {row.original.seller.name}
          </span>
          <span>
            {row.original.seller.address}, {row.original.seller.city}
          </span>
        </div>
      );
    },
    size: 250,
  },

  {
    accessorKey: "items",
    header: "Artikli",
    cell: ({ row }) => (
      <span className="block ms-0 sm:ms-4">
        {getJsonArrayLength(row.original.products)}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: "Iznos",
    cell: ({ row }) => {
      return formatPrice(calculateInvoiceTotal(row.original?.products));
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <TableActions id={row.original.iid} />;
    },
  },
];
