"use client";

import { ReactNode, useEffect } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const isExamPage =
    pathname === "/Exam/userExam" ||
    pathname === "/Exam/Instruction";

  const isProfilePage = pathname === "/Auth/Profile";

  // 🔥 HIDE NAVBAR & FOOTER CONDITIONS
  const hideNavbar =
    isExamPage ||
    isProfilePage ||
    (userLogin && userLogin.isProfile === false);

  // 🔐 Force profile completion
  useEffect(() => {
    if (userLogin && userLogin.isProfile === false && !isProfilePage) {
      router.replace("/Auth/Profile");
    }
  }, [userLogin, isProfilePage, router]);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <UserHeader />}
      <main className="flex-1">{children}</main>
      {!hideNavbar && <UserFooter />}
    </div>
  );
}
