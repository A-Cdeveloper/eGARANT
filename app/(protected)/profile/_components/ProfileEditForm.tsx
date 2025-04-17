"use client";
import { UserResponseTypeProfile } from "@/actions/profile";
import { Input } from "@/components/ui/input";

const ProfileEditForm = ({ user }: { user: UserResponseTypeProfile }) => {
  // console.log(user);
  return (
    <>
      <h2>Izmeni podatke:</h2>
      <form onSubmit={() => console.log("submit")}>
        <Input placeholder="Ime" defaultValue={user.firstname} />
        <Input placeholder="Prezime" defaultValue={user.lastname} />
        <Input placeholder="Email" defaultValue={user.email} readOnly />
      </form>
    </>
  );
};

export default ProfileEditForm;
