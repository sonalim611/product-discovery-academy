import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Discovery Academy",
  description: "Learn Product Discovery frameworks through interactive lessons and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressProvider>
          <MainLayout>{children}</MainLayout>
        </ProgressProvider>
      </body>
    </html>
  );
}
