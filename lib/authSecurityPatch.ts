// Critical Security Vulnerability 2015 // https://nextjs.org/blog/cve-2025-29927

import { getUserFromCookies } from "@/actions/auth";

import { redirect } from "next/navigation";

export async function authSecurityPatch() {
  const { data: user } = await getUserFromCookies();

  if (!user) {
    redirect("/login");
  }

  return user;
}
