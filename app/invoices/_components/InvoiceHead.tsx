import {
  formatDate,
  formatPrice,
  getJsonArrayLength,
  reduceJsonArray,
} from "@/lib/utils";
import { InvoiceWithSeller, Product } from "@/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const InvoiceHead = ({ invoice }: { invoice: InvoiceWithSeller }) => {
  const total = useMemo(() => {
    return reduceJsonArray<Product>(
      invoice?.products,
      (acc, p) => acc + p.unit_price * p.quantity,
      0
    );
  }, [invoice?.products]);
  return (
    <div className="border-y-2 border-primary/10 bg-white p-4 flex flex-wrap text-[15px] justify-beatween">
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <p>
          Trgovac: <br />
          <strong>{invoice?.seller.name}</strong>
        </p>
        <p>
          {invoice?.seller.address}, {invoice?.seller.city}
        </p>
        <p>{invoice?.seller.phone}</p>
        <p>{invoice?.seller.email}</p>
        <p>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              invoice?.seller.address
            )},+${invoice?.seller.city}`}
            target="_blank"
            className="text-primary underline text-sm hover:text-secondary flex items-center gap-1"
            rel="noopener noreferrer"
            title={`${invoice?.seller.address}, ${invoice?.seller.city}`}
          >
            pokaži na mapi <ExternalLink size={14} />
          </Link>
        </p>
      </div>

      <div className="w-auto">
        <div>
          Datum prometa:{" "}
          <strong>{formatDate(invoice?.invoice_date as Date)} </strong>
        </div>
        <div>
          Ukupan iznos: <strong>{formatPrice(total)}</strong>
        </div>
        <div>
          Ukupno artikla:{" "}
          <strong>{getJsonArrayLength(invoice?.products)}</strong>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHead;
