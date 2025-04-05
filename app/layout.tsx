import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "eGarant",
  description:
    "Aplikacija za digitalno skladištenje garancija kupljenih proizvoda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rs">
      <body className={`${roboto.className} antialiased`}>
        <Header />

        <main className="flex-1 p-5 pt-[120px] w-full max-w-lg mx-auto flex flex-col justify-start">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
