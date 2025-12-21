"use client";

import { ReactNode } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide header on exam flows and Auth pages; footer always shown per request
  const isExamPage =
    pathname === "/Exam/userExam" || pathname === "/Exam/InstructionPaeg";
  const isAuthPage = pathname?.startsWith("/Auth");
  const hideChrome = isExamPage || isAuthPage;

  return (
    <div className="flex flex-col ">
      {!hideChrome && <UserHeader />}
      <main
        className={
          hideChrome
            ? "flex-1 overflow-hidden"
            : "flex-1 "
        }
      >
        {children}
      </main>
      {!hideChrome && <UserFooter />}
    </div>
  );
}