import React from "react";

const ConfirmInfoPage = () => {
  return (
    <div>
      <h2>Vaš nalog je kreiran.</h2>
      <div className="bg-white p-3 border border-gray-200 text-[15px]">
        <p>
          Da biste aktivirali svoj nalog, potrebno je da izvršite verifikaciju
          klikom na link koji je poslat na vasu e-mail adresu.
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
