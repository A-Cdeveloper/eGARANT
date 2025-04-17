import { getAllUserInvoices } from "@/actions/invoices";
import { authSecurityPatch } from "@/lib/authSecurityPatch";
import InfoBox from "./(homepage)/_components/InfoBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const currentUser = await authSecurityPatch();

  const { count, totalProductCount, totalPrice } = await getAllUserInvoices(
    currentUser.uid
  );

  return (
    <>
      <h2>
        <span className="font-normal">Dobrodošli</span> {currentUser.firstname}{" "}
        {currentUser.lastname},
      </h2>
      <div className="flex flex-wrap justify-center md:justify-between my-12 gap-3">
        <InfoBox caption="Broj računa" value={count} style="secondary" />
        <InfoBox caption="Broj artikala" value={totalProductCount} />
        <InfoBox
          caption="Ukupno RSD"
          value={totalPrice}
          captionFontSize="text-[35px]"
          style="gray-400"
        />
      </div>
      <div className="flex justify-center">
        <Button
          variant="secondary_full"
          size={"lg"}
          className="text-[25px] p-6"
        >
          <Link href="/invoices/add-new">Dodaj novi račun</Link>
        </Button>
      </div>
    </>
  );
}
