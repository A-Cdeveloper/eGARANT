import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";
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

const RegisterPage = () => {
  return (
    <div className="text-center">
      <RegisterForm />
      <div className="text-primary text-[13px] my-4 block">
        Ukoliko imate nalog ulogujte se{" "}
        <Link
          href="/login"
          className="underline underline-offset-3 hover:text-secondary"
        >
          OVDE
        </Link>
        .
      </div>
    </div>
  );
};

export default RegisterPage;
