import React from "react";
import NavLink from "./NavLink";

const MainMenu = () => {
  return (
    <ul className="flex flex-col">
      <NavLink href="/">Početna</NavLink>
      <NavLink href="/bills">Moji računi</NavLink>
      <NavLink href="/profile">Moj nalog</NavLink>
      <NavLink href="/logout">Odjava</NavLink>
    </ul>
  );
};

export default MainMenu;
