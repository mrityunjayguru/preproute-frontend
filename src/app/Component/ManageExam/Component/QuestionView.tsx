"use client";
import React, { useMemo } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Input } from "react-select/animated";
import RenderPreview from "@/Common/CommonLatex";
import QuestionHeader from "./QuestionHeader";

interface Props {
  question: any;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  CurrentInput: any;
  selectedsection:any
}

const QuestionView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  selectedsection,
  currentQuestionIndex,
  CurrentInput,
}) => {
  return (
    <div className="bg-white rounded-lg flex-1">
      {question && (
        <QuestionHeader
          question={question}
          selectedsection={selectedsection}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}

      <div
        className={`w-full px-6 sm:px-8 md:px-12 lg:px-28 mt-3 font-poppins ${question?.questionPessage === "Pass"
            ? "flex gap-2 items-start "
            : "flex flex-col"
          }`}
      >
        {/* 🟩 Question Preview Section */}
        <div
          className={`${question?.questionPessage === "Pass"
              ? "w-1/2 overflow-y-auto border border-border h-[calc(100vh-380px)] p-3 rounded-lg"
              : "w-full"
            } question-preview leading-relaxed space-y-2`}
        >
          <RenderPreview content={question?.questionText} />
        </div>

        {/* 🟦 Current Input Section */}
        <div
          className={`${question?.questionPessage === "Pass"
              ? " border-gray-300 w-1/2 h-[calc(100vh-380px)] overflow-y-auto"
              : "w-full max-h-[calc(100vh-280px)] overflow-y-auto"
            } font-poppins`}
        >
          {question?.questionPessage === "Pass" ? (
            <div className="pb-3 mb-3 px-2 font-poppins">
              <p className="py-1">{question?.passage}</p>
            </div>
          ) : null}

          {CurrentInput}
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
