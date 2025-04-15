import { userVerification } from "@/actions/auth";
import Link from "next/link";

const ConfirmPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { verificationToken } = await searchParams;
  const { title, message, status } = await userVerification(
    verificationToken as string
  );

  return (
    <div className="bg-white p-3 border border-gray-200 text-[15px] text-center">
      <h2 className="text-center">{title}</h2>
      {message && (
        <>
          <p>{message}</p>
          {status && (
            <Link
              href={"/login"}
              className="mt-4 text-[14px] underline underline-offset-2"
            >
              Prijavi se
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default ConfirmPage;
