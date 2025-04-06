// lib/errors.ts
import { Prisma } from "@prisma/client";

export const parseError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return `Unique constraint failed: ${JSON.stringify(
          error.meta?.target
        )}`;
      case "P2025":
        return "Record not found.";
      case "P2003":
        return "Invalid reference to related data.";
      case "P2001":
        return "No matching record found.";
      default:
        return `Database error`;
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError)
    return "Unknown database error occurred.";
  if (error instanceof Prisma.PrismaClientRustPanicError)
    return "A critical database error occurred.";
  if (error instanceof Prisma.PrismaClientInitializationError)
    return "Could not connect to the database.";
  if (error instanceof Prisma.PrismaClientValidationError)
    return "Invalid data provided.";

  if (typeof error === "string") return error;

  if (error instanceof Error) {
    // Network error, fetch error, etc.
    if (error.name === "FetchError") return "Failed to fetch data.";
    if (error.message.includes("NetworkError"))
      return "Network error occurred.";
    return error.message;
  }

  // Handle HTTP error responses (for example, if using fetch and you manually throw an error)
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "statusText" in error
  ) {
    const err = error as { status: number; statusText: string };
    return `HTTP Error ${err.status}: ${err.statusText}`;
  }

  return "An unexpected error occurred.";
};
