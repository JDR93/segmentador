import type { Metadata } from "next";
import "./globals.css";
//  import 'animate.css';
import { Source_Sans_3 } from "next/font/google";
import { FilterProvider } from "@/providers/FilterProvider";
import QueryProvider from "@/providers/QueryProvider";
import { LoginProvider } from "@/contexts/loginContext";

export const metadata: Metadata = {
  title: "Segmentador de Unidades",
  description: "Generated by create next app",
};

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.className} antialiased`}>
      <LoginProvider>
        <QueryProvider>
            <FilterProvider>{children}</FilterProvider>
        </QueryProvider>
        </LoginProvider>
      </body>
    </html>
  );
}

