"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

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

/**
 * Individual Card for an Exam/Mock
 */
const MockExamCard = ({ exam, handleExam, index }: any) => {
  const router = useRouter();
  const user = useSelector((s: any) => s.Auth?.loginUser);
  const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  const selectedExamType = useSelector((s: any) => s.examType?.selectedExamType);
  const selectedExam = useSelector((s: any) => s.exam?.selectedExam);

  // Logic for locking/unlocking content
  const isLocked = !(
    haaccessExam?.hasAccess ||
    index === 0 ||
    selectedExamType?.examType === "Past Year"
  );

  const isAttempted = exam?.hasGivenExam;
  const isInProgress = exam?.userSummary?.target === 0 && isAttempted;
  const isCompleted = isAttempted && exam?.userSummary?.target === 100;

  return (
    <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 flex flex-col transition-all shadow-sm">
      <div className="relative mb-2">
        <p className="text-[12px] sm:text-[13px] font-dm-sans font-medium text-gray-500">
          {exam?.exam?.examname || selectedExam?.examname || "Exam"}
        </p>

        {isLocked && (
          <div className="absolute top-0 right-0">
            <Image src={LOCK} alt="lock" width={18} height={18} />
          </div>
        )}

        {index === 0 && !isLocked && (
          <div className="absolute top-0 right-0 font-poppins">
            <span className="bg-[#4FA77E] px-3 py-1 rounded-md text-xs text-white">
              Free
            </span>
          </div>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-medium font-poppins text-[#FF5635] mb-4 min-h-[3rem]">
        {/* Prioritize Question Paper Name, Fallback to Subject Name */}
        {capitalizeWords(exam?.questionPapername || exam?.subjectName || "Mock Test")}
      </h3>

      <div className="mt-auto w-full font-poppins">
        {isLocked ? (
          <Button
            onClick={() => router.push("/PlanandPricing")}
            className="w-full h-11 rounded-[8px] bg-[#E3E5E9] text-[#ADB5CC] cursor-pointer"
          >
            Unlock Now
          </Button>
        ) : (
          <>
            {isCompleted && (
              <Button
                variant="outline"
                onClick={() => handleExam(exam)}
                className="w-full border border-[#FF5635] text-[#FF5635] hover:bg-[#FF5635] hover:text-white transition font-poppins"
              >
                Result and Analysis
              </Button>
            )}

            {!isCompleted && isInProgress && (
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#FF5635] text-white hover:bg-black transition font-poppins"
                  onClick={() => handleExam(exam, "Resume")}
                >
                  Resume
                </Button>
                <Button
                  className="flex-1 bg-black text-white hover:bg-[#FF5635] transition"
                  onClick={() => handleExam(exam, "start")}
                >
                  Restart
                </Button>
              </div>
            )}

            {!isCompleted && !isInProgress && (
              <Button
                className="w-full h-11 rounded-[8px] bg-[#FF5635] text-white hover:bg-black transition font-poppins"
                onClick={() => handleExam(exam, "start", index)}
              >
                Start
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function MergedExamPageCUET() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Redux Selectors
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examdata = useSelector((s: any) => s.exam?.exam) || [];
  const selectedExamType = useSelector((s: any) => s.examType?.selectedExamType);
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);

  // Local State
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [mockDate, setMockDate] = useState("");
  const isMock = searchParams.get("isMock") === "true";

  const formatMockDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (selectedExam?.mockDate) {
      setMockDate(formatMockDate(selectedExam.mockDate));
    } else {
      setMockDate("");
    }
  }, [selectedExam]);

  // Initial Data Mapping
  useEffect(() => {
    if (examById.length > 0 && !selectedExam) {
      const firstExam = examById[0];
      setSelectedExam({
        ...firstExam.exam,
        subjectName: firstExam.exam?.subjectName || firstExam.subjectName,
        section: firstExam.sectionDetails,
      });
    }
  }, [examById]);

  // Handle Exam Selection via Dropdown or Grid
  const handleSelectExam = async (option: any) => {
    if (!option) return;
    const examValue = option.value || option;
    
    dispatch(handleSetSelectedExam(examValue._id));
    setSelectedExam(examValue);

    const payload: any = {
      examid: examValue._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };
    await dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleExam = async (examData: any, type: any, i: any) => {
    // Sequence check: Must complete previous mock first
    if (i > 0) {
      const prevExam = examById[i - 1];
      if (!prevExam?.hasGivenExam || prevExam?.userSummary?.target === 0) {
        ToastError("Please complete the previous mock exam first");
        return;
      }
    }

    if (!localStorage.getItem("token")) return router.push("/Auth/signin");

    dispatch(handleGivenExam(null));
    dispatch(setCurrentSection(null));

    if (!examData?.hasGivenExam || type === "Resume" || type === "start") {
      localStorage.setItem("exam_permission", "true");
      const payload = {
        examTypeId: examData?.examTypeId,
        questionPaperId: examData?._id,
        examid: examData?.examid,
        type: type,
        questionPapername: examData?.questionPapername,
        records: examData,
      };

      const response: any = await dispatch(getUserQuestionData(payload));
      if (type === "start") {
        localStorage.removeItem(`exam_timeLeft_${response?.payload[0]?._id}`);
      }
      router.push("/Exam/Instruction");
    } else {
      router.push("/analytics");
    }
  };

  const examOptions = examdata.map((ex: any) => ({
    label: ex.subjectName || ex.examname,
    value: ex,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow px-6 sm:px-8 md:px-12 lg:px-28">
        
        {/* STATE 1: Subject Selection Grid (Initial View) */}
        {examById.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 flex items-center justify-between overflow-hidden">
              <div className="z-10">
                <h2 className="text-xl md:text-3xl font-medium text-[#FF5635] font-poppins">
                  {selectedExamType?.examType || "Select Subject"}
                </h2>
                <p className="text-sm md:text-base text-gray-600 font-dm-sans">
                  Choose a subject to access specialized mock exams.
                </p>
              </div>
              <Image src={EXAMPREP} alt="Illustration" width={200} height={140} className="hidden md:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {examdata.map((exam: any, index: number) => (
                <div key={exam._id} className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 
                 flex flex-col transition-all">
                  <p className="text-xs font-medium text-gray-400 mb-1">Subject</p>
                  <h3 className="text-xl font-poppins font-medium text-[#FF5635] mb-6">
                    {exam.subjectName}
                  </h3>
                  <button
                    onClick={() => handleSelectExam(exam)}
                    className="  w-full md:w-fit px-6 sm:px-8 md:px-10 cursor-pointer
                h-10 sm:h-11
                rounded-[8px]
                bg-[#FF5635] text-white
                hover:bg-[#e34d2e]
                transition-all"
                  >
                    Choose To Start
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STATE 2: Specific Exam List View */}
        {examById.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative h-[140px] bg-[#F0F9FF] my-8 rounded-2xl px-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-poppins">
                  <span className="font-bold">{selectedExamType?.examType}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-[#FF5635]">{selectedExam?.subjectName || selectedExam?.examname}</span>
                </h2>
                <p className="text-gray-600 text-sm md:text-base">Practice tailored exams based on current patterns.</p>
              </div>
              <Image src={EXAMPREP} alt="Illustration" width={200} height={140} className="hidden md:block" />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-500 font-dm-sans whitespace-nowrap">Change Subject:</span>
              <Select
                options={examOptions}
                value={selectedExam ? { label: selectedExam.subjectName, value: selectedExam } : null}
                onChange={handleSelectExam}
                className="w-full max-w-xs"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "8px",
                    background: "#F0F9FF",
                  })
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {examById.map((exam: any, i: number) => (
                <MockExamCard key={exam._id} exam={exam} handleExam={handleExam} index={i} />
              ))}

              {/* Locked/Placeholder Cards */}
              {Array.from({ length: Math.max(0, (selectedExam?.Mocks || 10) - examById.length) }).map((_, idx) => (
                <div key={idx} className="rounded-[8px] bg-gray-100 p-6 opacity-60 flex flex-col grayscale">
                   <div className="flex justify-between items-start">
                    <p className="text-xs text-gray-400">Mock {examById.length + idx + 1}</p>
                    <Image src={LOCK2} alt="lock" width={16} height={16} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-400 mt-2 mb-4">
                    {selectedExam?.subjectName} Mock
                  </h3>
                  <p className="text-xs text-gray-500 mt-auto">
                    {idx === 0 && mockDate ? `Available: ${mockDate}` : "Coming Soon"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Simplified Footer */}
      <footer className="bg-[#FF5635] mt-20 py-10">
        <div className="container mx-auto px-6 md:px-28 flex flex-col md:flex-row justify-between items-center gap-6">
          <Image src={FOOTERLOGO} alt="logo" width={180} height={50} />
          <SocialMedia />
        </div>
      </footer>
    </div>
  );
}




