import React from "react";

const ConfirmInfoPage = () => {
  return (
    <div className="bg-white p-8 border border-gray-200 text-[15px] text-center">
      <h2 className="text-center">Vaš nalog je kreiran.</h2>
      <div>
        <p>
          Da biste aktivirali svoj nalog, potrebno je da izvršite verifikaciju
          klikom na link koji je poslat na vašu e-mail adresu.
        </p>
        <p className="mt-4 text-[14px] underline underline-offset-2">
          Ukoliko niste dobili email sa linkom, molimo vas da proverite spam
          folder.
        </p>
      </div>
    </div>
  );
};

export default ConfirmInfoPage;
