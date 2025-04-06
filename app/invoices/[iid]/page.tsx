import { getUserInvoice } from "@/actions/invoices";
import BackButton from "@/components/buttons/BackButton";
import {
  formatDate,
  formatPrice,
  getJsonArrayLength,
  mapJsonArray,
  reduceJsonArray,
} from "@/lib/utils";
import { Product } from "@/types";

import React, { Suspense } from "react";
import ProductStatus from "../_components/ProductStatus";
import Image from "next/image";
import { ErrorMessage } from "@/components/errors/ErrorMessage";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type Params = Promise<{ iid: string }>;

const InvoicePage = async ({ params }: { params: Params }) => {
  const { iid } = await params;

  return (
    <>
      <BackButton to="/invoices" />
      <h2>Detalji računa {iid}</h2>
      <Suspense
        fallback={
          <>
            <Skeleton className="w-[100%] h-[80px] mb-5 rounded-md bg-gray-200" />
            <TableSkeleton n={3} />
          </>
        }
      >
        <Invoice id={iid} />
      </Suspense>
    </>
  );
};

export default InvoicePage;

///////////////

export const Invoice = async ({ id }: { id: string }) => {
  const { data: invoice, error } = await getUserInvoice(id, "1");

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  const total = reduceJsonArray<Product>(
    invoice?.products,
    (acc, p) => acc + p.unit_price * p.quantity
  );
  return (
    <>
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

      {/*  */}
      <div className="border-y-2 border-primary/10 bg-white my-3 text-[15px]">
        <div className="hidden sm:grid sm:grid-cols-[250px_140px_150px_1fr] py-1 bg-primary/20 px-4 font-semibold">
          <div>Artikal</div>
          <div>Cena</div>
          <div>Garancija</div>
          <div></div>
          <div></div>
        </div>

        {mapJsonArray<Product, React.ReactNode>(
          invoice?.products,
          (product) => {
            return (
              <div
                key={product.productId}
                className="grid grid-cols-1 sm:grid-cols-[250px_140px_150px_1fr_50px]  py-5 sm:py-2 px-4 items-center text-[14px] border-b border-gray-200 [&:last-of-type]:border-0 space-y-[8px] sm:space-y-0"
              >
                <div>
                  <span className="font-semibold">{product.name}</span> x{" "}
                  {product.quantity}
                </div>
                <div>
                  <span className="inline-block sm:hidden">Cena:</span>
                  {formatPrice(product.unit_price)}
                </div>
                {product.garantee && (
                  <div>
                    <span className="inline-block sm:hidden">Garancija:</span>
                    {`${product.garantee} meseci`}
                  </div>
                )}
                {invoice?.invoice_date && (
                  <ProductStatus
                    date={invoice.invoice_date}
                    gperiod={product.garantee}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
      <Image
        src={invoice?.invoice_image as string}
        alt="bill"
        width={300}
        height={300}
      />
    </>
  );
};
