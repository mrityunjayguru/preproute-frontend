"use client";

import React, { useState } from "react";
import { BlockMath } from "react-katex";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";
import { formatDateTime } from "@/Common/ComonDate";

/* ================= TYPES ================= */

interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  questionNo: number;
  questionText: string;
  answerType: string;
  options: Option[];
  usergiven?: {
    userAnswer: string;
    numericAnswer?: string;
    timeTaken?: number;
  }[];
  correctAnswer: string;
  solution?: string;
  hint?: string;
  userAttempt?: boolean;
}

interface Props {
  question: Question;
  examName?: string;
  attemptDate?: string;
  paperName?: string;
}

/* ================= COMPONENT ================= */

const QuestionWiswView: React.FC<Props> = ({ question, examName, attemptDate, paperName }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isExpanded, setIsExpanded] = useState(false);

  // Format date if string
  const formattedDate = attemptDate ? formatDateTime(attemptDate) : "Unknown Date";

  /* ---------- Render HTML + LaTeX ---------- */
  const renderPreview = (content: string) => {
    if (!content) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).classList.contains("latex-span")
      ) {
        const rawTex = (node as HTMLElement).dataset.tex || "";
        return <BlockMath key={i} math={rawTex} />;
      }

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

      if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }

      return null;
    });
  };

  if (!question) return null;

  const userAns = question.usergiven?.[0];

  /* ---------- Correct Answer ---------- */
  const correctOpt = question.options?.find((o) => o.isCorrect);
  const correctText =
    question.answerType === "Numeric"
      ? question.correctAnswer
      : correctOpt
        ? renderPreview(correctOpt.text)
        : "-";

  /* ---------- Bookmark ---------- */
  const handleBookmark = async () => {
    await dispatch(createboockMark({ questionId: question._id }));
  };

  // Check if question has options
  const hasOptions = question.options && question.options.length > 0;

  /* ================= UI ================= */

  return (
    <div className="bg-white rounded-lg mb-4 ">
      {/* Header - Always Visible */}
      <div
        className="bg-[#E8F4F8] px-4 py-3 cursor-pointer rounded-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between font-dm-sans" >
          <div className="flex-1">
            {/* Question Number and Exam Info */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#0056D2] font-medium text-md">
                Question No. {question.questionNo}
              </span>
              {examName && (
                <>
                  <span className="text-gray-600">|</span>
                  <span className="text-[#FF5733] font-normal text-md">
                    {examName}
                    {paperName && ` ${paperName}`}
                  </span>
                  {attemptDate && (
                    <span className="text-gray-900 font-normal text-md ml-1">
                      (Attempted on {formattedDate})
                    </span>
                  )}
                </>
              )}
            </div>
            {/* Question Text in Header */}
            <div className="text-gray-900 text-base font-normal">
              {renderPreview(question.questionText)}
            </div>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp size={40} className="text-[#FF5635]" />
            ) : (
              <ChevronDown size={40} className="text-[#FF5635]" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="py-4 space-y-4">
          {/* Correct Answer with Bookmark */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-[#94C740] font-medium mb-2 text-md font-dm-sans">Correct Answer</p>
              <div className="text-gray-900 font-poppins">
                {correctText}
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark();
              }}
              variant="outline"
              className="text-md font-poppins cursor-pointer text-[#1E1E1E] font-normal rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF]"
            >
              Remove Bookmark
            </Button>
          </div>

          {/* OPTIONS - Only show if question has options */}
          {hasOptions && (
            <div className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options?.map((opt, idx) => {
                  const isSelected = userAns?.userAnswer === opt._id;
                  const isCorrect = opt.isCorrect;

                  return (
                    <div
                      key={opt._id}
                      className={`border rounded-lg p-4 relative ${isSelected
                          ? "bg-orange-50 border-orange-200"
                          : "bg-white border-gray-200"
                        }`}
                    >
                      <div className="text-gray-800 text-sm font-poppins">
                        {renderPreview(opt.text)}
                      </div>
                      {isSelected && (
                        <span className="absolute top-2 right-2 text-xs text-[#FF5635] font-medium font-poppins">
                          Answered
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SOLUTION - Always show */}
          <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] p-4 max-w-4xl">
            <p className="text-[#005EB6] font-medium mb-2 font-dm-sans" >Solution</p>
            <div className="text-gray-800 font-poppins">
              {question.solution || question.hint ? (
                renderPreview(question.solution || question.hint || "")
              ) : (
                <span>No solution provided.</span>
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default QuestionWiswView;
