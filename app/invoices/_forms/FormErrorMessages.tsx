import React from "react";

const FormErrorMessages = ({ errors }: { errors: string[] }) => {
  return (
    <div className="bg-red-400 text-white text-[13px] p-2 mb-2">
      {errors.map((error) => {
        return <p key={error}>{error}</p>;
      })}
    </div>
  );
};

export default FormErrorMessages;
