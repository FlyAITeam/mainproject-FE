import "../styles/globals.css";
import { APP_INFO } from "@/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Layout } from "@/components";
import localFont from "next/font/local";

export const metadata = {
  title: {
    default: APP_INFO.title,
    template: APP_INFO.titleTemplate,
  },
  description: APP_INFO.description,
  keywords: APP_INFO.keywords,
  authors: APP_INFO.authors,
  creator: APP_INFO.authors[0].name,
  publisher: APP_INFO.authors[0].name,
  manifest: "/manifest.json",
  generator: APP_INFO.authors[0].name,
  applicationName: APP_INFO.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_INFO.title,
    // startUpImage: [],
  },
  category: "webapp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_INFO.name,
    title: {
      default: APP_INFO.title,
      template: APP_INFO.titleTemplate,
    },
    description: APP_INFO.description,
  },
  referrer: "origin-when-cross-origin",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/apple-touch-icon.png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32" },
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32" },
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: {
      rel: "mask-icon",
      url: "/icons/safari-pinned-tab.svg",
      color: "#FFFFFF",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#ffffff",
  userScalable: false,
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
