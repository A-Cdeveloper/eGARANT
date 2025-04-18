"use client";
import { registerUser } from "@/actions/auth";
import FormErrorMessages from "@/app/(protected)/invoices/_forms/FormErrorMessages";
import SubmitButton from "@/components/buttons/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

const RegisterForm = () => {
  const [state, action] = useActionState(registerUser, {
    data: null,
    error: null,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [passValid, setPassValid] = useState(true);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.data) {
      router.push("/confirm/info");
    }
  }, [router, state.data, state.error]);

  const checkPasswordHandler = () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setPassValid(false);
    } else {
      setPassValid(true);
    }
  };

  return (
    <Card className="max-w-[375px] sm:w-[300px] mx-auto  bg-white rounded-none border border-gray-200 gap-3">
      <CardHeader>
        <CardTitle className="uppercase text-xl">Kreiraj nalog</CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent className="space-y-4">
          {state.error && (
            <>
              <FormErrorMessages errors={state.error as string[]} />
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Ime*</Label>
            <Input
              name="firstname"
              type="text"
              placeholder="Unesite Ime"
              defaultValue={state.data?.firstname}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Prezime*</Label>
            <Input
              name="lastname"
              type="text"
              placeholder="Unesite prezime"
              defaultValue={state.data?.lastname}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              name="email"
              type="email"
              placeholder="Unesite email"
              defaultValue={state.data?.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Lozinka*</Label>
            <div className="relative">
              <Input
                type={isVisiblePass ? "text" : "password"}
                placeholder="Lozinka"
                name="password"
                ref={passwordRef}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsVisiblePass(!isVisiblePass)}
              >
                {isVisiblePass ? <Eye width={16} /> : <EyeOff width={16} />}
              </div>
            </div>
          </div>

          <div className="relative">
            <Input
              type={isVisibleConfirm ? "text" : "password"}
              placeholder="Lozinka ponovo"
              ref={confirmPasswordRef}
              onChange={checkPasswordHandler}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
            >
              {isVisibleConfirm ? <Eye width={16} /> : <EyeOff width={16} />}
            </div>
          </div>

          <SubmitButton
            className="w-full mt-3"
            disabled={!passValid || confirmPasswordRef.current?.value === ""}
          >
            Registruj nalog
          </SubmitButton>
        </CardContent>
      </form>
    </Card>
  );
};

export default RegisterForm;
