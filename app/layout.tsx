import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import InternetStatus from "@/components/layout/InternetStatus";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title:
    "eGarant | Aplikacija za digitalno skladištenje garancija kupljenih proizvoda.",
  description: "Digitalno skladištenje garancija za kupljene proizvode.",
  applicationName: "eGarant",
  keywords: [
    "garancije",
    "digitalno skladištenje",
    "računi",
    "proizvodi",
    "eGarant",
  ],
  authors: [{ name: "E-SEO TEAM", url: "https://www.e-seo.info" }],
  creator: "E-SEO TEAM",
  metadataBase: new URL("https://e-garant.vercel.app"), // Replace with your domain
  openGraph: {
    title: "eGarant",
    description: "Digitalno skladištenje garancija za kupljene proizvode.",
    url: "https://e-garant.vercel.app",
    siteName: "eGarant",
    locale: "sr_RS",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#2b2d42", // your primary brand color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rs">
      <InternetStatus />
      <body className={`${roboto.className} antialiased`}>
        <AuthProvider>
          <Header />
          <main className="flex-1 p-5 pt-[120px] w-full max-w-lg mx-auto flex flex-col justify-start">
            {children}
          </main>

          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
