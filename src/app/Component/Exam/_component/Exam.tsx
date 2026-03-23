"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FaUnlock } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  getCommonQuestionBeExamId,
  handleGivenExam,
  handleSetSelectedExam,
  setCurrentSection,
} from "@/api/Exam";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { QuestionPaperResult } from "@/api/Users";

import EXAMPREP from "@/assets/vectors/exam/Man_Working_From_Home.svg";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import LOCK from "@/assets/vectors/lock.svg";
import LOCK2 from "@/assets/vectors/lock-2.svg";
import { capitalizeWords } from "@/Utils/Cappital";
import { ToastError } from "@/Utils/toastUtils";

const MockExamCard = ({ exam, handleExam, index }: any) => {
  const router = useRouter();
  const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  const selectedExamType = useSelector((s: any) => s.examType?.selectedExamType);
  const selectedExam = useSelector((s: any) => s.exam?.selectedExam);
  const [mockCount, serMockCount] = useState<any>(null);

  useEffect(() => {
    let mCount = null;
    try {
      if (haaccessExam?.purchasedPlan?.[0]?.exams && haaccessExam._id) {
        mCount = haaccessExam.purchasedPlan[0].exams.find(
          (val: any) => val?.examId === haaccessExam._id
        ) ?? null;
      }
      serMockCount(mCount);
    } catch (error) {}
  }, [haaccessExam]);

  const freeMockLimit = mockCount?.mockCount ?? 0;
  const isLocked = !(
    haaccessExam?.hasAccess ||
    index === 0 ||
    selectedExamType?.examType === "Past Year" ||
    index < freeMockLimit
  );

  const userSummary = exam?.userSummary || [];
  const attemptCount = userSummary.length;

  return (
    <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 flex flex-col transition-all shadow-sm">
      <div className="relative mb-2">
        <p className="text-[12px] sm:text-[13px] font-dm-sans font-medium text-gray-500">
          {exam?.exam?.examname || selectedExam?.examname || selectedExamType?.examType || "Exam"}
        </p>
        {isLocked && (
          <div className="absolute top-0 right-0">
            <Image src={LOCK} alt="lock" />
          </div>
        )}
        {index === 0 && !isLocked && (
          <div className="absolute top-0 right-0 font-poppins">
            <span className="bg-[#4FA77E] px-3 py-1 rounded-md text-sm text-white">Free</span>
          </div>
        )}
      </div>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-poppins text-[#FF5635] mb-6">
        {capitalizeWords(exam?.questionPapername)}
      </h3>

      <div className="mt-auto w-full flex flex-col gap-2 font-poppins">
        {isLocked ? (
          <Button
            onClick={() => router.push("/PlanandPricing")}
            className="px-10 h-11 rounded-[8px] bg-[#E3E5E9] text-[#ADB5CC] cursor-not-allowed w-full"
          >
            Start
          </Button>
        ) : (
          <>
            {/* Logic: Map through summaries and check the 'target' for UI decision */}
            {userSummary.map((attempt: any, i: number) => {
              const isIncomplete = attempt.target === 0;

              return (
                <div key={attempt._id || i} className="w-full flex flex-col gap-2 mb-1">
                  {isIncomplete ? (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-[#FF5635] text-white hover:bg-black transition h-10 text-xs"
                        onClick={() => handleExam(exam, "Resume", index, attemptCount,attempt)}
                      >
                        Resume Attempt #{i + 1}
                      </Button>
                      <Button
                        className="flex-1 bg-black text-white hover:bg-[#FF5635] transition h-10 text-xs"
                        onClick={() => handleExam(exam, "Restart", index, attemptCount,attempt)}
                      >
                        Restart
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleExam(exam, "Result", i,attemptCount, attempt)}
                      className="w-full border border-[#FF5635] text-[#FF5635] hover:bg-[#FF5635] hover:text-white transition h-10 text-xs"
                    >
                      Result and Analysis #{i + 1}
                    </Button>
                  )}
                </div>
              );
            })}

            {/* Start New Attempt Logic: Only if less than 3 total attempts and NO current attempt is active (target 0) */}
            {attemptCount < 3 && (
              <Button
                className="bg-[#FF5635] cursor-pointer text-white hover:bg-black transition mt-1 h-11"
                onClick={() => handleExam(exam, "start", index, attemptCount)}
              >
                {attemptCount > 0 ? `Re-attempt (${attemptCount}/3)` : "Start Exam"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function MergedExamPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const selectedExamType = useSelector((s: any) => s.examType?.selectedExamType);
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);
  const examdata = useSelector((s: any) => s.exam?.exam) || [];
  const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  useEffect(() => {
    if (examById.length > 0) {
      setSelectedExam({
        examname: examById[0]?.exam?.examname,
        _id: examById[0]?.exam?._id,
        oteher: examById,
      });
    }
  }, [examById]);

  const handleSelectExam = async (exam: any) => {
    dispatch(handleSetSelectedExam(exam._id));
    setSelectedExam(exam);
    await dispatch(
      getCommonQuestionBeExamId({
        examid: exam._id,
        examTypeId: selectedExamType?._id,
        isPublished: true,
        uid: loginUser?._id,
      })
    );
  };

  const handleExam = async (examData: any, type?: string, index?: number, count?: any,attempted?:any) => {
alert(attempted)
return
    if (!localStorage.getItem("token")) return router.push("/Auth/signin");
// alert(JSON.stringify(attempted))
    if (type === "Result") {
      await dispatch(QuestionPaperResult({ questionPaperID: examData._id }));
      router.push("/analytics");
      return;
    }

    // Previous exam dependency check
    if (type === "start" && index !== undefined && index > 0) {
      const prev = examById[index - 1];
      if (!prev?.hasGivenExam || prev?.userSummary?.some((a: any) => a.target === 0)) {
        ToastError("Please complete the previous mock exam first");
        return;
      }
    }

    dispatch(handleGivenExam(null));
    dispatch(setCurrentSection(null));
    localStorage.setItem("exam_permission", "true");

    const payload: any = {
      examTypeId: examData?.examTypeId,
      questionPaperId: examData?._id,
      examid: examData?.examid,
      attemptedCount: type === "Resume" || "Restart" ? Number(count) : Number(count) + 1,
      type: type,
      questionPapername: examData?.questionPapername,
      sectionId: examData?.sectionId,
      summaryid: attempted?._id, // References the existing record for resuming
    };
    const response: any = await dispatch(getUserQuestionData(payload));

    if (type !== "Resume") {
      localStorage.removeItem(`exam_timeLeft_${response?.payload?.[0]?._id}`);
    }
    router.push("/Exam/Instruction");
  };

  const noofMocks = selectedExam?.oteher?.[0]?.exam?.noOfMocks ?? 24;
  const userAccessLimit =
    haaccessExam?.purchasedPlan?.[0]?.exams?.find((v: any) => v.examId === haaccessExam._id)
      ?.mockCount ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 md:px-28 py-10">
        {examById.length === 0 ? (
          <div>
            <div className="relative h-[140px] bg-[#F0F9FF] mb-8 rounded-2xl px-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-poppins text-[#FF5635]">
                  {selectedExamType?.examType}
                </h2>
                <p className="text-gray-600 font-dm-sans">
                  Choose a college to begin your practice.
                </p>
              </div>
              <Image
                src={EXAMPREP}
                alt="Prep"
                width={200}
                height={140}
                className="hidden md:block"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {examdata.map((ex: any) => (
                <div
                  key={ex._id}
                  className="p-6 border rounded-lg bg-white shadow-sm cursor-pointer hover:border-[#FF5635] transition"
                  onClick={() => handleSelectExam(ex)}
                >
                  <h3 className="text-[#FF5635] text-xl font-poppins mb-4">{ex.examname}</h3>
                  <Button className="bg-[#FF5635] w-full">Choose</Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {examById.map((exam: any, i: number) => (
              <MockExamCard key={exam._id} exam={exam} handleExam={handleExam} index={i} />
            ))}

            {[...Array(Math.max(0, noofMocks - examById.length))].map((_, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 border border-dashed rounded-lg opacity-60"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">
                    Mock {examById.length + idx + 1}
                  </span>
                  {examById.length + idx < userAccessLimit ? (
                    <FaUnlock className="text-green-400" />
                  ) : (
                    <Image src={LOCK2} alt="lock" />
                  )}
                </div>
                <h3 className="text-gray-400 text-lg mt-4 font-poppins">Coming Soon</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-[#FF5635] py-10 mt-auto">
        <div className="px-6 md:px-28 flex justify-between items-center">
          <Image src={FOOTERLOGO} alt="logo" width={180} height={40} />
          <SocialMedia />
        </div>
      </footer>
    </div>
  );
}