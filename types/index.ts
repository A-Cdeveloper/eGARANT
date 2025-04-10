import { Prisma } from "@prisma/client";

export type Product = {
  productId: string;
  name: string;
  quantity: number;
  unit_price: number;
  garantee: number;
};

export type InvoiceWithSeller = Prisma.InvoiceGetPayload<{
  include: {
    seller: {
      select: {
        name: true;
        address: true;
        city: true;
        phone: true;
        email: true;
      };
    };
  };
}>;
