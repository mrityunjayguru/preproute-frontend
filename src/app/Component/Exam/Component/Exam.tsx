"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookIcon } from "lucide-react";
import { CutOffIcons } from "@/Common/svgIcon";

import {
  getCommonexam,
  getCommonQuestionBeExamId,
  handleSetSelectedExam,
} from "@/api/Exam";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { QuestionPaperResult } from "@/api/Users";
import UserExamPop from "../../ManageExam/Component/UserExamPop";


const LockIcon = (props:any) => (
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


const MockExamCard = ({ exam, handleExam }) => {
  const user = useSelector((s:any) => s.Auth?.loginUser);
  const hasPurchase = user?.PurchaseDetail?.length > 0;
  const isMock1 = ["mock 1", "mocks 1"].includes(exam?.questionPapername?.toLowerCase());
  const isAttempted = exam?.hasGivenExam;
  const isUnlocked = isMock1 || hasPurchase;
  const haaccessExam = useSelector((s:any) => s.exam?.examHeader);

  return (
    <Card
      className={`flex flex-col justify-between p-3 rounded-xl transition-all duration-300 mt-10 ${isUnlocked ? "bg-[#F7F7F5] hover:shadow-md" : "bg-gray-100"
        }`}
    >
      <div className="flex flex-row justify-between items-center mt-1">
        <p className="text-[16px] text-gray-600">Mock Exam</p>
        <button className="text-[#FF5635] bg-[#4FA77E] px-3 py-1 rounded-md text-sm font-medium text-white">
          Free
        </button>
      </div>

      <h3 className="text-[28px] text-[#FF5635] mb-6">Warm Up</h3>

      <div className="mt-4">
        {isAttempted ? (
          <Button
            variant="outline"
            onClick={() => handleExam(exam)}
            className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 font-medium"
          >
            View Analytics
          </Button>
        ) : haaccessExam?.hasAccess ? (
          <Button
            className="bg-[#FF5635] hover:bg-[#e34d2e] px-10 text-white font-medium"
            onClick={() => handleExam(exam)}
          >
            <UserExamPop/>
          </Button>
        ) : (
          <Button disabled className="bg-gray-300 text-gray-700 cursor-not-allowed w-full">
            Locked
          </Button>
        )}
      </div>
    </Card>
  );
};


export default function MergedExamPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const examdata = useSelector((s:any) => s.exam?.exam) || [];
  const examById = useSelector((s:any) => s.exam?.examById) || [];
  const selectedExamType = useSelector((s:any) => s.examType?.selectedExamType);
  const loginUser = useSelector((s:any) => s.Auth?.loginUser);

  const [selectedExam, setSelectedExam] = useState<any>(null);

console.log(selectedExamType,"selectedExamTypeselectedExamTypeselectedExamType")
  useEffect(() => {
    const payload:any={
      userId:loginUser?._id
    }
    dispatch(getCommonexam(payload));
  }, []);


  useEffect(() => {
    if (examById.length > 0) {
      const payload:any={
        examname: examById[0]?.exam?.examname,
        _id: examById[0]?.exam?._id,
      }
      setSelectedExam(payload);
    }
  }, [examById]);

useEffect(()=>{
  setSelectedExam(null)
},[selectedExamType])
  // Handle dropdown
  const handleSelectExam = (option:any) => {
    if (!option) return;
dispatch(handleSetSelectedExam(option.value));
    const exam = option.value;
    setSelectedExam(exam);

    const payload:any = {
      examid: exam?._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };

    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleExam = async (examData:any) => {
    if (!localStorage.getItem("token")) return router.push("/home");

    if (!examData?.hasGivenExam) {
      const payload:any={
          examTypeId: examData?.examTypeId,
          questionPaperId: examData?._id,
          examid: examData?.examid,
          questionPapername: examData?.questionPapername,
        }
      dispatch(
        getUserQuestionData(payload)
      );
    } else {
      const payload:any={ questionPaperID: examData?._id }
      await dispatch(QuestionPaperResult(payload));
      router.push("/Exam/result");
    }
  };


  const examOptions = examdata.map((ex:any) => ({
    label: ex.examname,
    value: ex,
  }));


  return (
    <div className="min-h-screen font-sans bg-white px-6 lg:px-0 py-6">


      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4">

        <div className="max-w-[350px] w-full">

          <Select
            options={examOptions}
            value={
              selectedExam
                ? { label: selectedExam.examname, value: selectedExam }
                : null
            }
            onChange={handleSelectExam}
            placeholder="Select Exam"
            isSearchable
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          <Button className="flex items-start gap-2 bg-[#FF5635] px-10 py-2 text-white rounded-lg shadow-md">
            <span className="text-[15px]">Syllabus</span>
            <BookIcon className="h-4 w-4" />
          </Button>

          <Button className="flex items-start gap-2 bg-[#000] px-10 py-2 text-white rounded-lg shadow-md">
            <span className="text-[15px]">Cutoff</span>
            <CutOffIcons />
          </Button>
        </div>
      </header>

      {!examById.length && (
        <div className="text-center mt-6">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Select Mock Exam</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-6">
            {examdata.map((exam:any) => (
              <Card key={exam._id} className="p-5 rounded-xl bg-[#FAFAF9] hover:shadow-lg hover:scale-[1.01] cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{exam.examname}</h3>

                <Button
                  className="bg-[#FF5635] hover:bg-[#e34d2e] text-white w-full"
                  onClick={() =>
                    handleSelectExam({
                      label: exam.examname,
                      value: exam,
                    })
                  }


                >
                  View Mock Tests
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}


      {examById.length > 0 && (
        <main className="container mx-auto mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 mr-20">
            <h1 className="text-3xl font-semibold text-[#FF5635]">
              <span className="text-black">Mock - </span>
              {selectedExam?.examname || "Mock Tests"}
            </h1>


            <p className="text-black text-sm md:text-base max-w-2xl">
              The Prep Route mock tests are carefully designed to mirror the question
              style, difficulty level, and time pressure of the actual exam.
              Read this document to learn more.

            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {examById.map((exam:any) => (
              <MockExamCard key={exam._id} exam={exam} handleExam={handleExam} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}