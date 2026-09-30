import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Structural Engineering for Architecture`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "structural engineering firm Boston",
    "structural engineers Boston MA",
    "structural engineering for architects",
    "adaptive reuse structural engineer Boston",
    "historic renovation structural engineering",
    "structural peer review Boston",
    "civic and institutional structural engineering",
    "RSE Associates",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Structural Engineering for Architecture`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: "+16179269300",
    email: "admin@rseassociates.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "63 Pleasant Street",
        addressLocality: "Watertown",
        addressRegion: "MA",
        postalCode: "02472",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "771 E 14th Street",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90021",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "18 Second Avenue",
        addressLocality: "Port Washington",
        addressRegion: "NY",
        postalCode: "11050",
        addressCountry: "US",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Boston" },
      { "@type": "City", name: "New York" },
      { "@type": "City", name: "Los Angeles" },
    ],
    knowsAbout: [
      "Structural Engineering",
      "Adaptive Reuse",
      "Historic Renovation",
      "Structural Peer Review",
      "Mass Timber Construction",
      "Civic and Institutional Architecture",
    ],
    sameAs: ["https://www.linkedin.com/company/rse-associates"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
