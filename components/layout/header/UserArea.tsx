"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import BurgerButton from "@/components/buttons/BurgerButton";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

const UserArea = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const router = useRouter();

  return (
    <div className="flex items-center">
      {isAuth ? (
        <>
          <Link href="/invoices/add-new">
            <Button variant="secondary">Dodaj račun</Button>
          </Link>
          <BurgerButton />
        </>
      ) : (
        <Button
          variant="secondary"
          onClick={() => {
            router.push("/login");
          }}
        >
          Prijavi se
        </Button>
      )}
    </div>
  );
};

export default UserArea;
