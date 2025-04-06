import { Button } from "@/components/ui/button";
import React from "react";

import Link from "next/link";
import BurgerButton from "@/components/buttons/BurgerButton";

const UserArea = () => {
  return (
    <div className="flex items-center">
      {/* <Button variant="secondary">Login</Button> */}

      <Link href="/invoices/add-new">
        <Button variant="secondary">Dodaj račun</Button>
      </Link>
      <BurgerButton />
    </div>
  );
};

export default UserArea;
