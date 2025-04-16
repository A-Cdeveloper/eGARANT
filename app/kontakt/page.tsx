// app/kontakt/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | eGarant",
  description: "Kontaktirajte nas u vezi sa eGarant aplikacijom.",
  openGraph: {
    title: "Kontakt | eGarant",
    description: "Kontaktirajte nas putem emaila za podršku i informacije.",
    url: "https://e-garant.vercel.app/kontakt",
    siteName: "eGarant",
  },
};

const KontaktPage = () => {
  return (
    <div className="space-y-4">
      <h2>eGarant</h2>
      <div>
        <h3 className="mb-0">Kontakt</h3>
        <p>kontakt@ecoglasnik.org</p>
      </div>
      <div>
        <h3 className="mb-0">Pitanja</h3>
        <p>support@ecoglasnik.org</p>
      </div>
      <div>
        <h3 className="mb-0">E-SEO TEAM</h3>
        <p>
          PIB: 107319556 <br />
          Matični broj: 62659459 <br />
          16210 Vlasotince, Srbija
        </p>
      </div>
    </div>
  );
};

export default KontaktPage;
