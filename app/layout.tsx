import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "W.S. Fong Family Fund",
  description:
    "The W.S. Fong Family Fund brings our family together to make a meaningful impact by donating to causes we care about.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#F5F5F0] text-[#2D3E2F]">
        {children}
      </body>
    </html>
  );
}