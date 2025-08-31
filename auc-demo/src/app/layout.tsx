import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | AucDemo",
    default: "AucDemo — Used Car Auctions",
  },
  description: "Browse demo listings for used-car auctions. Filter by year, price, venue, and more.",
  openGraph: {
    type: "website",
    siteName: "AucDemo",
    title: "AucDemo — Used Car Auctions",
    description: "Browse demo listings for used-car auctions. Filter by year, price, venue, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AucDemo — Used Car Auctions",
    description: "Browse demo listings for used-car auctions. Filter by year, price, venue, and more.",
  },
};

export const viewport = {
  themeColor: "#0EA5E9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
