import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FlotanteWhatsApp from "@/components/layout/FlotanteWhatsApp";
import JsonLd from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { BUSINESS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#040507] text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HLCQMYWSQL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HLCQMYWSQL');
          `}
        </Script>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: BUSINESS.name,
            url: BUSINESS.url,
            description: SITE_DESCRIPTION,
            email: BUSINESS.email,
            telephone: BUSINESS.telephone,
            address: { "@type": "PostalAddress", ...BUSINESS.address },
            areaServed: "ES",
          }}
        />
        <Header showBlog={(await getAllPosts()).length > 0} />
        {children}
        <Footer />
        <FlotanteWhatsApp />
      </body>
    </html>
  );
}
