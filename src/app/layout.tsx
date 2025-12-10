"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReduxProvider from "@/store/ReduxProvider";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/userLayout";
import localFont from "next/font/local";

const artegra = localFont({
  src: "../assets/fonts/artegra-soft-regular.woff",
  variable: "--font-artegra",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role] = useState<"user" | "admin" | null>("admin");

  const isDashboard = pathname.startsWith("/dashboard");
  const LayoutComponent = isDashboard ? AdminLayout : UserLayout;

  return (
    <html lang="en">
      <head>
        {/* ✅ Load Font Awesome CDN Here */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>

      <body className={`${artegra.className}`}>
        <ReduxProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </ReduxProvider>
      </body>
    </html>
  );
}
