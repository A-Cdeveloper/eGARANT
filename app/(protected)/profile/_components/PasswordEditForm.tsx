"use client";
import { logoutUser } from "@/actions/auth";
import { changePassword } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import FormErrorMessages from "../../invoices/_forms/FormErrorMessages";
import FormSuccessMessage from "../../invoices/_forms/FormSuccessMessage";

const PasswordEditForm = ({ userId }: { userId: string }) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [passValid, setPassValid] = useState(true);
  const removeUser = useAuthStore((state) => state.removeUser);
  const router = useRouter();
  const [state, action] = useActionState(changePassword, {
    error: null,
    success: false,
  });

  const checkPasswordHandler = () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setPassValid(false);
    } else {
      setPassValid(true);
    }
  };

  useEffect(() => {
    const logoutFunction = async () => {
      if (state.success) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await logoutUser();
        removeUser();
        router.push("/login");
      }
    };
    logoutFunction();
  }, [removeUser, router, state.success]);

  return (
    <div className="gap-2 flex-auto md:flex-1">
      <h2 className="text-xl">Postavi novu lozinku:</h2>
      {!state.success && state.error !== null && (
        <>
          <FormErrorMessages errors={state.error as string[]} />
        </>
      )}
      {state.success ? (
        <FormSuccessMessage>
          Vaša lozinka je uspešno promenjena.Prijavite se ponovo sa novom
          lozinkom.
        </FormSuccessMessage>
      ) : null}
      <form action={action} className="space-y-2">
        <Input type="hidden" name="uid" defaultValue={userId}></Input>
        <Input
          type="password"
          placeholder="Lozinka"
          name="password"
          ref={passwordRef}
        />
        <Input
          type="password"
          placeholder="Lozinka ponovo"
          ref={confirmPasswordRef}
          onChange={checkPasswordHandler}
        />
        {!passValid ? (
          <p className="text-red-500 text-[12px]">Lozinke se ne podudaraju</p>
        ) : null}
        <Button
          variant="secondary_full"
          className="ms-auto"
          disabled={!passValid || confirmPasswordRef.current?.value === ""}
        >
          Izmeni lozinku
        </Button>{" "}
      </form>
    </div>
  );
};

export default PasswordEditForm;
