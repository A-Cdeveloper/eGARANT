import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MainMenu from "./MainMenu";
const DropdownMenuBox = ({
  isOpen,
  refEl,
}: {
  isOpen: boolean;
  refEl: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className={`absolute right-0 top-[60px] mt-0 w-60 bg-white shadow-lg  p-4 z-[10000000000] transition-all duration-200 ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-100 pointer-events-none"
      }`}
    >
      <div
        className="flex gap-2 items-center border-b border-gray-200 pb-4"
        ref={refEl}
      >
        <Avatar>
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>{" "}
        <div className="text-[12px] leading-[14px]">
          <strong>Aleksandar Cvetkovic</strong>
          <br />
          aleksandar@e-seo.info
        </div>
      </div>
      <MainMenu />
    </div>
  );
};

export default DropdownMenuBox;
