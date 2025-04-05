"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <li>
      <Link
        key={href}
        href={href}
        className={`${
          isActive ? "text-secondary" : "text-primary"
        } hover:text-secondary transition duration-300 ease-in-out uppercase text-[14px] font-regular border-b border-gray-200 block p-2`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
