"use client";
import React from "react";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/actions/auth";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

const MainMenu = () => {
  const removeUser = useAuthStore((state) => state.removeUser);
  const router = useRouter();
  return (
    <ul className="flex flex-col">
      <NavLink href="/">Početna</NavLink>
      <NavLink href="/invoices">Moji računi</NavLink>
      <NavLink href="/profile">Moj nalog</NavLink>
      <Button
        size={"sm"}
        className="cursor-pointer self-end mt-3"
        onClick={async () => {
          await logoutUser();
          removeUser();
          router.push("/login");
        }}
      >
        Odjava
      </Button>
    </ul>
  );
};

export default MainMenu;
