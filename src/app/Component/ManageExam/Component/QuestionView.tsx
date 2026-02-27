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
  selectedsection: any
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
    <div className="bg-white rounded-lg flex-1 min-h-0 flex flex-col">
      <div
        className={`w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 mt-3 flex-1 lg:h-[65vh] overflow-y-auto font-poppins ${question?.questionPessage === "Pass"
          ? "flex flex-col lg:flex-row gap-4 lg:gap-2 items-start"
          : "flex flex-col"
          }`}
      >
        {/* 🟩 Question Preview Section */}
        <div
          className={`${question?.questionPessage === "Pass"
            ? "w-full lg:w-1/2 overflow-y-auto border border-border h-[40vh] lg:h-[calc(118vh-380px)] p-4 rounded-lg bg-gray-50"
            : "w-full"
            } question-preview leading-relaxed space-y-2 preview`}
        >
          <RenderPreview content={question?.questionText} />
        </div>

        {/* 🟦 Current Input Section/Passage Content */}
        <div
          className={`${question?.questionPessage === "Pass"
            ? "border-gray-200 w-full lg:w-1/2 min-h-[30vh] lg:h-[calc(118vh-380px)] overflow-y-auto lg:border-l lg:pl-4"
            : "w-full min-h-[40vh] lg:max-h-[calc(100vh-280px)]"
            } font-poppins py-2`}
        >
          {question?.questionPessage === "Pass" ? (
            <div className="pb-4 mb-4 border-b border-gray-100 font-poppins italic text-gray-700">
              <p className="py-1">
                <RenderPreview content={question?.passage} />
              </p>
            </div>
          ) : null}

          <div className="mt-4 pb-24">
            {CurrentInput}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
