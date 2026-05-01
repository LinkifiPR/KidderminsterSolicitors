import type { Metadata } from "next";
import "./globals.css";
import { baseUrl } from "../lib/site";
import { CookieConsentMount } from "../components/CookieConsentMount";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kidderminster Solicitors | Independent Local Guide",
    template: "%s | Kidderminster Solicitors",
  },
  description:
    "An independent local guide to finding trusted solicitors in Kidderminster and requesting no obligation quotes from solicitor partners.",
  openGraph: {
    type: "website",
    siteName: "Kidderminster Solicitors",
    url: baseUrl,
    title: "Kidderminster Solicitors",
    description:
      "Compare local legal services and request a no obligation quote from a trusted solicitor partner.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        {children}
        <CookieConsentMount />
      </body>
    </html>
  );
}
