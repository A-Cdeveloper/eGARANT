import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";
import { Metadata } from "next";
// import { getUserFromCookies } from "@/actions/auth";
// import { Button } from "@/components/ui/button";

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

const RegisterPage = async () => {
  // const { data: user } = await getUserFromCookies();

  // if (user) {
  //   return (
  //     <>
  //       <h2 className="text-center">Vec ste prijavljeni.</h2>
  //       <Button variant="secondary_full" className="self-center my-8">
  //         <Link href="/">Povratak na početnu</Link>
  //       </Button>
  //     </>
  //   );
  // }

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
