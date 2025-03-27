import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";
import { Inter, Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TanStack Store",
  description:
    "Discover our modern eCommerce platform powered by TanStack Query. Shop the latest products with real-time updates and a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-p-(--header-height) scroll-smooth transition-discrete ${nunito.className}`}
    >
      <body
        className={`antialiased ${nunito.className}`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
