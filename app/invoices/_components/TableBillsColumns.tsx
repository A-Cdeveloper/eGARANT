"use client";
import { formatDate, formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import TableActions from "@/components/table/TableActions";
import Link from "next/link";

import { InvoiceWithSeller, Product } from "@/types";

export const TableBillsColumns: ColumnDef<InvoiceWithSeller>[] = [
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
    cell: ({ row }) => formatDate(row.original.invoice_date.toString()),
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
        {Array.isArray(row.original?.products)
          ? row.original.products.length
          : 0}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: "Iznos",
    cell: ({ row }) => {
      const products = row.original?.products as Product[];
      const total = products.reduce((acc, product) => {
        return acc + product.unit_price * product.quantity;
      }, 0);

      return <span>{formatPrice(total)}</span>;
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
