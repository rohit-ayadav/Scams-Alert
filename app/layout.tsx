import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Toaster as T } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/context/ThemeContext";
import SessionWrapper from "@/app/_component/sessionWrapper";
import Footer from "./(legel-and-footer)/footer/page";
import { Navbar } from "./_component/navbar/navbarComponent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
export async function generateMetadata({
  title = "ScamAlert - Share & Discover Scam Reports",
  description = "Report scams, frauds, and online cheating cases. 🚨 ScamAlert helps people share their experiences, raise awareness, and stay safe from fraud.",
  slug = "",
  imageUrl = "https://scams-alert.vercel.app/default-thumbnail.png",
  canonicalUrl = "https://scams-alert.vercel.app",
}: {
  title?: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}): Promise<Metadata> {
  const fullUrl = `${canonicalUrl}/reports/${slug}`;

  return {
    title,
    keywords:
      "scam report, online fraud, scam alert, fraud awareness, phishing, cyber crime, fraud report, report scam, fake jobs, investment scams, online safety, cheating report, fraud prevention, community reports, scam victims, online fraud safety",
    description,
    manifest: "/manifest.json?v=1.0.6",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black",
      title: "ScamAlert",
    },
    applicationName: "ScamAlert",
    formatDetection: {
      telephone: false,
    },
    metadataBase: new URL(canonicalUrl),
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "ScamAlert",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@rohit.ayadav",
      creator: "@rohit.ayadav",
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "scam-report",
    other: {
      "apple-mobile-web-app-capable": "yes",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#000000",
      "msapplication-TileImage": "/icons/android-chrome-192x192.png",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Toaster position="top-right" reverseOrder={false} />
        <T />
        <ThemeProvider>
          <SessionWrapper>
            <Navbar />
            <main className="flex-grow min-h-[calc(100vh-100px)]">
              <GoogleAnalytics />
              {children}
            </main>
            <Footer />
          </SessionWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}