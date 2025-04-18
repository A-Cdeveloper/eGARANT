"use server";

import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import {
  editProfileFormSchema,
  registerPasswordSchema,
} from "@/zod/authShemas";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UserResponseTypeWithId } from "../auth";

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

export const changePassword = async (
  prevFormData: unknown,
  formData: FormData
): Promise<{
  error: string | string[] | null;
  success: boolean;
}> => {
  const user = {
    uid: formData.get("uid") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerPasswordSchema.safeParse(user.password);

  if (!parsed.success) {
    return {
      error: parseError(parsed.error),
      success: false,
    };
  }

  try {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });
    revalidatePath("/profile");

    return { error: null, success: true };
  } catch (error) {
    return { error: parseError(error), success: false };
  }
};
