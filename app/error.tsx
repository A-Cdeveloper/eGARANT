"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import errorImg from "@/public/error.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  title = "Došlo je do greske.",
}: {
  error: Error & { digest?: string };
  title?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.message);
  }, [error]);

  return (
    <div className="w-full h-[40vh] flex flex-col justify-center items-center text-center bg-white">
      <Image
        src={errorImg}
        alt="errorImg"
        width={95}
        height={80}
        className="mx-auto"
      />
      <h2 className="text-[20px] my-5">{title}</h2>

      <Button size="lg" variant="primary" onClick={() => router.push("/")}>
        Pokušaj ponovo
      </Button>
    </div>
  );
}
