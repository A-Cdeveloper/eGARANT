import { getUserFromCookies } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";

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

const LoginPage = async () => {
  const { data: user } = await getUserFromCookies();

  if (user) {
    return (
      <>
        <h2 className="text-center">Vec ste prijavljeni.</h2>
        <Button variant="secondary_full" className="self-center my-8">
          <Link href="/">Povratak na početnu</Link>
        </Button>
      </>
    );
  }
  return (
    <div className="text-center">
      <LoginForm />
      <div className="text-primary text-[13px] my-4 block">
        <p>
          <Link
            href="/forgot-password"
            className="underline underline-offset-3 hover:text-secondary mb-3 block"
          >
            Zaboravljena lozinka?
          </Link>
        </p>
        <p>
          Ukoliko nemate nalog registrujte se{" "}
          <Link
            href="/register"
            className="underline underline-offset-3 hover:text-secondary"
          >
            OVDE
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
