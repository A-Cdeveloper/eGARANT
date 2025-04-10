"use client";
import { uploadInvoiceImage } from "@/actions/invoices";
import MiniSpinner from "@/components/MiniSpinner";
import CloseButton from "@/components/buttons/CloseButton";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import React, { useCallback, useState } from "react";

const AddInvoiceImage = ({
  invoice_image,
  setIsLoading,
  loading,
}: {
  invoice_image: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const [fileUrl, setFileUrl] = useState<string>(invoice_image);
  const [error, setError] = useState<string | string[]>("");

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      setIsLoading(true);

      const { data, error } = await uploadInvoiceImage(selectedFile as File);

      if (data === null) {
        setError(error);
      } else {
        setFileUrl(data?.url as string);
        setError("");
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return (
    <div className="flex flex-wrap justify-between">
      <Input type="hidden" name="invoice_image" value={fileUrl || ""} />
      {!fileUrl && !loading && (
        <div className="w-full sm:w-1/2">
          <Input
            type="file"
            name="invoice_image"
            id="invoice_image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="invoice_image"
            className="block p-3 border border-dashed border-gray-400 text-[14px] my-2 cursor-pointer text-center"
          >
            Dodaj sliku
          </label>
        </div>
      )}
      {fileUrl && (
        <div className="relative">
          <Image
            src={fileUrl}
            alt="bill"
            width={300}
            height={300}
            className="mx-auto sm:mx-0 border my-2"
          />
          <CloseButton onClick={() => setFileUrl("")} />
        </div>
      )}
      {loading && (
        <div className="w-1/2 items-center flex h-[80px] gap-3 text-[12px]">
          <MiniSpinner /> Upload slike u toku ...
        </div>
      )}

      <div className="w-full">
        {error && (
          <p className="text-red-500 bg-red-50 p-2 text-[12px]">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddInvoiceImage;
