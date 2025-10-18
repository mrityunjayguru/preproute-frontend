"use client";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { AppDispatch } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

// 🔒 Lock Icon
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// 🎯 Exam Card
const MockExamCard = ({ exam }: { exam: any }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const examById = useSelector((state: any) => state?.exam?.examById) || [];

  const handleExam = (data: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return router.push("/home");
    }

    const payload: any = {
      examTypeId: data?.examTypeId,
      examid: data?.examid,
      questionPapername: data?.questionPapername,
    };
    dispatch(getUserQuestionData(payload));
    router.push("userExam");
  };

  return (
    <Card className="flex flex-col justify-between p-5 bg-[#F7F7F5] rounded-xl  shadow-none">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-xs md:text-sm font-medium uppercase tracking-wider text-[#000]">
            {examById[0]?.examType?.examType || "Exam"}
          </h1>
          <h3
            className={`text-base md:text-lg font-bold mt-1 ${
              exam.isLocked ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {exam.questionPapername || "Untitled Exam"}
          </h3>
          {exam.status === "Free" && (
            <span className="text-[10px] md:text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 w-fit">
              Free
            </span>
          )}
        </div>
        {exam.isLocked && <LockIcon className="mt-1" />}
      </div>

      <p
        className={`text-xs md:text-sm mt-auto ${
          exam.isLocked ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {exam.description || "Unattempted"}
      </p>

      {!exam.isLocked && (
        <button
          className="bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium mt-4 py-2 px-4 rounded-md transition-all duration-200 text-sm md:text-base"
          onClick={() => handleExam(exam)}
        >
          Start Exam
        </button>
      )}
    </Card>
  );
};

// 🧩 Main User Exam Page
const UserExam = () => {
  const examById = useSelector((state: any) => state?.exam?.examById) || [];

  return (
    <div className="min-h-screen font-sans bg-[#fff]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Header Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#FF5635]">
            {examById?.length
              ? `${examById[0]?.exam?.examname || ""}: `
              : ""}
            <span className="text-[#000000]">
              {examById[0]?.examType?.examType || ""}
            </span>
          </h1>

          <p className="text-sm md:text-base text-[#000000] md:w-2/3 leading-relaxed">
            The Prep Route mock tests are carefully designed to mirror the
            question style, difficulty level, and time pressure of the actual
            exam. Read this document to learn more.
          </p>
        </div>

        {/* Mock Exam Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {examById?.length > 0 ? (
            examById.map((exam: any, index: number) => (
              <MockExamCard key={exam._id || index} exam={exam} />
            ))
          ) : (
            <div className="col-span-full text-center text-[#000000] py-10">
              No exams available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserExam;
