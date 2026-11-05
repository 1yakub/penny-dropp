import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Doto, Familjen_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
  display: "swap",
});

const led = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap",
});

const body = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pennydropp.vercel.app"),
  title: "Penny Dropp, imaginary artist",
  description: "The portfolio of a made up artist, sold from a vending machine.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Penny Dropp, imaginary artist",
    description: "The portfolio of a made up artist, sold from a vending machine.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2323ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${led.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
