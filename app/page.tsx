import { authSecurityPatch } from "@/lib/authSecurityPatch";

export default async function Home() {
  const currentUser = await authSecurityPatch();

  return (
    <>
      <h2>
        <span className="font-normal">Dobrodošli</span> {currentUser.firstname}{" "}
        {currentUser.lastname}
      </h2>
      <div className="flex justify-between">
        <div>Broj racuna</div>
        <div>Broj artikala</div>
        <div>Ukupna cena</div>
      </div>
    </>
  );
}
