"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import errorImg from "@/public/not-found.svg";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div>
        <Image
          src={errorImg}
          alt="404"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h2 className="my-5 text-[26px]">Stranica nije pronađena!</h2>

        <Button size="lg" variant="primary" onClick={() => router.push("/")}>
          Povratak na početnu
        </Button>
      </div>
    </div>
  );
}
