"use client";
import { ReactNode } from "react";
import { DashboardHeader } from "../dashboard/component/Navbar/Navbar";
import { Footer as UserFooter } from "@/Layout/Footer";
import Footer from "./_component/footer";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col max-h-screen">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      
      <UserFooter />
    </div>
  );
}
