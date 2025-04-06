"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import errorImg from "@/public/error.svg";
type ErrorMessageProps = {
  error: unknown;
  title?: string;
};

export const ErrorMessage = ({
  error,
  title = "Došlo je do greske.",
}: ErrorMessageProps) => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-[40vh] flex flex-col justify-center items-center text-center bg-white">
        <Image
          src={errorImg}
          alt="errorImg"
          width={95}
          height={80}
          className="mx-auto"
        />
        <h2 className="text-[20px]">{title}</h2>
        <p className="my-2">
          {typeof error === "string" ? error : "Došlo je do greske."}
        </p>
        <Button size="lg" variant="primary" onClick={() => router.refresh()}>
          Pokušaj ponovo
        </Button>
      </div>
    </>
  );
};
