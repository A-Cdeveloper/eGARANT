import React from "react";

const ImpressumPage = () => {
  return (
    <div className="space-y-4">
      <h1>Impressum</h1>
      <p>
        <strong>eGarant</strong> je aplikacija koja omogućava korisnicima da
        digitalno čuvaju i upravljaju garancijama za kupljene proizvode.
        Aplikacija pruža siguran i organizovan način za praćenje trajanja
        garancija i čuvanje relevantnih informacija.
      </p>
      <h3 className="mb-0">Odricanje od odgovornosti</h3>
      <p>
        Sav sadržaj <strong>eGarant</strong> aplikacije služi isključivo u
        informativne svrhe. Iako se trudimo da informacije budu tačne i
        ažurirane, ne preuzimamo odgovornost za bilo kakve greške ili propuste.
        Korišćenje aplikacije je na sopstvenu odgovornost.
      </p>
      <h3 className="mb-0"> Autorska prava</h3>
      <p>
        Svi tekstovi, slike i ostali sadržaji na <strong>eGarant</strong>{" "}
        aplikaciji zaštićeni su autorskim pravima. Njihovo kopiranje,
        distribuiranje ili korišćenje u komercijalne svrhe bez dozvole vlasnika
        nije dozvoljeno.{" "}
      </p>
      <h3 className="mb-0">Zaštita podataka</h3>
      <p>
        Vaša privatnost nam je važna. Svi podaci koje unesete u aplikaciju{" "}
        <strong>eGarant</strong> čuvaju se u skladu sa važećim propisima o
        zaštiti podataka. Ne delimo vaše informacije sa trećim stranama bez vaše
        saglasnosti.
      </p>
      <h3 className="mb-0">Ažuriranje aplikacije</h3>
      <p>
        Zadržavamo pravo da u bilo kom trenutku ažuriramo ili izmenimo sadržaj
        aplikacije bez prethodnog obaveštenja. Preporučujemo korisnicima da
        redovno proveravaju ažuriranja kako bi imali najnoviju verziju
        aplikacije.
      </p>
    </div>
  );
};

export default ImpressumPage;
