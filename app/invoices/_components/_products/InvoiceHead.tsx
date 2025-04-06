import {
  formatDate,
  formatPrice,
  getJsonArrayLength,
  reduceJsonArray,
} from "@/lib/utils";
import { InvoiceWithSeller, Product } from "@/types";
import React from "react";

const InvoiceHead = ({ invoice }: { invoice: InvoiceWithSeller }) => {
  const total = reduceJsonArray<Product>(
    invoice?.products,
    (acc, p) => acc + p.unit_price * p.quantity
  );

  return (
    <div className="border-y-2 border-primary/10 bg-white p-4 flex flex-wrap text-[15px] justify-beatween">
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <p>
          Trgovac: <br />
          <strong>{invoice?.seller.name}</strong>
        </p>
        <p>{invoice?.seller.address}</p>
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
