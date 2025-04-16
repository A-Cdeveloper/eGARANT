import { authSecurityPatch } from "@/lib/authSecurityPatch";

export default async function Home() {
  await authSecurityPatch();

  return <div>Dashboard</div>;
}
