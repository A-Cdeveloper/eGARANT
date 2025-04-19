import { Invoice, Prisma } from "@prisma/client";

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

export type InvoiceWithProducts = InvoiceWithSeller & {
  products: Product[];
};

export type SuccessInvoices = {
  data: InvoiceWithSeller[];
  count: number;
  totalProductCount: number;
  totalPrice: number;
  error: null;
};
export type FailureInvoices = {
  data: null;
  count: number;
  totalProductCount: number;
  totalPrice: number;
  error: string | string[];
};

export type Success = { data: InvoiceWithSeller; error: null };
export type Failure = { data: null; error: string | string[] };
export type InputInvoice = Omit<Invoice, "iid" | "invoice_number">;
