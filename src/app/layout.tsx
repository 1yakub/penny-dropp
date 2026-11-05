import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Doto, Familjen_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const UMAMI_HOST = "https://analytics.yakubhossain.dev";
const UMAMI_WEBSITE_ID = "da844699-8b7f-4843-b575-c2907fdf58c1";

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
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <Script
          src={`${UMAMI_HOST}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains="pennydropp.vercel.app"
          data-performance="true"
        />
        <Script src={`${UMAMI_HOST}/recorder.js`} data-website-id={UMAMI_WEBSITE_ID} />
      </body>
    </html>
  );
}
