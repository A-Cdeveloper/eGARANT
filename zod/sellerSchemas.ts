import { z } from "zod";
import { emailSchema } from "./authShemas";

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
