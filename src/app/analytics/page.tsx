"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopic } from "@/api/Topic";
import { AppDispatch } from "@/store/store";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import Image from "next/image";
import SocialMedia from "../Component/Home/_componets/social-media";
import { getCommonExamType, getExamBeExamTypeId } from "@/api/ExamType";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SummaryTabs from "./_components/SummaryTabs";
import { QuestionPaperResult } from "@/api/Users";

function Analytics() {
  const examResult = useSelector((state: any) => state.question?.result?.data);
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examTypeData =
    useSelector((state: any) => state?.examType?.examType) || [];
  const examList =
    useSelector((state: any) => state?.examType?.examDetail) || [];
  const [selectedExamTypeId, setSelectedExamTypeId] = useState<string>("");
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedYearOrNumber, setSelectedYearOrNumber] = useState<string>("");
  const commonexam=useSelector((state:any)=>state?.exam?.exam)
  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const payload: any = { userId: userLogin?._id };
    dispatch(getCommonExamType(payload));
  }, [dispatch, userLogin?._id]);

  useEffect(() => {
    if (!selectedExamTypeId) return;
    dispatch(getExamBeExamTypeId({ examTypeId: selectedExamTypeId } as any));
    setSelectedExamId("");
    setSelectedYearOrNumber("");
  }, [dispatch, selectedExamTypeId]);

  useEffect(() => {
    const fetchResult = async () => {
      if (selectedExamId && userLogin?._id) {
if(!selectedExamTypeId && !selectedExamId && selectedYearOrNumber=="") return
        const payload: any = {
          userId: userLogin._id,
          selectedExamTypeId:selectedExamTypeId,
          selectedExamId: selectedExamId,
          selectedquestion:selectedYearOrNumber
        };
        await dispatch(QuestionPaperResult(payload));
      }
    };
    fetchResult();
  }, [selectedExamId, selectedYearOrNumber, userLogin, examList, dispatch]);

  const yearOrNumberOptions = [2001,2002,2003]

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between ">
      {/* Top Header Bar */}
      <div className="mx-auto w-full  px-6 sm:px-8 md:px-12 lg:px-28">
        <div className="relative bg-[#F0F9FF] rounded-2xl px-6 sm:px-8 py-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#FF5635] font-poppins">
              Performance Analytics
            </h2>
            <p className="text-black font-dm-sans">
              Understand your strengths and improve where it matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-[620px]">
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Select Exam Type
              </p>
              <Select
                value={selectedExamTypeId}
                onValueChange={setSelectedExamTypeId}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border border-[#E6F4FF] focus:outline-none font-dm-sans text-sm">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  {examTypeData.map((type: any) => (
                    <SelectItem key={type?._id} value={type?._id}>
                      {type?.examType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Select Exam
              </p>
              <Select value={selectedExamId} onValueChange={setSelectedExamId}>
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border border-[#E6F4FF] focus:outline-none font-dm-sans text-sm">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>

                <SelectContent>
                  {commonexam.map((ex: any) => (
                    <SelectItem key={ex?._id} value={ex?._id}>
                      {ex?.examname || ex?.examname }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Question Paper
              </p>
              <Select
                value={selectedYearOrNumber}
                onValueChange={setSelectedYearOrNumber}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border border-[#E6F4FF] focus:outline-none font-dm-sans text-sm">
                  <SelectValue placeholder="Select Year or Number" />
                </SelectTrigger>

                <SelectContent>
                  {examList.map((val: any) => (
                   <SelectItem key={val?._id} value={val?._id}>
                      {val?.questionPapername || val?.questionPapername }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Summary Tabs */}
        <div className="">
          {examResult?(
          <SummaryTabs data={examResult} />
          ):(null)}
        </div>
      </div>
      <section className="w-full bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <SocialMedia />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;
