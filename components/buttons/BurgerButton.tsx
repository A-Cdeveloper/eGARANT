"use client";
import Image from "next/image";

import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import DropdownMenuBox from "../layout/header/DropdownMenuBox";

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refEl } = useOutsideClick(() => setIsOpen(false));
  return (
    <div className="flex gap-2 items-center">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Image
          src={isOpen ? "/close.svg" : "/burger.svg"}
          alt="burger open"
          width={55}
          height={35}
        />
      </div>
      <DropdownMenuBox
        isOpen={isOpen}
        refEl={refEl as React.RefObject<HTMLDivElement>}
      />
    </div>
  );
};

export default BurgerButton;
