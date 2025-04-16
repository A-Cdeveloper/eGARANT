"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MainMenu from "./MainMenu";
import { useAuthStore } from "@/store";
import { createInitials } from "@/lib/utils";
const DropdownMenuBox = ({
  isOpen,
  refEl,
}: {
  isOpen: boolean;
  refEl: React.RefObject<HTMLDivElement>;
}) => {
  const { user } = useAuthStore();

  return (
    <div
      className={`absolute right-0 top-[60px] mt-0 w-60 bg-white shadow-lg  p-4 z-[100]! transition-all duration-200 ${
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
          <AvatarFallback>
            {user && createInitials(user?.firstname, user?.lastname)}
          </AvatarFallback>
        </Avatar>{" "}
        <div className="text-[12px] leading-[14px]">
          <strong>
            {user?.firstname} {user?.lastname}
          </strong>
          <br />
          {user?.email}
        </div>
      </div>
      <MainMenu />
    </div>
  );
};

export default DropdownMenuBox;
