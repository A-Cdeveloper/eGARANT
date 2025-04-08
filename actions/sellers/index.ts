"use server";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { Seller } from "@prisma/client";

export const getAllSellers = async () => {
  try {
    const sellers = await prisma.seller.findMany();
    return { data: sellers, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

export const addNewSeller = async (
  seller: Omit<Seller, "sid">
): Promise<{ data: Seller | null; error: string | null }> => {
  try {
    const newSeller = await prisma.seller.create({
      data: seller,
    });
    return { data: newSeller, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};
