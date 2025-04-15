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
  url: string,
  subject: string,
  message: string,
  buttonText: string
) => {
  await transporter.sendMail({
    from: `eGarant <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: emailHtml(url, message, buttonText),
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
    verificationUrl,
    "eGarant - Aktivacija naloga",
    "Potvrdite svoju adresu e-pošte klikom na dugme ispod:",
    "Aktivirajte nalog"
  );
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    resetUrl,
    "eGarant - Reset lozinke",
    "Klinikite na dugme ispod da biste resetovali svoju lozinku:",
    "Resetuj lozinku"
  );
};
