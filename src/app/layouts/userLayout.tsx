"use client";

import { ReactNode } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check if current route is the exam page
  const isExamPage = pathname === "/Exam/userExam" ;

  return (
    <div className="flex flex-col min-h-screen">
      {!isExamPage && <UserHeader />}
      <main className="flex-1">{children}</main>
      {!isExamPage && <UserFooter />}
    </div>
  );
}