"use client";
import Image from "next/image";
import empty from "@/public/empty.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NoInvoices = ({ filter }: { filter: string }) => {
  const router = useRouter();
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
        <Button
          size="lg"
          variant="primary"
          onClick={() => router.push("/invoices/add-new")}
        >
          Dodaj svoj prvi račun
        </Button>
      )}
    </div>
  );
};

export default NoInvoices;
