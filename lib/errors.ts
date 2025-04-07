// lib/errors.ts
import { Prisma } from "@prisma/client";

export const parseError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return `Neuspeh zbog jedinstvenog ograničenja: ${JSON.stringify(
          error.meta?.target
        )}`;
      case "P2025":
        return "Zapis nije pronađen.";
      case "P2003":
        return "Nevažeća referenca na povezane podatke.";
      case "P2001":
        return "Nema odgovarajućeg zapisa.";
      default:
        return `Greška u bazi podataka.`;
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError)
    return "Došlo je do nepoznate greške u bazi podataka.";
  if (error instanceof Prisma.PrismaClientRustPanicError)
    return "Došlo je do kritične greške u bazi podataka.";
  if (error instanceof Prisma.PrismaClientInitializationError)
    return "Nije moguće povezati se sa bazom podataka.";
  if (error instanceof Prisma.PrismaClientValidationError)
    return "Uneti podaci nisu validni.";

  if (typeof error === "string") return error;

  if (error instanceof Error) {
    // Mrežna greška, fetch greška, itd.
    if (error.name === "FetchError") return "Neuspešno preuzimanje podataka.";
    if (error.message.includes("NetworkError"))
      return "Došlo je do mrežne greške.";
    return error.message;
  }

  // Obrada HTTP grešaka (npr. ako koristite fetch i ručno bacate grešku)
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "statusText" in error
  ) {
    const err = error as { status: number; statusText: string };
    return `HTTP greška ${err.status}: ${err.statusText}`;
  }

  return "Došlo je do neočekivane greške.";
};
