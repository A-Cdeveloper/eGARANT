import { UserResponseTypeProfile, getProfileData } from "@/actions/profile";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { Metadata } from "next";
import ProfileEditForm from "./_components/ProfileEditForm";
import { formatDate } from "@/lib/utils";
import PasswordEditForm from "./_components/PasswordEditForm";
import DeleteProfile from "./_components/DeleteProfile";

export const metadata: Metadata = {
  title: "eGarant | Profil",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const ProfilPage = async () => {
  const currentUser = await authSecurityPatch();
  const { data: user } = await getProfileData(currentUser.uid as string);

  return (
    <div className="text-[15px]">
      <h2>
        <span className="font-normal">Profil korisnika:</span> {user?.firstname}{" "}
        {user?.lastname}
      </h2>
      <div className="flex flex-col gap-1 my-6 bg-white p-3 border border-gray-200">
        <div>Kreiran: {formatDate(user?.createdAt as Date)}</div>{" "}
        <div>Poslednja promena: {formatDate(user?.updatedAt as Date)}</div>
      </div>
      <div className="flex flex-wrap justify-between gap-8">
        <ProfileEditForm user={user as UserResponseTypeProfile} />
        <PasswordEditForm userId={user?.uid as string} />
        <DeleteProfile />
      </div>
    </div>
  );
};

export default ProfilPage;
