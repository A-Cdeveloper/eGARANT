"use server";

import { MAX_UPLOAD_FILE_SIZE } from "@/lib/constants";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { getOptimizedImageURL, optimizeImage, pinata } from "@/pinata/config";
import { InvoiceWithSeller } from "@/types";
import { InvoiceFormSchema } from "@/zod/invoiceShemas";
import { Invoice, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllUserInvoices = async (
  uid: string
): Promise<
  | { data: InvoiceWithSeller[]; error: null }
  | { data: null; error: string | string[] }
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
  | { data: InvoiceWithSeller; error: null }
  | { data: null; error: string | string[] }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevFormData: any,
  formData: FormData
): Promise<{
  data: Omit<Invoice, "iid" | "invoice_number"> | null;
  error: string | string[] | null;
}> => {
  const invoice = {
    sid: formData.get("sid") as string,
    uid: "1",
    invoice_date: formData.get("date")
      ? new Date(formData.get("date") as string)
      : undefined,
    invoice_image: formData.get("invoice_image") as string,
    products: formData.get("products") as Prisma.JsonValue,
  };

  const parsed = InvoiceFormSchema.safeParse(invoice);

  if (!parsed.success) {
    return {
      data: invoice as Omit<Invoice, "iid" | "invoice_number">,
      error: parseError(parsed.error),
    };
  }

  try {
    const numberOfInvoices = await prisma.invoice.count();
    const newInvoice = await prisma.invoice.create({
      data: {
        ...invoice,
        invoice_number: `00${numberOfInvoices + 1}`,
        products: JSON.parse(invoice.products as string),
      },
    });
    revalidatePath("/invoices");
    return { data: newInvoice, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

////////////////////////////////////////////////////////////////////
export const deleteInvoice = async (iid: string) => {
  try {
    await prisma.invoice.delete({
      where: {
        iid,
      },
    });
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
  revalidatePath("/invoices");
};

////////////////////////////////////////////////////////////////////
export const uploadInvoiceImage = async (file: File) => {
  try {
    if (file.size === 0) {
      throw new Error(`Slika nije uploadovana`);
    }

    if (file.size > MAX_UPLOAD_FILE_SIZE) {
      throw new Error(`Maksimalna velicina fotografije je 10MB`);
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      throw new Error(`Fotografija mora biti u JPG ili PNG formatu`);
    }

    const optimizeFile = await optimizeImage(file);

    const uploadImage = await pinata.upload.public.file(optimizeFile);

    const url = await getOptimizedImageURL(uploadImage.cid as string);

    return {
      data: { url: url, id: uploadImage.id },
      error: null,
    };
  } catch (error: unknown) {
    return { data: null, error: parseError(error) };
  }
};
