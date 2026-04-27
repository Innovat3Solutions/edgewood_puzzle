import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PuzzlePreviewProvider from "@/components/preview/PuzzlePreviewProvider";
import CartProvider from "@/components/cart/CartProvider";
import Footer from "@/components/nav/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Edgewood Puzzles | Premium American-Made Jigsaw Puzzles",
  description: "Find your next favorite jigsaw puzzle. Wildlife, wood, and signature artist collections, printed and finished in the USA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-white text-[#0E1116] min-h-screen font-dm flex flex-col">
        <CartProvider>
          <PuzzlePreviewProvider>
            {children}
            <Footer />
          </PuzzlePreviewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
