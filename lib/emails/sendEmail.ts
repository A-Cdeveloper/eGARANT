import nodemailer from "nodemailer";
import { emailHtml } from "./";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server host
  port: 465, // SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: true, // Set to true for SSL (port 465), false for TLS (port 587)
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // Password or app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Useful for self-signed certificates
  },
});

export const sendEmail = async (
  email: string,
  subject: string,
  message: string,
  buttonText: string,
  url: string,
  mode: string
) => {
  await transporter.sendMail({
    from: `eGarant <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: emailHtml(url, message, buttonText, mode),
  });
};

/// FRONTEND APP

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm?verificationToken=${verificationToken}`;
  await sendEmail(
    email,
    "eGarant - Aktivacija naloga",
    "Potvrdite svoju adresu e-pošte klikom na dugme ispod:",
    "Aktivirajte nalog",
    verificationUrl,
    "verification"
  );
};

export const sendPasswordResetEmail = async (
  email: string,
  generatedPasword: string
) => {
  const loginUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`;
  await sendEmail(
    email,
    "eGarant - Nova privremena lozinke",
    `Vaša privremena lozinka je: ${generatedPasword}`,
    "Prijavite se",
    loginUrl,
    "resetPassword"
  );
};
