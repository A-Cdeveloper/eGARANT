import Image from "next/image";
import empty from "@/public/empty.svg";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const NoInvoices = ({ filter }: { filter: string }) => {
  return (
    <div className="w-full h-[40vh] flex flex-col justify-center items-center text-center bg-white">
      <Image
        src={empty}
        alt="empty"
        width={95}
        height={80}
        className="mx-auto"
      />
      <h2 className="my-5 text-[20px]">
        {filter
          ? "Nema pronađenih računa po ovom kriterjumu."
          : "Nemate sačuvane račune."}
      </h2>
      {!filter && (
        <Button size="lg" variant="primary">
          <Link href="/invoices/add-new">Dodaj svoj prvi račun</Link>
        </Button>
      )}
    </div>
  );
};

export default NoInvoices;
