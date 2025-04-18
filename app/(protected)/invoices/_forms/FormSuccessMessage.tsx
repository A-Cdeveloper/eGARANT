"use client";
import { useEffect, useState } from "react";

const FormSuccessMessage = ({
  children,
  time = 3000,
}: {
  children: React.ReactNode;
  time?: number;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

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
