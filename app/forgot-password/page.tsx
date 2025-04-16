import { Metadata } from "next";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

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
const ForgotPasswordPage = () => {
  return (
    <div className="text-center">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
