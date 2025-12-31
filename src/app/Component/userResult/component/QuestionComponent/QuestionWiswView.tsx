"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useRef } from "react";
import { BlockMath } from "react-katex";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  }[];
  correctAnswer: string;
  hint?: string;
  solution?: string; // Check if solution exists
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to scroll navigator
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  // Render HTML/LaTeX content
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

  // Determine Answered Text
  let answeredText: React.ReactNode = "-";
  if (question.usergiven && question.usergiven.length > 0) {
    const userAns = question.usergiven[0];
    if (question.answerType === "Numeric") {
      answeredText = userAns.numericAnswer || "-";
    } else {
      const selectedOpt = question.options?.find(
        (opt) => opt._id === userAns.userAnswer
      );
      answeredText = selectedOpt ? renderPreview(selectedOpt.text) : "-";
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

  return (
    <div className="flex-1 mt-6 bg-white">
      {/* Navigator */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-3 font-normal font-poppins">
          Choose an option
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-[#005EB6] hover:bg-[#0044a5] text-white border-none h-9 w-9 rounded-md cursor-pointer shrink-0"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={16} className="text-white" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1 w-full sm:w-[80%] lg:w-[100%] max-w-[820px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sectionQuestions.map((q, idx) => (
              <button
                key={q._id || idx}
                onClick={() => getQuestionByNumberId(idx)}
                className={`flex items-center justify-center min-w-[40px] h-10 rounded-md font-medium font-poppins text-xs transition-colors border ${
                  q.questionNo === question.questionNo
                    ? "bg-gradient-to-t from-[#FFECDF] to-white border border-[#E6F4FF]"
                    : "bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] "
                }`}
              >
                {q.questionNo}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="bg-[#0056D2] hover:bg-[#0044a5] text-white border-none h-9 w-9 rounded-md cursor-pointer shrink-0"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={16} className="text-white" />
          </Button>
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-[#F0F9FF] p-6 rounded-[8px] mb-8">
        <p className="text-[#0056D2] font-medium font-dm-sans mb-3">
          Question No. {question.questionNo}
        </p>
        <div className="text-gray-900 font-normal font-poppins leading-relaxed">
          {renderPreview(question.questionText)}
        </div>
      </div>

      {/* Answers Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pb-8 ">
        <div>
          <p className="text-[#0056D2] font-medium font-dm-sans mb-2">
            Answered
          </p>
          <div className="text-2xl font-normal font-poppins text-gray-900">
            {answeredText}
          </div>
        </div>
        <div>
          <p className="text-[#84CC16] font-medium font-dm-sans mb-2">
            Correct Answer
          </p>
          <div className="text-2xl font-normal font-poppins text-gray-900">
            {correctText}
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="rounded-xl bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] p-6">
        <p className="text-[#0056D2] font-medium font-dm-sans mb-3">
          Solution
        </p>
        <div className="text-gray-800 font-normal leading-relaxed font-poppins">
          {renderPreview(
            question.hint || question.solution || "No solution provided."
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWiswView;
