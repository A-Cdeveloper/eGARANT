import Image from "next/image";

import errorImg from "@/public/not-found.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[40vh] flex justify-center items-center text-center">
      <div>
        <Image
          src={errorImg}
          alt="404"
          width={95}
          height={100}
          className="mx-auto"
        />
        <h2 className="my-5 text-[20px]">Stranica nije pronađena!</h2>

        <Button size="lg" variant="primary">
          <Link href="/">Povratak na početnu</Link>
        </Button>
      </div>
    </div>
  );
}
