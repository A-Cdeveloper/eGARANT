"use server";

import prisma from "@/lib/db";
import { InvoiceWithSeller } from "@/types";

export const getAllUserInvoices = async (
  uid: string
): Promise<InvoiceWithSeller[]> => {
  const invoices = await prisma.invoice.findMany({
    where: {
      user: {
        uid,
      },
    },
    include: {
      seller: {
        select: {
          name: true,
          address: true,
          city: true,
        },
      },
    },
  });

  return invoices;
};
