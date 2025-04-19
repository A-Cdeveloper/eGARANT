"use client";
import { loginUser } from "@/actions/auth";
import FormErrorMessages from "@/app/(protected)/invoices/_forms/FormErrorMessages";

import SubmitButton from "@/components/buttons/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const LoginForm = () => {
  const [state, action] = useActionState(loginUser, {
    data: null,
    error: null,
  });
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const loginFunction = async () => {
      if (state.error === null && state.data) {
        await setUser();
      }
      router.push("/");
    };
    loginFunction();
  }, [router, setUser, state.data, state.error]);

  return (
    <Card className="max-w-[375px] sm:w-[300px] mx-auto  bg-white rounded-none border border-gray-200 gap-3">
      <CardHeader>
        <CardTitle className="uppercase text-xl">Prijava</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent className="space-y-4">
          {state.error && (
            <>
              <FormErrorMessages errors={state.error as string[]} />
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Unesite email"
              defaultValue={state.data?.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Lozinka</Label>
            <div className="relative">
              <Input
                type={isVisiblePass ? "text" : "password"}
                placeholder="Unesite lozinku"
                name="password"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsVisiblePass(!isVisiblePass)}
              >
                {isVisiblePass ? <Eye width={16} /> : <EyeOff width={16} />}
              </div>
            </div>
          </div>

          <SubmitButton className="w-full mt-3">Uloguj se</SubmitButton>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginForm;
