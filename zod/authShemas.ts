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

export const loginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

// export const registerPasswordSchema = z
//   .string()
//   .refine((value) => value.trim() !== "", {
//     message: t("zod.password_empty"),
//   })
//   .refine((value) => value.length >= 8, {
//     message: t("zod.password_too_short"),
//   })
//   .refine((value) => value.length <= 100, {
//     message: t("zod.password_too_long"),
//   })
//   .refine((value) => /[A-Z]/.test(value), {
//     message: t("zod.password_alpha_caps"),
//   })
//   .refine((value) => /[0-9]/.test(value), {
//     message: t("zod.password_numeric"),
//   })
//   .refine((value) => /[@$!%*?&#]/.test(value), {
//     message: t("zod.password_special"),
//   })
//   .transform((val) => val.trim());
