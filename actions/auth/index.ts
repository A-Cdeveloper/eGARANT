"use server";

import { createJWT, decodeJWT, hashPassword, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/db";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/emails/sendEmail";
import { parseError } from "@/lib/errors";
import {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
} from "@/zod/authShemas";
import { User } from "@prisma/client";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export type UserResponseType = Pick<User, "firstname" | "lastname" | "email">;
export type UserResponseTypeWithId = UserResponseType & { uid: string };

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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

  const noUser = {
    firstname: "",
    lastname: "",
    email: visitor.email,
  };

  if (!parsed.success) {
    return {
      data: noUser,
      error: parseError(parsed.error),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: visitor.email },
    });
    if (!user) {
      return {
        data: noUser,
        error: ["Korisnik sa ovom email adresom ne postoji."],
      };
    }

    const isPasswordValid = await verifyPassword(
      visitor.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return {
        data: noUser,
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

  const User = {
    firstname: visitor.firstname,
    lastname: visitor.lastname,
    email: visitor.email,
  };

  if (!parsed.success) {
    return {
      data: User,
      error: parseError(parsed.error),
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: visitor.email as string,
    },
  });

  if (existingUser && !existingUser?.isVerified) {
    return {
      data: User,
      error: ["Korisnik sa ovom email adresom postoji, ali nije verifikovan."],
    };
  }

  if (existingUser) {
    return {
      data: User,
      error: ["Korisnik sa ovom email adresom već postoji."],
    };
  }

  try {
    const verificationToken = randomBytes(32).toString("hex");
    const hashedPassword = await hashPassword(visitor.password);

    await prisma.user.create({
      data: {
        ...User,
        isVerified: false,
        createdAt: new Date(),
        passwordHash: hashedPassword,
        verificationToken,
      },
    });

    await sendVerificationEmail(visitor.email as string, verificationToken);

    return {
      data: User,
      error: null,
    };
  } catch (error) {
    return {
      data: User,
      error: parseError(error),
    };
  }
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("garantUser");
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

export const userVerification = async (
  verificationToken: string
): Promise<{
  title: string;
  message?: string;
  status: boolean;
  userEmail?: string;
}> => {
  if (!verificationToken) {
    return {
      status: false,
      title: "Verifikacioni token ne postoji.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      verificationToken,
    },
  });

  if (!user) {
    return {
      status: false,
      title: "Verifikacioni token nije validan.",
      message: `Korisnik sa ovim verifikacionim tokenom ne postoji.
      Molimo proverite vašu e-mail adresu i pokušajte ponovo.`,
    };
  }

  await prisma.user.update({
    where: {
      uid: user.uid,
    },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });

  return {
    status: true,
    title: "Verifikacioni token je validan.",
    message: `Uspešno ste se aktivirali nalog.`,
    userEmail: user.email,
  };
};

export const forgotPassword = async (
  prevFormData: unknown,
  formData: FormData
): Promise<{
  data: UserResponseType | null;
  error: string | string[] | null;
}> => {
  const email = formData.get("email") as string;

  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return {
      data: null,
      error: parseError(parsed.error),
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { data: user, error: ["Korisnik ne postoji."] };
  }

  if (!user.isVerified) {
    return { data: user, error: ["Korisnik nije verifikovan."] };
  }

  try {
    const generatedPasword = randomBytes(10).toString("hex");
    await prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: {
        passwordHash: await hashPassword(generatedPasword),
        updatedAt: new Date(),
      },
    });

    await sendPasswordResetEmail(email, generatedPasword);

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: parseError(error) };
  }
};

export const getUserFromCookies = async (): Promise<{
  data: UserResponseTypeWithId | null;
  error: string | string[] | null;
  tokenExpiry: number | null;
}> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("garantUser")?.value;

  if (!cookie) {
    return { data: null, error: null, tokenExpiry: null };
  }

  try {
    const { userId, tokenExpiry } = await decodeJWT(cookie);
    const expiry = typeof tokenExpiry === "number" ? tokenExpiry : null;

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: {
        uid: userId,
      },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });

    if (!user) {
      return { data: null, error: "Korisnik ne postoji.", tokenExpiry: null };
    }

    return {
      data: {
        uid: user.uid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      tokenExpiry: expiry,
      error: null,
    };
  } catch (error) {
    return { data: null, error: parseError(error), tokenExpiry: null };
  }
};
