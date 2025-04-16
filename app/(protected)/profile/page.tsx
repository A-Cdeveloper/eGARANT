import { authSecurityPatch } from "@/lib/authSecurityPatch";
import React from "react";

const ProfilPage = async () => {
  await authSecurityPatch();
  return <h1>ProfilPage</h1>;
};

export default ProfilPage;
