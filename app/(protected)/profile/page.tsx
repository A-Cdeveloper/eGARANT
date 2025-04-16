import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eGarant | Profil",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const ProfilPage = async () => {
  await authSecurityPatch();
  return <h1>ProfilPage</h1>;
};

export default ProfilPage;
