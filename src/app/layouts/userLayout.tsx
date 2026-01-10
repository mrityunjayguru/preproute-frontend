"use client";

import { ReactNode, useEffect } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { setQuestionPaperResult } from "@/api/Users";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function UserLayout({ children }: { children: ReactNode }) {
  const dispatch=useDispatch<AppDispatch>()
  const pathname = usePathname();
  const router = useRouter();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  // Hide header on exam flows and Auth pages; footer always shown per request
  const isExamPage =
    pathname === "/Exam/userExam" || pathname === "/Exam/Instruction";
  const isAuthPage = pathname?.startsWith("/Auth");
  const hideChrome = isExamPage || isAuthPage;
useEffect(()=>{
  if(pathname!="/analytics"){
  const payload2:any=null
dispatch(setQuestionPaperResult(payload2));
  }
  
},[pathname])
  return (
    <div className="flex flex-col ">
      {!hideChrome && <UserHeader />}
      <main className={hideChrome ? "flex-1 overflow-hidden" : "flex-1 "}>
        {children}
      </main>
      {!hideChrome && <UserFooter />}
    </div>
  );
}
