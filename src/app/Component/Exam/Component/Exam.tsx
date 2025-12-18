"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  handleGivenExam,
  handleSetSelectedExam,
  setCurrentSection,
} from "@/api/Exam";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { QuestionPaperResult } from "@/api/Users";
import UserExamPop from "../../ManageExam/Component/UserExamPop";

const LockIcon = (props: any) => (
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

const MockExamCard = ({ exam, handleExam, index }) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;

  const user = useSelector((s: any) => s.Auth?.loginUser);
  const hasPurchase = user?.PurchaseDetail?.length > 0;
  const isMock1 = ["mock 1", "mocks 1"].includes(
    exam?.questionPapername?.toLowerCase()
  );
  const isAttempted = exam?.hasGivenExam;
  const isUnlocked = isMock1 || hasPurchase;
  const haaccessExam = useSelector((s: any) => s.exam?.examHeader);
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType
  );

  return (
    <Card
      className={`flex flex-col justify-between p-3 rounded-xl transition-all duration-300 mt-10 ${
        isUnlocked ? "bg-[#F7F7F5] hover:shadow-md" : "bg-gray-100"
      }`}
    >
      <div className="flex flex-row justify-between items-center mt-1">
        <p className="text-[16px] text-gray-600">{exam?.questionPapername}</p>
        {index == 0 ? (
          <button className="text-[#FF5635] bg-[#4FA77E] px-3 py-1 rounded-md text-sm font-medium text-white">
            Free
          </button>
        ) : null}
      </div>

      {/* <h3 className="text-[28px] text-[#FF5635] mb-6">Warm Up</h3> */}

      <div className="mt-4 w-full">
        {isAttempted && exam?.userSummary?.target == 100 ? (
          // ---------------------- VIEW ANALYTICS ------------------------
          <Button
            variant="outline"
            onClick={() => handleExam(exam)}
            className="w-full border-[#1b1a19] text-[#FF5635] font-medium cursor-pointer"
          >
            View Analytics
          </Button>
        ) : haaccessExam?.hasAccess ||
          index === 0 ||
          selectedExamType?.examType === "Past Year " ? (
          // ---------------------- FREE / ALLOWED ACCESS ------------------------
          <div className="flex w-full gap-2">
            {exam?.userSummary?.target == 0 ? (
              <>
                {/* RESUME BUTTON */}
                <Button
                  className="flex-1 bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium"
                  onClick={() => handleExam(exam,"Resume")}
                >
                  <UserExamPop text="Resume" />
                </Button>

                {/* USER POP BUTTON */}
                {/* <Button
                  className="flex-1 bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium"
                  onClick={() => handleExam(exam, "start")}
                >
                  <UserExamPop text="Start" />
                  start
                </Button> */}
              </>
            ) : (
              // ONLY START BUTTON
              <Button
                className="flex-1 bg-[#FF5635] hover:bg-[#e34d2e] text-white font-medium"
                onClick={() => handleExam(exam, "start")}
              >
                <UserExamPop text="Start" />
              </Button>
            )}
          </div>
        ) : (
          // ---------------------- LOCKED ------------------------
          <Button
            disabled
            className="w-full bg-gray-300 text-gray-700 cursor-not-allowed"
          >
            Locked
          </Button>
        )}
      </div>
    </Card>
  );
};

