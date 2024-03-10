import type { Metadata } from "next";
import { Inter, The_Girl_Next_Door } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/AppContext";

import Layout from "@/components/ui/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Awesome Diary",
  description: "Track your life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-auto">
      <body className="bg-yellow-50">
        {/* <Layout> */}
        <AppProvider>{children}</AppProvider>
        {/* </Layout> */}
      </body>
    </html>
  );
}
