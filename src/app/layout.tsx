"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ReduxProvider from "@/store/ReduxProvider";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/userLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<"user" | "admin" | null>("admin");

  

  const isDashboard = pathname.startsWith("/dashboard");

  if (role === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const LayoutComponent =
     isDashboard ? AdminLayout : UserLayout;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </ReduxProvider>
      </body>
    </html>
  );
}
