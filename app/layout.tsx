"use client";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { metadata } from "./metadata"; // Import metadata

Amplify.configure(outputs);

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
        {children}
      </body>
    </html>
  );
}
