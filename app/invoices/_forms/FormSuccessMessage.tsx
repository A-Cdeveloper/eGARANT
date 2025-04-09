"use client";
import { useEffect, useState } from "react";

const FormSuccessMessage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <>
      {visible && (
        <div className="bg-green-500 text-white text-[13px] p-2 mb-2">
          Prodajno mesto uspešno dodato na listu.
        </div>
      )}
    </>
  );
};

export default FormSuccessMessage;
