import Image from "next/image";
import React from "react";

const InvoiceImage = ({ iurl }: { iurl: string }) => {
  return (
    <div className="mx-auto sm:mx-0">
      <Image src={iurl} alt="bill" width={300} height={300} />
    </div>
  );
};

export default InvoiceImage;
