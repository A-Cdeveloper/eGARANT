import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";

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
