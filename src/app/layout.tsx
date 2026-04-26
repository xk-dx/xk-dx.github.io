import type { Metadata } from "next";
import Script from "next/script";
import ThemeProvider from "./ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "xkdx",
  description: "portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Script src="/lib/live2d/autoload.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

