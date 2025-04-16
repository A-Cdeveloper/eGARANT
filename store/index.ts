import { UserResponseTypeWithId, getUserFromCookies } from "@/actions/auth";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStoreType = {
  user: UserResponseTypeWithId | null;
  tokenExpiry: number | null;
  isAuth: boolean;
  setUser: () => Promise<void>;
  removeUser: () => void;
  //   setTokenExpiry: (tokenExpiry: number | null) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      tokenExpiry: null,
      isAuth: false,
      setUser: async () => {
        const { data: user, tokenExpiry } = await getUserFromCookies();
        set({ user, tokenExpiry, isAuth: !!user });
      },
      removeUser: () => set({ user: null, tokenExpiry: null, isAuth: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
