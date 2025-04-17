"use server";

import { MAX_UPLOAD_FILE_SIZE } from "@/lib/constants";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { calculateInvoiceTotal } from "@/lib/utils";
import { getOptimizedImageURL, optimizeImage, pinata } from "@/pinata/config";
import { InvoiceWithProducts, InvoiceWithSeller } from "@/types";
import { InvoiceFormSchema } from "@/zod/invoiceShemas";
import { Invoice, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllUserInvoices = async (
  uid: string,
  filter: string | undefined = "",
  sort: string = "invoice_date-desc"
): Promise<
  | {
      data: InvoiceWithSeller[];
      count: number;
      totalProductCount: number;
      totalPrice: number;
      error: null;
    }
  | {
      data: null;
      count: number;
      totalProductCount: number;
      totalPrice: number;
      error: string | string[];
    }
> => {
  const [field, order] = sort.split("-") as [string, "asc" | "desc"];

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        uid,
      },
      include: {
        seller: {
          select: {
            name: true,
            address: true,
            city: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy:
        field !== "total"
          ? {
              [field]: order,
            }
          : undefined,
    });

    const count = await prisma.invoice.count({
      where: {
        uid,
      },
    });

    // Filter by product name if needed
    const filteredInvoices = filter
      ? (invoices as InvoiceWithProducts[]).filter((invoice) =>
          invoice.products.some((product) =>
            product.name.toLowerCase().includes(filter.toLowerCase())
          )
        )
      : (invoices as InvoiceWithProducts[]);

    // Total price & product count from all (filtered) invoices
    let totalPrice = 0;
    let totalProductCount = 0;

    for (const invoice of filteredInvoices) {
      for (const product of invoice.products) {
        totalPrice += product.unit_price * product.quantity;
        totalProductCount += product.quantity;
      }
    }

    // Sort if "total" is selected
    const sortedInvoices =
      field === "total"
        ? [...filteredInvoices].sort((a, b) => {
            const totalA = calculateInvoiceTotal(a.products);
            const totalB = calculateInvoiceTotal(b.products);
            return order === "asc" ? totalA - totalB : totalB - totalA;
          })
        : filteredInvoices;

    return {
      data: sortedInvoices,
      count,
      totalProductCount,
      totalPrice,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      count: 0,
      totalProductCount: 0,
      totalPrice: 0,
      error: parseError(error),
    };
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
            phone: true,
            email: true,
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
    uid: formData.get("uid") as string,
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
    console.log(error);
    return { data: null, error: parseError(error) };
  }
};

export const updateInvoice = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevFormData: any,
  formData: FormData
): Promise<{
  data: Omit<Invoice, "invoice_number"> | null;
  error: string | string[] | null;
}> => {
  const invoice = {
    iid: formData.get("iid") as string,
    sid: formData.get("sid") as string,
    invoice_date: formData.get("date")
      ? new Date(formData.get("date") as string)
      : undefined,
    invoice_image: formData.get("invoice_image") as string,
    products: formData.get("products") as Prisma.JsonValue,
  };

  const parsed = InvoiceFormSchema.safeParse(invoice);

  if (!parsed.success) {
    return {
      data: invoice as Omit<Invoice, "invoice_number">,
      error: parseError(parsed.error),
    };
  }

  try {
    const updatedInvoice = await prisma.invoice.update({
      where: {
        iid: invoice.iid,
      },
      data: {
        ...invoice,
        products: JSON.parse(invoice.products as string),
      },
    });
    revalidatePath("/invoices");
    return {
      data: updatedInvoice,
      error: null,
    };
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
