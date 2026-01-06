"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useRef } from "react";
import { BlockMath } from "react-katex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";

interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  questionNo: number;
  questionText: string;
  questionType: string; // "MCQ" or "Numeric"
  answerType: string;
  options: Option[];
  usergiven?: {
    userAnswer: string;
    numericAnswer?: string;
    timeTaken?: number;
  }[];
  correctAnswer: string;
  hint?: string;
  solution?: string;
  userAttempt?: boolean;
  topic?: string;
  subtopic?: string;
  difficulty?: string;
  avgTime?: string;
}

interface Props {
  question: Question;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  sectionQuestions: Question[];
  getQuestionByNumberId: (idx: number) => void;
}

const QuestionWiswView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  currentQuestionIndex,
  sectionQuestions,
  getQuestionByNumberId,
}) => {
  // Render HTML/LaTeX content
  const dispatch=useDispatch<AppDispatch>()
  const renderPreview = (content: string) => {
    if (!content) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      // LaTeX span
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).classList.contains("latex-span")
      ) {
        const rawTex = (node as HTMLElement).dataset.tex || "";
        const decodedTex = new DOMParser().parseFromString(rawTex, "text/html")
          .documentElement.textContent;
        return <BlockMath key={i} math={decodedTex || ""} />;
      }

      // Other HTML elements
      if (node.nodeType === 1) {
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: (node as HTMLElement).outerHTML,
            }}
          />
        );
      }

      // Text nodes
      if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }

      return null;
    });
  };

  if (!question) return <div className="p-4">Loading question...</div>;

  const userAns = question.usergiven?.[0];
  const isAttempted = question.userAttempt && !!userAns;

  // Determine Correctness
  let isCorrect = false;
  if (isAttempted) {
    if (question.answerType === "Numeric") {
      isCorrect = userAns?.numericAnswer == question.correctAnswer;
    } else {
      const selectedOpt = question.options?.find(
        (opt) => opt._id === userAns?.userAnswer
      );
      isCorrect = selectedOpt?.isCorrect || false;
    }
  }

  // Determine Correct Answer Text
  let correctText: React.ReactNode = "-";
  if (question.answerType === "Numeric") {
    correctText = question.correctAnswer;
  } else {
    const correctOpt = question.options?.find((opt) => opt.isCorrect);
    correctText = correctOpt
      ? renderPreview(correctOpt.text)
      : renderPreview(question.correctAnswer);
  }

  // Time formatting
  const timeTaken = userAns?.timeTaken || 0;
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} Min ${s} Sec`;
  };
const handlebookMark=async(val:any)=>{
const payload:any={
  questionId:val?._id
}
await dispatch(createboockMark(payload))
}
  return (
    <div className="flex-1 mt-6 bg-white">
      {/* Status Bar */}
      <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-2 flex flex-wrap gap-36 items-start mb-6 font-poppins">
        <div>
          <p className="text-xs font-medium text-black mb-1">Answer Status</p>
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

        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">
            Response Time
          </p>
          <p className="text-lg font-medium text-[#005EB6]">
            {formatTime(timeTaken)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Average Time</p>
          <p className="text-lg font-medium text-[#005EB6]">
            {question.avgTime || "1 Min 26 Sec"}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">
            Difficulty Level
          </p>
          <p className="text-lg font-medium text-[#005EB6]">
            {question.difficulty || "Easy"}
          </p>
        </div>
      </div>

      {/* Topic Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#005EB6] text-lg font-medium font-dm-sans">
          {question.topic || "Topic"} | {question.subtopic || "Subtopic"}
        </h2>
        <div className="flex gap-2">
          <Button onClick={()=>handlebookMark(question)}
            variant="outline"
            className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] text-[#1E1E1E] font-normal font-poppins cursor-pointer"
          >
            Bookmark
          </Button>
          <Button
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
        <div className="text-gray-900 font-normal font-poppins leading-relaxed">
          {renderPreview(question.questionText)}
        </div>
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
            {correctText}
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

                    <p className="text-sm text-gray-800 font-poppins">
                      {renderPreview(opt.text)}
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
        <p className="text-[#0056D2] font-medium font-dm-sans mb-3">Solution</p>
        <div className="text-gray-800 font-normal leading-relaxed font-poppins">
          {renderPreview(
            question.solution || question.hint || "No solution provided."
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWiswView;
