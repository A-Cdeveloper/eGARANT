// Critical Security Vulnerability 2015 // https://nextjs.org/blog/cve-2025-29927

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authSecurityPatch() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("garantUser");

  if (!token) {
    redirect("/login");
  }

  return token;
}