export default function MergedExamPage() {
  const searchParams = useSearchParams();
  const isMock: any = searchParams.get("isMock") === "true";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const examById = useSelector((s: any) => s.exam?.examById) || [];
  const examlength: any = examById.length;
  const selectedExamType = useSelector(
    (s: any) => s.examType?.selectedExamType
  );
  const loginUser = useSelector((s: any) => s.Auth?.loginUser);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const examdata = useSelector((s: any) => s.exam?.exam) || [];

  useEffect(() => {
    const payload: any = {
      userId: loginUser?._id,
    };
    dispatch(getCommonexam(payload));
  }, []);

  useEffect(() => {
    if (examById.length > 0) {
      const payload: any = {
        examname: examById[0]?.exam?.examname,
        _id: examById[0]?.exam?._id,
      };
      setSelectedExam(payload);
    }
  }, [examById]);

  useEffect(() => {
    setSelectedExam(null);
  }, [selectedExamType]);
  // Handle dropdown
  const handleSelectExam = (option: any) => {
    if (!option) return;
    dispatch(handleSetSelectedExam(option.value));
    const exam = option.value;
    setSelectedExam(exam);

    const payload: any = {
      examid: exam?._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };

    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleSelectExamDynamic = (val: any) => {
    if (!val) return;
    dispatch(handleSetSelectedExam(val));
    const exam = val;
    setSelectedExam(exam);

    const payload: any = {
      examid: exam?._id,
      examTypeId: selectedExamType?._id,
      isPublished: true,
      uid: loginUser?._id,
    };

    dispatch(getCommonQuestionBeExamId(payload));
  };

  const handleExam = async (examData: any, type: any) => {
    if (!localStorage.getItem("token")) return router.push("/Auth/signin");
    const payload: any = null;
    dispatch(handleGivenExam(payload));
    dispatch(setCurrentSection(payload));
    if (!examData?.hasGivenExam || type == "Resume" || type == "start") {
      localStorage.setItem("exam_permission","true")
      const payload: any = {
        examTypeId: examData?.examTypeId,
        questionPaperId: examData?._id,
        examid: examData?.examid,
        type: type,
        questionPapername: examData?.questionPapername,
        records: examData,
      };
      dispatch(getUserQuestionData(payload));
      // router.push("/Exam/userExam");

    } else {
      const payload: any = { questionPaperID: examData?._id };
      await dispatch(QuestionPaperResult(payload));
      router.push("/Exam/result");
    }
  };

  const examOptions = examdata.map((ex: any) => ({
    label: ex.examname,
    value: ex,
  }));
  useEffect(() => {
    if (isMock) {
      // Find only IPMAT Indore
      const ipmatIndoreExam = examdata.find(
        (ex: any) => ex.examname === "IPMAT-INDORE"
      );
      if (ipmatIndoreExam) {
        handleSelectExamDynamic(ipmatIndoreExam); // Pass only one exam
      }
    }
  }, [isMock, examdata]);

  return (
    <div className="min-h-[79vh] font-sans bg-white px-6 lg:px-10 py-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4">
        {examById && examById.length > 0 ? (
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
        ) : null}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          {/* <Button className="flex items-start gap-2 bg-[#FF5635] px-10 py-2 text-white rounded-lg shadow-md">
            <span className="text-[15px]">Syllabus</span>
            <BookIcon className="h-4 w-4" />
          </Button>

          <Button className="flex items-start gap-2 bg-[#000] px-10 py-2 text-white rounded-lg shadow-md">
            <span className="text-[15px]">Cutoff</span>
            <CutOffIcons />
          </Button> */}
        </div>
      </header>

      {!examById.length && (
        <div className="text-center mt-6">
          <h2 className="text-5xl font-semibold text-[#e34d2e] mb-4">
            {selectedExamType?.examType} Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-6">
            {examdata.map((exam: any) => (
              <Card
                key={exam._id}
                className="p-5 rounded-xl bg-[#FAFAF9] hover:shadow-lg hover:scale-[1.01] cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {exam.examname}
                </h3>

                <Button
                  className="bg-[#FF5635] hover:bg-[#e34d2e] text-white w-full"
                  onClick={() =>
                    handleSelectExam({
                      label: exam.examname,
                      value: exam,
                    })
                  }
                >
                  View {selectedExamType?.examType} Tests
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
              <span className="text-black">
                {selectedExamType?.examType} -{" "}
              </span>
              {selectedExam?.examname || "Mock Tests"}
            </h1>

            <p className="text-black text-sm md:text-base max-w-2xl">
              The Prep Route mock tests are carefully designed to mirror the
              question style, difficulty level, and time pressure of the actual
              exam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {examById.map((exam: any, i: any) => (
              <MockExamCard
                key={exam._id}
                exam={exam}
                handleExam={handleExam}
                index={i}
              />
            ))}
            {examById.length < (examById[0]?.exam?.Mocks || 0) &&
              [...Array((examById[0]?.exam?.Mocks || 0) - examById.length)].map(
                (_, idx) => (
                  <Card
                    key={`locked-${idx}`}
                    className="flex flex-col justify-between p-3 rounded-xl bg-gray-200 border border-gray-300 opacity-60"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-[14px] text-gray-500">
                        {" "}
                        {selectedExamType?.examType} {examlength + idx + 1}{" "}
                      </p>
                      <span className="text-gray-500">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-gray-500"
                        >
                          <rect
                            width="18"
                            height="11"
                            x="3"
                            y="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-500">Comming Soon</p>

                    <Button
                      disabled
                      className="w-full bg-gray-400 text-white cursor-not-allowed mt-4"
                    >
                      Locked
                    </Button>
                  </Card>
                )
              )}
          </div>
        </main>
      )}
    </div>
  );
}
