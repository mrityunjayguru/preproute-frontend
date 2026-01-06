"use client";

import React, { useState } from "react";
import { BlockMath } from "react-katex";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";

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
}

/* ================= COMPONENT ================= */

const QuestionWiswView: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showOptions, setShowOptions] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

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

  /* ================= UI ================= */

  return (
    <div className="bg-white p-6 rounded-xl mb-6 border border-[#E6F4FF]">

      {/* Question */}
      <div className="bg-[#F0F9FF] p-4 rounded-lg mb-4">
        <p className="text-[#0056D2] font-medium mb-2">
          Question No. {question.questionNo}
        </p>
        <div className="text-gray-900">
          {renderPreview(question.questionText)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1 text-sm text-[#0056D2] font-medium"
          >
            Options {showOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1 text-sm text-[#0056D2] font-medium"
          >
            Solution {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <Button
          onClick={handleBookmark}
          variant="outline"
          className="text-sm"
        >
          Bookmark
        </Button>
      </div>

      {/* Correct Answer */}
      <div className="mb-4">
        <p className="text-[#84CC16] font-medium mb-1">Correct Answer</p>
        <div className="text-gray-900">{correctText}</div>
      </div>

      {/* OPTIONS */}
      {showOptions && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {question.options?.map((opt, idx) => {
            const isSelected = userAns?.userAnswer === opt._id;

            return (
              <div
                key={opt._id}
                className="border border-gray-200 rounded-md p-3 bg-white relative"
              >
                <p className="text-[#2563EB] text-xs font-medium mb-1">
                  Option {idx + 1}
                </p>

                <div className="text-sm text-gray-800">
                  {renderPreview(opt.text)}
                </div>

                {isSelected && (
                  <span className="absolute top-2 right-2 text-xs text-red-500 font-medium">
                    Answered
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SOLUTION */}
      {showSolution && (
        <div className="rounded-lg bg-[#F0F9FF] border border-[#E6F4FF] p-4">
          <p className="text-[#0056D2] font-medium mb-2">Solution</p>
          <div className="text-gray-800">
            {renderPreview(
              question.solution || question.hint || "No solution provided."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionWiswView;
