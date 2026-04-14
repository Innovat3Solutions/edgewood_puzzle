import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import PuzzlePreviewProvider from "@/components/preview/PuzzlePreviewProvider";
import Footer from "@/components/nav/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Edgewood Puzzles | Piece Together the Universe",
  description: "Premium American-Made Jigsaw Puzzles from NASA's Most Powerful Telescopes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} antialiased`}>
      <body className="bg-navy text-white min-h-screen font-dm flex flex-col">
        <PuzzlePreviewProvider>
          {children}
          <Footer />
        </PuzzlePreviewProvider>
      </body>
    </html>
  );
}
