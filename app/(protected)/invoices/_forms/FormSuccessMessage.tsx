"use client";
import { useEffect, useState } from "react";

const FormSuccessMessage = ({ children }: { children: React.ReactNode }) => {
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
          {children}
        </div>
      )}
    </>
  );
};

export default FormSuccessMessage;
