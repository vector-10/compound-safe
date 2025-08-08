import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import Loader from "@/components/Loader";
import { CursorEffects } from "@/components/CursorEffects";
import { GridBackground } from "@/components/GridBackground";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompoundSafe",
  description: "Lend With Confidence, Borrow with Protection, Stay Liquid!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Loader />
          <GridBackground />
          <CursorEffects />
          {children}
        </ThemeProvider>    
        </Providers>  
      </body>
    </html>
  );
}