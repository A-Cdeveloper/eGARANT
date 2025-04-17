"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { UserResponseTypeWithId } from "../auth";
import { editProfileFormSchema } from "@/zod/authShemas";
import { parseError } from "@/lib/errors";
import { revalidatePath } from "next/cache";

export type UserResponseTypeProfile = Omit<
  User,
  "passwordHash" | "verificationToken" | "isVerified"
>;

export const getProfileData = async (
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

export const editProfileData = async (
  prevFormData: unknown,
  formData: FormData
): Promise<{
  data: UserResponseTypeWithId | null;
  error: string | string[] | null;
  success: boolean;
}> => {
  const user = {
    uid: formData.get("uid") as string,
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
  };

  const parsed = editProfileFormSchema.safeParse(user);

  if (!parsed.success) {
    return {
      data: user as UserResponseTypeWithId,
      error: parseError(parsed.error),
      success: false,
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
    revalidatePath("/profile");
    return { data: updatedUser, error: null, success: true };
  } catch (error) {
    return { data: null, error: parseError(error), success: false };
  }
};
