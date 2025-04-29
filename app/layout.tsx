"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { metadata } from "./metadata"; // Import metadata
import "./configureAmplify"; // Import Amplify configuration

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Authenticator>{children}</Authenticator>
      </body>
    </html>
  );
}
