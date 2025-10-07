"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReduxProvider from "@/store/ReduxProvider";

// User Layout Components
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";

// Admin Layout Components
import { DashboardHeader } from "./dashboard/component/Navbar/Navbar";
// import { AdminFooter } from "./dashboard/component/Footer/Footer"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState<"user" | "admin" | null>("admin");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userRole = localStorage.getItem("role"); // "admin" | "user"

  //   if (!token) {
  //     router.push("/Auth/register");
  //   } else {
  //     setRole(userRole === "admin" ? "admin" : "user");
  //   }
  // }, [router]);

  if (role === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          {/* HEADER */}
          {role === "adminkkkk" && isDashboard ? <DashboardHeader /> : <UserHeader />}

          {/* MAIN CONTENT */}
          <main className="flex-1 bg-[#fff]">{children}</main>

          {/* FOOTER */}
          {role === "admin" && isDashboard ? <UserFooter /> : <UserFooter />}
        </ReduxProvider>
      </body>
    </html>
  );
}
