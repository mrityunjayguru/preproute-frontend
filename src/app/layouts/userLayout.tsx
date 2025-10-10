"use client";
import { ReactNode } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-1">{children}</main>
      <UserFooter />
    </div>
  );
}
