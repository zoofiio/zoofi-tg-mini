
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { PageLayout } from "./pagelayout";

export const metadata: Metadata = {
  title: 'Zoo Finance',
  description: 'A Structured Protocol for Better Liquidity Utilization',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js?56"></Script>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
      </head>
      <body
        className={`antialiased app-body`}
      >
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
