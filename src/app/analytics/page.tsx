"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../Component/Home/_componets/social-media";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SummaryTabs from "./_components/SummaryTabs";
import { QuestionPaperResult } from "@/api/Users";
import { givenExam } from "@/api/Exam";
import { capitalizeWords } from "@/Utils/Cappital";
import { AppDispatch } from "@/store/store";

function Analytics() {
  const dispatch = useDispatch<AppDispatch>();

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examResult = useSelector((state: any) => state?.question?.result?.data);
  const givenAllExam =
    useSelector((state: any) => state?.exam?.givenAllExam) || [];

  const [selectedExamTypeId, setSelectedExamTypeId] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedQuestion, setselectedQuestion] = useState("");

  /* ===========================
     FETCH GIVEN EXAMS
  ============================ */
  useEffect(() => {
    if (userLogin?._id) {
      dispatch(givenExam({ userId: userLogin._id }));
    }
  }, [dispatch, userLogin?._id]);

  /* ===========================
     DERIVED DATA (NO UI CHANGE)
  ============================ */

  // Exam Types
  const examTypes = useMemo(
    () => givenAllExam.map((item: any) => item.examType),
    [givenAllExam],
  );
  console.log(examTypes,"examTypesexamTypes")

  // Selected ExamType Object
  const selectedExamType = useMemo(
    () =>
      givenAllExam.find(
        (item: any) => item.examType._id === selectedExamTypeId,
      ),
    [givenAllExam, selectedExamTypeId],
  );

  // Exams
  const exams = selectedExamType?.exams || [];

  // Selected Exam Object
  const selectedExam = exams.find((ex: any) => ex._id === selectedExamId);

  const isSectional = selectedExamType?.examType?.name === "Sectional";

  /**
   * 🔥 QUESTION PAPERS LOGIC
   * UI SAME – DATA SWITCHES AUTOMATICALLY
   */
  const questionPapers = useMemo(() => {
    if (!selectedExam) return [];

    // NON-SECTIONAL (Mocks etc.)
    if (!isSectional) {
      return selectedExam?.questionPapers || [];
    }

    // SECTIONAL → merge all section question papers
    const papers: any[] = [];
    selectedExam?.sections?.forEach((section: any) => {
      section?.questionPapers?.forEach((qp: any) => {
        papers.push({
          ...qp,
          sectionId: section.sectionId,
          sectionName: section.sectionName,
        });
      });
    });

    return papers;
  }, [selectedExam, isSectional]);

  /* ===========================
     FETCH RESULT
  ============================ */
  useEffect(() => {
    if (
      userLogin?._id &&
      selectedExamTypeId &&
      selectedExamId &&
      selectedQuestion
    ) {
      const selectedQP = questionPapers.find(
        (q: any) => q._id === selectedQuestion,
      );

      dispatch(
        QuestionPaperResult({
          userId: userLogin._id,
          selectedExamTypeId,
          selectedExamId,
          questionPaperID: selectedQuestion,
          sectionId: isSectional ? selectedQP?.sectionId : undefined,
        }),
      );
    }
  }, [
    userLogin,
    selectedExamTypeId,
    selectedExamId,
    selectedQuestion,
    questionPapers,
    isSectional,
    dispatch,
  ]);

  /* ===========================
     UI (UNCHANGED)
  ============================ */
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between ">
      <div className="mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-28">
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
            {/* Exam Type */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Select Exam Type
              </p>
              <Select
                value={selectedExamTypeId}
                onValueChange={(val) => {
                  setSelectedExamTypeId(val);
                  setSelectedExamId("");
                  setselectedQuestion("");
                }}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((type: any) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exam */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Select Exam
              </p>
              <Select
                value={selectedExamId}
                onValueChange={(val) => {
                  setSelectedExamId(val);
                  setselectedQuestion("");
                }}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((ex: any) => (
                    <SelectItem key={ex._id} value={ex._id}>
                      {ex.subjectName || ex.name }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Paper */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-900 font-poppins">
                Question Paper
              </p>
              <Select
                value={selectedQuestion}
                onValueChange={setselectedQuestion}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-[4px] bg-white border">
                  <SelectValue placeholder="Select Year or Number" />
                </SelectTrigger>
                <SelectContent>
                  {questionPapers.map((val: any) => (
                    <SelectItem key={val._id} value={val._id}>
                      {capitalizeWords(val.name)}
                      {isSectional && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({val.sectionName})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {examResult && <SummaryTabs data={examResult} />}

        {givenAllExam.length === 0 && (
          <div className="flex justify-center my-10">
            <p className="text-xl font-medium">No exams attempted yet.</p>
          </div>
        )}
      </div>

      <section className="w-full bg-[#FF5635] text-white py-6 mt-16">
        <div className="mx-auto flex justify-between items-center px-28">
          <Image src={FOOTERLOGO} alt="logo" width={160} />
          <SocialMedia />
        </div>
      </section>
    </div>
  );
}

export default Analytics;
