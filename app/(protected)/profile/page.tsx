import { UserResponseTypeProfile, getProdileData } from "@/actions/profile";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import { Metadata } from "next";
import ProfileEditForm from "./_components/ProfileEditForm";
import { formatDate } from "@/lib/utils";

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
  const { data: user } = await getProdileData(currentUser.uid as string);

  return (
    <div className="text-[15px]">
      <h2>
        <span className="font-normal">Profil korisnika:</span> {user?.firstname}{" "}
        {user?.lastname}
      </h2>
      <div className="flex flex-col gap-1 my-6">
        <div>Kreiran: {formatDate(user?.createdAt as Date)}</div>{" "}
        <div>Poslednja promena: {formatDate(user?.updatedAt as Date)}</div>
      </div>
      <ProfileEditForm user={user as UserResponseTypeProfile} />
    </div>
  );
};

export default ProfilPage;
