import React from "react";
import NavLink from "./NavLink";

const MetaNavigation = () => {
  return (
    <ul className="flex gap-5 order-1 sm:order-2 mb-2 sm:mb-0">
      <NavLink href="/impressum">IMPRESSUM</NavLink>
      <NavLink href="/kontakt">KONTAKT</NavLink>
    </ul>
  );
};

export default MetaNavigation;
