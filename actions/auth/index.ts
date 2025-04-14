"use server";

import { createJWT, hashPassword, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/db";
import { parseError } from "@/lib/errors";
import { loginFormSchema, registerFormSchema } from "@/zod/authShemas";
import { User } from "@prisma/client";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

type UserResponseType = Pick<User, "firstname" | "lastname" | "email">;

export const loginUser = async (
  prevFormData: unknown,
  formData: FormData
): Promise<{
  data: UserResponseType | null;
  error: string | string[] | null;
}> => {
  const visitor = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginFormSchema.safeParse(visitor);

  if (!parsed.success) {
    return {
      data: {
        firstname: "",
        lastname: "",
        email: visitor.email,
      },
      error: parseError(parsed.error),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: visitor.email },
    });
    if (!user) {
      return {
        data: {
          firstname: "",
          lastname: "",
          email: visitor.email,
        },
        error: ["Korisnik sa ovom email adresom ne postoji."],
      };
    }

    const isPasswordValid = await verifyPassword(
      visitor.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return {
        data: {
          firstname: "",
          lastname: "",
          email: visitor.email,
        },
        error: ["Pogrešna lozinka. Pokušajte ponovo."],
      };
    }

    const currentLocalTime = new Date();

    const tokenExpiry = currentLocalTime.getTime() + 4 * 60 * 60 * 1000;

    //const token = await createJWT(user.uid.toString());
    const token = await createJWT(user.uid.toString(), tokenExpiry);

    (await cookies()).set("garantUser", token, {
      httpOnly: true,
      secure: true, // Ensure secure cookies in production
      sameSite: "none",
      path: "/",
      maxAge: 4.1 * 60 * 60,
    });

    return {
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

export const registerUser = async (
  prevFormData: unknown,
  formData: FormData
): Promise<{
  data: UserResponseType | null;
  error: string | string[] | null;
}> => {
  const visitor = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerFormSchema.safeParse(visitor);

  if (!parsed.success) {
    return {
      data: {
        firstname: visitor.firstname,
        lastname: visitor.lastname,
        email: visitor.email,
      },
      error: parseError(parsed.error),
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: visitor.email as string,
    },
  });

  if (existingUser) {
    return {
      data: {
        firstname: visitor.firstname,
        lastname: visitor.lastname,
        email: visitor.email,
      },
      error: ["Korisnik sa ovom email adresom već postoji."],
    };
  }

  try {
    const verificationToken = randomBytes(32).toString("hex");
    const hashedPassword = await hashPassword(visitor.password);

    await prisma.user.create({
      data: {
        firstname: visitor.firstname as string,
        lastname: visitor.lastname as string,
        email: visitor.email as string,
        isVerified: false,
        createdAt: new Date(),
        passwordHash: hashedPassword,
        verificationToken,
        status: "ACTIVE",
      },
    });

    return {
      data: null,
      error: null,
    };

    // await sendAdminWelcomeEmail(data.email as string, verificationToken);
  } catch (error) {
    return {
      data: {
        firstname: visitor.firstname,
        lastname: visitor.lastname,
        email: visitor.email,
      },
      error: parseError(error),
    };
  }
};
