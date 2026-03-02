"use client";

import { ReactNode, useEffect } from "react";
import { Header as UserHeader } from "@/Layout/Header";
import { Footer as UserFooter } from "@/Layout/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionPaperResult } from "@/api/Users";
import { AppDispatch } from "@/store/store";
import OfferBanner from "@/Layout/OfferBanner";
import WhatsAppSocialApp from "../Component/Home/_componets/whatsapp-socialmedia";
import TopProgressBar from "@/Common/loder";

export default function UserLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouter();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
const loder = useSelector((state: any) => state?.exam?.loder);
  // --- Logic for visibility ---
  const isExamFlow = pathname?.startsWith("/Exam");
  const isAuthPage = pathname?.startsWith("/Auth");
  
  // Specific check for showing/hiding main Chrome (Header/Footer)
  // You can keep your specific list or just use isExamFlow
  const isExamPage = 
    pathname === "/Exam/userExam" || 
    pathname === "/Exam/Instruction" || 
    pathname === "/Exam/dailyPractice" || 
    pathname === "/Exam/attemptTopicExam";
  
  const hideChrome = isExamPage || isAuthPage;

  useEffect(() => {
    if (pathname !== "/analytics") {
      const payload2: any = null;
      dispatch(setQuestionPaperResult(payload2));
    }
  }, [pathname, dispatch]);

  return (
    <>
    <TopProgressBar isAnimating={loder} />
      {/* 1. Only show WhatsApp if NOT in the Exam flow */}
      {!isExamFlow && <WhatsAppSocialApp />}

      <div className="flex flex-col ">
        {!hideChrome && (
          <>
            <OfferBanner />
            <UserHeader />
          </>
        )}
        
        <main className={hideChrome ? "flex-1 overflow-hidden" : "flex-1 "}>
          {children}
        </main>
        
        {!hideChrome && <UserFooter />}
      </div>
    </>
  );
}