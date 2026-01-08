import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codepad - Coding Tutorial App",
  description: "Learn to code through repetition and muscle memory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
