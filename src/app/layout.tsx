import { createClient } from "@/prismicio";
import { Metadata } from "next";
import { Cedarville_Cursive, Nunito_Sans } from 'next/font/google';
import "./globals.css";

const cedar = Cedarville_Cursive({
  subsets: ["latin"],
  display: "swap",
  variable: "--cedar",
  weight: "400",
})
const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--nunito",
})
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.title ?? "Site Title Missing",
    description: settings.data.description ?? "Site Description Missing",
    openGraph: {
      images: [
        {
          url: settings.data.og_image.url ?? "",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cedar.variable} ${nunito.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
