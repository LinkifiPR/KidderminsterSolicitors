import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kidderminster Solicitors | Coming Soon",
  description:
    "An independent information site for people looking for solicitors and no-obligation legal quotes in Kidderminster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
