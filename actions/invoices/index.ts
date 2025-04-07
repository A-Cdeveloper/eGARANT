"use server";

import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { InvoiceWithSeller } from "@/types";
import { Invoice, Prisma } from "@prisma/client";

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllUserInvoices = async (
  uid: string
): Promise<
  { data: InvoiceWithSeller[]; error: null } | { data: null; error: string }
> => {
  try {
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

    return { data: invoices, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

////////////////////////////////////////////////////////////////////
export const getUserInvoice = async (
  iid: string,
  uid: string
): Promise<
  { data: InvoiceWithSeller; error: null } | { data: null; error: string }
> => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        iid,
        uid,
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

    if (!invoice) {
      return { data: null, error: "Račun ne postoji." };
    }

    return { data: invoice, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

////////////////////////////////////////////////////////////////////
export const addInvoice = async (
  invoice: Omit<Invoice, "iid">
): Promise<{ data: Invoice | null; error: string | null }> => {
  try {
    const numberOfInvoices = await prisma.invoice.count();
    const newInvoice = await prisma.invoice.create({
      data: {
        ...invoice,
        invoice_number: `00${numberOfInvoices + 1}`,
        products: invoice.products as Prisma.InputJsonValue,
      },
    });
    return { data: newInvoice, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};
