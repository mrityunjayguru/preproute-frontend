"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReduxProvider from "@/store/ReduxProvider";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/userLayout";
import localFont from "next/font/local";
import { Poppins, DM_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast'
const artegra = localFont({
  src: "../assets/fonts/artegra-soft-regular.woff",
  variable: "--font-artegra",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
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

      <body className={`${artegra.variable} ${poppins.variable} ${dmSans.variable}`}>
      <ReduxProvider>
  <LayoutComponent>
    {children}

    {/* ✅ Toast must be inside layout tree */}
   <Toaster />
  </LayoutComponent>
</ReduxProvider>
      </body>
    </html>
  );
}
