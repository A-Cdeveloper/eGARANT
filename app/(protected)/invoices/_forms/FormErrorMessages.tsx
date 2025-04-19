import React from "react";

type FormErrorMessagesProps = {
  errors: string | string[];
};

const FormErrorMessages = ({ errors }: FormErrorMessagesProps) => {
  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <div className="bg-red-400 text-white text-[12px] p-2 mb-2">
      {errorList.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default FormErrorMessages;
