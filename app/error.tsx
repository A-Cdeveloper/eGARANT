"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import errorImg from "@/public/error.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.message);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div>
        <Image
          src={errorImg}
          alt="error"
          width={100}
          height={70}
          className="mx-auto"
        />
        <h2 className="my-5 text-[26px]">{error.message}</h2>
        <Button size="lg" variant="primary" onClick={() => router.push("/")}>
          Pokušaj ponovo
        </Button>
      </div>
    </div>
  );
}
