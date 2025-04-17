import { z } from "zod";

export const emailSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: "Email ne može biti prazan.",
  })
  .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: "Email nije validan.",
  })
  .transform((val) => val.trim());

export const loginPasswordSchema = z.string().min(1, "Lozinka je obavezna.");

export const registerPasswordSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: "Lozinka je obavezna.",
  })
  .refine((value) => value.length >= 8, {
    message: "Lozinka mora imati najmanje 8 karaktera.",
  })
  .refine((value) => value.length <= 100, {
    message: "Lozinka moze imati najvise 100 karaktera.",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Lozinka mora imati najmanje jedno veliko slovo.",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Lozinka mora imati najmanje jedan broj.",
  })
  .transform((val) => val.trim());

/////////////////////////////////////

export const loginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export const registerFormSchema = z.object({
  firstname: z
    .string()
    .min(1, "Ime je obavezno.")
    .max(50, "Ime može imati najviše 50 karaktera.")
    .transform((val) => val.trim()),
  lastname: z
    .string()
    .min(1, "Prezime je obavezno.")
    .max(50, "Prezime može imati najviše 50 karaktera.")
    .transform((val) => val.trim()),
  email: emailSchema,
  password: registerPasswordSchema,
});

export const editProfileFormSchema = registerFormSchema.omit({
  password: true,
});
