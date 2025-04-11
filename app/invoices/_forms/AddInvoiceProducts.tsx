"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { Prisma } from "@prisma/client";

const AddInvoiceProducts = ({
  defaultProducts,
  setIsDirty,
}: {
  defaultProducts: Prisma.JsonArray;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [products, setProducts] = useState<Product[]>(
    defaultProducts as Product[]
  );
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const addNewFormular = () => {
    setShowNewProductForm(true);
    setIsDirty(true);
  };

  const removeNewFormular = () => {
    setShowNewProductForm(false);
    setIsDirty(false);
  };

  return (
    <>
      <Input type="hidden" name="products" value={JSON.stringify(products)} />

      {/* PROIYVODI */}

      <div className="hidden md:grid sm:grid-cols-[220px_80px_120px_100px_1fr] py-1 bg-primary/20 px-4 font-semibold">
        <div>Artikal</div>
        <div>Kol.</div>
        <div>Cena</div>
        <div>Garancija</div>
        <div></div>
      </div>

      {products.map((product) => {
        return (
          <ProductForm
            key={product.productId}
            removeNewFormular={removeNewFormular}
            setProducts={setProducts}
            setShowNewProductForm={setShowNewProductForm}
            mode="edit"
            product={product}
          />
        );
      })}

      {showNewProductForm && (
        <ProductForm
          removeNewFormular={removeNewFormular}
          setProducts={setProducts}
          setShowNewProductForm={setShowNewProductForm}
          mode="add"
        />
      )}

      <div className="text-end my-3">
        <Button
          size="sm"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            addNewFormular();
          }}
        >
          Dodaj proizvod
        </Button>
      </div>
    </>
  );
};

export default AddInvoiceProducts;
