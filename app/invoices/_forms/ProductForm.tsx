import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types";
import React, { useRef, useState } from "react";

const ProductForm = ({
  removeNewFormular,
  mode,
  product,
  setProducts,
  setIsDirty,
  setShowNewProductForm,
}: {
  removeNewFormular: () => void;
  mode?: string;
  product?: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNewProductForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const productNameRef = useRef<HTMLTextAreaElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const productPeriodRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  /////////////////////////////////////////////////////////////////////

  const handleProduct = (mode: "add" | "edit", id?: string) => {
    const productName = productNameRef.current?.value;
    const productPrice = Number(productPriceRef.current?.value);
    const productQuantity = Number(productQuantityRef.current?.value);
    const productPeriod = productPeriodRef.current?.value;

    if (!productName || !productPrice || !productPeriod || !productQuantity) {
      setError("Morate popuniti sve detalje artikla.");
      return;
    }

    if (mode === "add") {
      const newProduct = {
        productId: crypto.randomUUID(),
        name: productName,
        quantity: productQuantity,
        unit_price: productPrice,
        garantee: +productPeriod,
      } as unknown as Product;

      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setSuccess(true);

      // Clear form
      productNameRef.current!.value = "";
      productPriceRef.current!.value = "";
      productQuantityRef.current!.value = "";
      productPeriodRef.current!.value = "";
      setShowNewProductForm(false);
      setError("");
    }

    if (mode === "edit" && id) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.productId === id
            ? {
                ...p,
                name: productName,
                quantity: productQuantity,
                unit_price: productPrice,
                garantee: +productPeriod,
              }
            : p
        )
      );
      setSuccess(true);
      setError("");
    }
  };

  const removeProductHandler = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.productId !== id)
    );
  };

  const isEdit = mode === "edit";

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-[250px_60px_100px_80px_1fr] p-2 lg:p-4 items-center text-[14px] 
 space-y-[8px] sm:space-y-0 gap-5 ${
   !isEdit ? "bg-green-900/20" : ""
 } my-5 md:my-1`}
      >
        <div>
          <Textarea
            defaultValue={isEdit ? product?.name : ""}
            placeholder="Naziv artikla"
            ref={productNameRef}
            className="p-1"
            onChange={() => setIsDirty(true)}
            onBlur={(e) => {
              e.preventDefault();
              if (isEdit && product?.productId) {
                handleProduct("edit", product.productId);
              } else {
                handleProduct("add");
              }
            }}
            required
          />
        </div>
        <div className="flex gap-1 items-center">
          <Input
            type="number"
            min={1}
            defaultValue={isEdit ? product?.quantity : ""}
            ref={productQuantityRef}
            className="p-1 md:placeholder:opacity-0"
            placeholder="Količina"
            onChange={() => setIsDirty(true)}
            onBlur={(e) => {
              e.preventDefault();
              if (isEdit && product?.productId) {
                handleProduct("edit", product.productId);
              } else {
                handleProduct("add");
              }
            }}
            required
          />
        </div>

        <div className="flex gap-1 items-center">
          <Input
            min={1}
            type="number"
            defaultValue={isEdit ? product?.unit_price : ""}
            ref={productPriceRef}
            className="p-1 md:placeholder:opacity-0"
            placeholder="Cena"
            onChange={() => setIsDirty(true)}
            onBlur={(e) => {
              e.preventDefault();
              if (isEdit && product?.productId) {
                handleProduct("edit", product.productId);
              } else {
                handleProduct("add");
              }
            }}
            required
          />{" "}
          RSD
        </div>

        <div>
          <div className="flex gap-1 items-center">
            <Input
              min={1}
              type="number"
              defaultValue={isEdit ? product?.garantee : ""}
              className="w-full md:w-[60px] p-1 md:placeholder:opacity-0"
              ref={productPeriodRef}
              placeholder="Garancija"
              onChange={() => setIsDirty(true)}
              onBlur={(e) => {
                e.preventDefault();
                if (isEdit && product?.productId) {
                  handleProduct("edit", product.productId);
                } else {
                  handleProduct("add");
                }
              }}
              required
            />{" "}
            mes
          </div>
        </div>
        <div>
          <Button
            size="sm"
            variant="secondary"
            onClick={
              isEdit && product
                ? () => removeProductHandler(product.productId)
                : removeNewFormular
            }
          >
            Obriši
          </Button>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && !error && (
        <div className="text-green-600 text-sm text-center">
          {mode === "add"
            ? "Artikal uspješno dodan!"
            : "Artikal uspješno ažuriran!"}
        </div>
      )}
    </>
  );
};

export default ProductForm;
