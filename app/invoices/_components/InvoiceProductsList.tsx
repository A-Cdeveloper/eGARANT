import { formatPrice, mapJsonArray } from "@/lib/utils";
import { InvoiceWithSeller, Product } from "@/types";

import ProductStatus from "./_products/_view/ProductStatus";

const InvoiceProductsList = ({ invoice }: { invoice: InvoiceWithSeller }) => {
  return (
    <>
      <div className="border-y-2 border-primary/10 bg-white my-3 text-[15px]">
        <div className="hidden sm:grid sm:grid-cols-[250px_140px_150px_1fr] py-1 bg-primary/20 px-4 font-semibold">
          <div>Artikal</div>
          <div>Cena</div>
          <div>Garancija</div>
          <div></div>
          <div></div>
        </div>

        {mapJsonArray<Product, React.ReactNode>(invoice.products, (product) => {
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

              <div>
                <span className="inline-block sm:hidden">Garancija:</span>
                {`${product.garantee} meseci`}
              </div>

              {invoice?.invoice_date && (
                <ProductStatus
                  date={invoice.invoice_date}
                  gperiod={product.garantee}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InvoiceProductsList;
