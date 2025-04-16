// app/auth-provider.tsx (client component)
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser();
  }, [setUser]);

  return <>{children}</>;
}
