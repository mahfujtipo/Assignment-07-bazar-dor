import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsMarqueeWrapper from "@/components/ProductsMarqueeWrapper";
import { ToastContainer } from "react-toastify";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রতিদিনের বাজারমূল্য এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Navbar>
          <ProductsMarqueeWrapper />
        </Navbar>

        <main className="flex-1">
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </main>

        <Footer />
      </body>
    </html>
  );
}
