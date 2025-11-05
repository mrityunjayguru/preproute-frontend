"use client"
import { useEffect } from "react";
import CardPage from "../Cards/Card";
import { QuoteComponent } from "../Cards/QuoteComponent";
import { ImpactChart } from "../Chart/Chart";
import FeaturePages from "../Feature/Feature";
import { ExamsSection } from "./ExamSection";
import { HeroSection } from "./HeroSection";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getQuestionBeExamId, resetQuestionByExamID } from "@/api/Exam";
import { handleSelectedExamType } from "@/api/ExamType";
import { resetQuestion } from "@/api/Question";
import { useRouter } from "next/navigation";

export const HomePage = () => {
    const router = useRouter();
  
  const dispatch=useDispatch<AppDispatch>()
  const userLogin=useSelector((state:any)=>state?.Auth?.loginUser)
  
   useEffect(()=>{
      const payload:any=null
    dispatch(resetQuestionByExamID(payload))
    dispatch(resetQuestion(payload))
        dispatch(handleSelectedExamType(payload));
        dispatch(handleSelectedExamType(payload));
    

    },[])
    if(userLogin?.isProfile==false && userLogin?.role=="User"){
    router.push(`/Auth/Profile`);
    }
  return (
   
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Container with max-width for content */}
      <div className="">
        <HeroSection />
        <ExamsSection />
      </div>
      <div>
        <FeaturePages/>
      </div>
      <div>
        <CardPage/>
        <QuoteComponent/>
      </div>
      <div>
        <ImpactChart/>
      </div>
    </div>
  );
};