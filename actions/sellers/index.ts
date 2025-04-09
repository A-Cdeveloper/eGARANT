/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { SellerFormSchema } from "@/zod/sellerSchemas";
import { Seller } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getAllSellers = async () => {
  try {
    const sellers = await prisma.seller.findMany();
    return { data: sellers, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addNewSeller = async (
  prevFormData: any,
  formData: FormData
): Promise<{
  data: Omit<Seller, "sid"> | null;
  error: string | string[] | null;
}> => {
  const seller = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  const parsed = SellerFormSchema.safeParse(seller);

  if (!parsed.success) {
    return {
      data: seller,
      error: parseError(parsed.error),
    };
  }

  const existingSeller = await prisma.seller.findFirst({
    where: {
      email: seller.email,
      phone: seller.phone,
    },
  });

  if (existingSeller) {
    return {
      data: seller,
      error: ["Prodajno mesto sa tim podacima vec postoji."],
    };
  }

  try {
    const newSeller = await prisma.seller.create({
      data: seller,
    });
    revalidatePath("/invoices/add-new");
    return { data: newSeller, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};
