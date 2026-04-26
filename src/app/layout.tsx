import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
