"use client";
import { UserResponseTypeWithId } from "@/actions/auth";
import { editProfileData } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import FormErrorMessages from "../../invoices/_forms/FormErrorMessages";
import FormSuccessMessage from "../../invoices/_forms/FormSuccessMessage";

const ProfileEditForm = ({ user }: { user: UserResponseTypeWithId }) => {
  const [state, action] = useActionState(editProfileData, {
    data: user,
    error: null,
    success: false,
  });

  return (
    <div className="gap-2 flex-auto md:flex-1">
      <h2 className="text-xl">Izmeni podatke:</h2>
      {state.error !== null && state.data !== null && (
        <>
          <FormErrorMessages errors={state.error as string[]} />
        </>
      )}
      {state.success ? (
        <FormSuccessMessage>
          Korisnički podaci uspešno izmenjeni.
        </FormSuccessMessage>
      ) : null}

      <form action={action} className="space-y-2">
        <Input type="hidden" name="uid" defaultValue={state.data?.uid}></Input>
        <Input
          placeholder="Ime"
          name="firstname"
          defaultValue={state.data?.firstname}
        />
        <Input
          placeholder="Prezime"
          name="lastname"
          defaultValue={state.data?.lastname}
        />
        <Input placeholder="Email" name="email" defaultValue={user.email} />
        <Button variant="secondary_full" className="ms-auto">
          Izmeni podatke
        </Button>{" "}
      </form>
    </div>
  );
};

export default ProfileEditForm;
