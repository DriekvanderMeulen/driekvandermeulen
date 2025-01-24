import type { Metadata } from "next";
import "./globals.css";
import DarkModeToggle from "@/components/functions/dark-mode";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}