import errorImg from "@/public/error.svg";
import Image from "next/image";
type ErrorMessageProps = {
  title?: string;
};

export const RestrictAccessMessage = ({
  title = "Nemate pravo pristupa ovom računu",
}: ErrorMessageProps) => {
  return (
    <>
      <div className="w-full h-[40vh] flex flex-col justify-center items-center text-center bg-white">
        <Image
          src={errorImg}
          alt="errorImg"
          width={95}
          height={80}
          className="mx-auto"
        />
        <h2 className="text-[20px] mt-4">{title}</h2>
      </div>
    </>
  );
};
