"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--primary)",
          "--normal-text": "white",
          "--normal-border": "var(--white)",
          "--width": "250px",
          "--padding": "10px 8px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
