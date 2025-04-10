import { z } from "zod";

export const InvoiceFormSchema = z.object({
  sid: z.string().uuid({ message: "Izaberite prodajno mesto." }),
  invoice_date: z
    .date({
      required_error: "Datum računa je obavezan.",
      invalid_type_error: "Datum računa je obavezan.",
    })
    .refine((date) => date <= new Date(), {
      message: "Datum računa ne može biti u budućnosti.",
    }),

  products: z.string().refine(
    (val) => {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) && parsed.length > 0;
      } catch {
        return false;
      }
    },
    {
      message: "Morate dodati bar jedan artikal.",
    }
  ),

  invoice_image: z
    .string()
    .url("Neispravan URL slike.")
    .nonempty("Slika računa je obavezna."),
});
