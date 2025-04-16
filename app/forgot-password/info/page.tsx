import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eGarant",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const ForgotPasswordInfoPage = () => {
  return (
    <div className="bg-white p-8 border border-gray-200 text-[15px] text-center">
      <h2 className="text-center">Promena lozinke je uspešna.</h2>
      <div>
        <p>
          Nova privremena lozinka je poslata na vasu e-mail adresu. Nakon
          logovanja sa tom lozinkom, možete promeniti lozinku u sekciji
          &apos;Moj nalog&apos;.
        </p>
        <p className="mt-4 text-[14px] underline underline-offset-2">
          Ukoliko niste dobili email sa linkom, molimo vas da proverite spam
          folder.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordInfoPage;
