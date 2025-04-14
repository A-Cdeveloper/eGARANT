"use client";
import { loginUser } from "@/actions/auth";
import FormErrorMessages from "@/app/invoices/_forms/FormErrorMessages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const LoginForm = () => {
  const [state, action] = useActionState(loginUser, {
    data: null,
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.data) {
      router.push("/invoices/");
    }
  }, [router, state.data, state.error]);

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
            <Input
              name="password"
              type="password"
              placeholder="Unesite lozinku"
            />
          </div>

          <Button className="w-full">Prijavi se</Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginForm;
