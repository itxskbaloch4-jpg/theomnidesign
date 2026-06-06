import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Digital Marketing Agency Montreal | Web Design & SEO Company",
  description:
    "Omnivision Design is a Montreal digital marketing company providing web design, SEO, SEM and social media marketing services. (514) 655-6276",
  keywords:
    "digital marketing Montreal, web design Montreal, SEO Montreal, SEM Montreal, social media marketing Montreal, Omnivision Design",
  authors: [{ name: "Andreas Deligeorge" }],
  openGraph: {
    title: "Digital Marketing Agency Montreal | Web Design & SEO Company",
    description:
      "Omnivision Design is a Montreal digital marketing company providing web design, SEO, SEM and social media marketing services.",
    url: "https://www.omnivisiondesign.com/",
    siteName: "OmnivisionDesign.com",
    images: [
      {
        url: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/omnivision-site.jpg",
        width: 1930,
        height: 902,
        type: "image/jpeg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@OmnivisionTweet",
    title: "Digital Marketing Agency Montreal | Web Design & SEO Company",
    description:
      "Omnivision Design is a Montreal digital marketing company providing web design, SEO, SEM and social media marketing services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.omnivisiondesign.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="https://www.omnivisiondesign.com/wp-content/uploads/2018/04/favicon.png" />
      </head>
      <body className="bg-[#ffc94b] text-[#00555a] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
