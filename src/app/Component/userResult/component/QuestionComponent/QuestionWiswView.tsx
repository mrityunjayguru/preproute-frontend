"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BlockMath } from "react-katex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createboockMark, getQuestionById } from "@/api/boockMark";
import Popup from "@/app/Component/ManageExam/Component/Report";
import { createReport } from "@/api/Users";
import RenderPreview from "@/Common/CommonLatex";

interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  questionNo: number;
  questionText: string;
  numericAnswer: any;
  questionType: string; // "MCQ" or "Numeric"
  answerType: string;
  options: Option[];
  userAttempted: Boolean;
  averageTime: any;
  usergiven?: {
    userAnswer: string;
    numericAnswer?: string;
    timeTaken?: number;
    passage: any;
  }[];
  correctAnswer: string;
  hint?: string;
  solution?: string;
  userAttempt?: boolean;
  topic?: string;
  subtopic?: string;
  difficulty?: string;
  avgTime?: string;
  subtopicdata: any;
  topicdata: any;
  questionPessage: any;
}

interface Props {
  question: Question;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  handleSectionQuestions: Question[];
  examResult: any;
  getQuestionByNumberId: (idx: number) => void;
}

const QuestionWiswView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  currentQuestionIndex,
  sectionQuestions,
  getQuestionByNumberId,
  examResult,
}) => {
  // Render HTML/LaTeX content
  const dispatch = useDispatch<AppDispatch>();

  if (!question) return <div className="p-4">Loading question...</div>;

  const userAns = question.usergiven?.[0];
  const isAttempted = question.userAttempted && !!userAns;

  let isCorrect = false;

  if (isAttempted) {
    if (question.answerType === "Numeric") {
      const correctValue =
        question.numericAnswer ?? Number(question.correctAnswer); // fallback if needed

      isCorrect = Number(userAns?.numericAnswer) === Number(correctValue);
    } else {
      const selectedOpt = question.options?.find(
        (opt) => opt._id === userAns?.userAnswer,
      );
      isCorrect = Boolean(selectedOpt?.isCorrect);
    }
  }

  // Determine Correct Answer Text
  let correctText: any;
  if (question.answerType === "Numeric") {
    correctText = question.correctAnswer;
  } else {
    const correctOpt = question.options?.find((opt) => opt.isCorrect);
    correctText = correctOpt ? correctOpt.text : question.correctAnswer;
  }

  // Time formatting
  const timeTaken = userAns?.timeTaken || 0;
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} Min ${s} Sec`;
  };
  const handlebookMark = async (val: any, BookmarkStatus: any) => {
    const payload: any = {
      questionId: val?._id,
      BookmarkStatus,
    };
    await dispatch(createboockMark(payload));
    await getData();
  };
  const [status, setStatus] = useState(false);

  const getData = async () => {
    const payload: any = {
      questionId: question?._id,
    };
    let responce: any = await dispatch(getQuestionById(payload));
    setStatus(responce.payload.data.status);
  };
  useEffect(() => {
    getData();
  }, [question]);
  const [reporttoggle, setReportToggle] = useState(false);
  const handlereport = () => {
    setReportToggle(true);
  };
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const handleSubmitReport = (val: any) => {
    const payload: any = {
      title: val,
      questionId: question?._id,
      userId: userLogin?._id,
    };
    dispatch(createReport(payload));
  };
  const formatSeconds = (seconds: number | string): string => {
    const totalSeconds = Number(seconds);

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      return "0 Min 0 Sec";
    }

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${mins} Min ${secs.toFixed()} Sec`;
  };

  return (
    <>
      <Popup
        isOpen={reporttoggle}
        onClose={() => setReportToggle(false)}
        onSubmit={handleSubmitReport}
        title="Report Question"
        question={question}
      />
      <div className="flex-1 mt-6 bg-white">
        {/* Status Bar */}
        <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-4 px-4 mb-6 font-poppins">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Answer Status */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Answer Status
              </p>

              {isAttempted ? (
                isCorrect ? (
                  <p className="text-xl font-medium text-[#84CC16]">Correct</p>
                ) : (
                  <p className="text-xl font-medium text-red-500">Wrong</p>
                )
              ) : (
                <p className="text-xl font-medium text-gray-400">Unattempted</p>
              )}
            </div>

            {/* Response Time */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Response Time
              </p>
              <p className="text-lg font-medium text-[#005EB6]">
                {formatTime(timeTaken)}
              </p>
            </div>

            {/* Average Time */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Average Time
              </p>
              <p className="text-lg font-medium text-[#005EB6]">
                {question?.averageTime
                  ? formatSeconds(question.averageTime)
                  : "1 Min 26 Sec"}
              </p>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Difficulty Level
              </p>
              <p className="text-lg font-medium text-[#005EB6]">
                {question?.questionType || "Easy"}
              </p>
            </div>
          </div>
        </div>

        {/* Topic Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#005EB6] text-lg font-medium font-dm-sans">
            <span className="text-[#000] text-sm">Topic:</span>{" "}
            {question?.topicdata?.topic || "Topic"} |{" "}
            <span className="text-sm text-[#000]">Subtopic:</span>{" "}
            {question?.subtopicdata?.subtopic || "Subtopic"}
          </h2>
          <div className="flex gap-2">
            {status ? (
              <Button
                onClick={() => handlebookMark(question, "remove")}
                variant="outline"
                className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] text-[#1E1E1E] font-normal font-poppins cursor-pointer"
              >
                Remove Bookmark
              </Button>
            ) : (
              <Button
                onClick={() => handlebookMark(question, "add")}
                variant="outline"
                className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] text-[#1E1E1E] font-normal font-poppins cursor-pointer"
              >
                Bookmark
              </Button>
            )}

            <Button
              onClick={handlereport}
              variant="outline"
              className="bg-gradient-to-t from-[#FFECDF] to-white border border-[#F0F9FF] font-normal font-poppins cursor-pointer"
            >
              Report
            </Button>
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-[#F0F9FF] p-6 rounded-[8px] mb-6">
          <p className="text-[#0056D2] font-medium font-dm-sans mb-3 text-sm">
            Question No. {question.questionNo}
          </p>
          <div className="preview text-gray-900 font-normal font-poppins leading-relaxed">
            {/* {RenderPreview(question.questionText)} */}
            <RenderPreview content={question.questionText} />
          </div>
          {question?.questionPessage == "Pass" ||
          question?.questionPessage == "pass" ? (
            <div className="mt-5">
              <RenderPreview content={question?.passage} />
            </div>
          ) : null}
        </div>

        <div
          className={`grid grid-cols-2 ${
            question.answerType === "Numeric" ? "" : "lg:grid-cols-1"
          } gap-6 w-full`}
        >
          {/* LEFT: Correct Answer */}
          <div className="">
            <p className="text-[#84CC16] font-medium font-dm-sans mb-2">
              Correct Answer
            </p>
            <div className="text-xl font-normal font-poppins text-gray-900">
              {/* {correctText} */}
              <RenderPreview content={correctText} />
            </div>
          </div>

          {/* RIGHT: User Answer */}
          <div className="w-full">
            {question.answerType === "Numeric" ? (
              /* ✅ keep your existing numeric UI */
              <div className="border border-gray-200 rounded-lg p-4 bg-white relative">
                <p className="text-[#0056D2] font-medium text-sm mb-1 font-dm-sans">
                  Input
                </p>
                <p className="text-lg text-gray-900">
                  {userAns?.numericAnswer || "-"}
                </p>
              </div>
            ) : (
              /* ✅ MCQ VIEW (like image) */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options?.map((opt, idx) => {
                  const isSelected = userAns?.userAnswer === opt._id;

                  return (
                    <div
                      key={opt._id || idx}
                      className="border border-gray-200 rounded-md p-3 bg-white relative"
                    >
                      <p className="text-[#2563EB] text-xs font-medium mb-1 font-dm-sans">
                        Option {idx + 1}
                      </p>

                      <p className="preview text-sm text-gray-800 font-poppins">
                        <RenderPreview content={opt.text} />
                        {/* {RenderPreview content(opt.text)} */}
                      </p>

                      {isSelected && (
                        <span className="absolute top-2 right-2 text-[#FF5959] text-xs font-medium font-dm-sans">
                          Answered
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Solution */}
        <div className="rounded-xl bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] p-6 mb-8 mt-5">
          <p className="text-[#0056D2] font-medium font-dm-sans mb-3">
            Solution
          </p>
          <div className="preview text-gray-800 font-normal leading-relaxed font-poppins">
            {/* {RenderPreview(
            question.solution || question.hint || "No solution provided."
          )} */}
            <RenderPreview
              content={
                question.solution || question.hint || "No solution provided."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
    
export default QuestionWiswView;
