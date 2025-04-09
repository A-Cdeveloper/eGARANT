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

export const SellerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Naziv prodajnog mesta je obavezan.")
    .max(50, "Naziv prodajnog mesta može imati najviše 50 karaktera.")
    .transform((val) => val.trim()),
  address: z
    .string()
    .min(1, "Adresa prodajnog mesta je obavezna.")
    .max(50, "Adresa prodajnog mesta može imati najviše 50 karaktera.")
    .transform((val) => val.trim()),
  city: z
    .string()
    .min(1, "Grad u kome se nalazi prodajno mesto je obavezan.")
    .max(50, "Ime grada može imati najviše 50 karaktera.")
    .transform((val) => val.trim()),

  email: emailSchema,
});
