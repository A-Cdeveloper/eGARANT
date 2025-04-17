"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export type UserResponseTypeProfile = Omit<
  User,
  "passwordHash" | "verificationToken" | "isVerified"
>;

export const getProdileData = async (
  uid: string
): Promise<{
  data: UserResponseTypeProfile | null;
  error: string | string[] | null;
}> => {
  const user = await prisma.user.findUnique({
    where: {
      uid,
    },
    select: {
      uid: true,
      firstname: true,
      lastname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return { data: null, error: ["Korisnik ne postoji."] };
  }

  return { data: user, error: null };
};
