"use client";
import { forgotPassword } from "@/actions/auth";
import FormErrorMessages from "@/app/(protected)/invoices/_forms/FormErrorMessages";

import SubmitButton from "@/components/buttons/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const ForgotPassowrdForm = () => {
  const [state, action] = useActionState(forgotPassword, {
    data: null,
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.data) {
      router.push("/forgot-password/info");
    }
  }, [router, state.data, state.error]);

  return (
    <Card className="max-w-[375px] sm:w-[300px] mx-auto  bg-white rounded-none border border-gray-200 gap-3">
      <CardHeader>
        <CardTitle className="uppercase text-xl">
          Zaboravljena lozinka
        </CardTitle>
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
              placeholder="Unesite vaš email"
              defaultValue={state.data?.email}
            />
          </div>

          <SubmitButton className="w-full mt-3">Promeni lozinku</SubmitButton>
        </CardContent>
      </form>
    </Card>
  );
};

export default ForgotPassowrdForm;
