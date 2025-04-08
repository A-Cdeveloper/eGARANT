"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import React, { useCallback, useState } from "react";

const AddInvoiceImage = () => {
  const [fileUrl, setFileUrl] = useState<string>();

  console.log(fileUrl);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      //setIsLoadingUploadImage(true);
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      setFileUrl(selectedFile.name as string);
      // const { success, message } = await uploadPartnerImageAction(
      //   selectedFile as File
      // );

      // if (success) {
      //   setCurrentFileUrl(message![0] as string);
      //   setErrors([]);
      // } else {
      //   setErrors(message as string[]);
      // }
      // setIsLoadingUploadImage(false);
    },
    []
  );

  return (
    <div className="flex justify-between">
      <>
        <div className="w-1/2">
          <Input
            type="file"
            name="invoice_image"
            id="invoice_image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            defaultValue={fileUrl}
            required
          />

          <label
            htmlFor="invoice_image"
            className="block p-3 border border-dashed border-gray-400 text-[14px] my-2 cursor-pointer text-center"
          >
            Dodaj sliku
          </label>
        </div>
      </>

      <div>
        {fileUrl && (
          <Image
            src={`/${fileUrl}`}
            alt="bill"
            width={300}
            height={300}
            className="mx-auto sm:mx-0 border"
          />
        )}
      </div>
    </div>
  );
};

export default AddInvoiceImage;
