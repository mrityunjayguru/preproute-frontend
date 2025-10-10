"use client";
import { ReactNode } from "react";
import { DashboardHeader } from "../dashboard/component/Navbar/Navbar";
import { Footer as UserFooter } from "@/Layout/Footer";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      <UserFooter />
    </div>
  );
}
