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
    <div className="bg-white rounded-lg flex-1">
      <div
        className={`w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 mt-3 h-[65vh]  overflow-y-auto font-poppins ${question?.questionPessage === "Pass"
          ? "flex gap-2 items-start "
          : "flex flex-col"
          }`}
      >
        {/* 🟩 Question Preview Section */}
        <div
          className={`${question?.questionPessage === "Pass"
            ? "w-1/2 overflow-y-auto border border-border h-[calc(118vh-380px)] p-2 rounded-lg"
            : "w-full"
            } question-preview leading-relaxed space-y-2 preview`}
        >
          <RenderPreview content={question?.questionText} />
        </div>

        {/* 🟦 Current Input Section */}
        <div
          className={`${question?.questionPessage === "Pass"
            ? " border-gray-300 w-1/2 h-[calc(118vh-380px)]"
            : "w-full max-h-[calc(100vh-280px)] "
            } font-poppins py-2`}
        >
          {question?.questionPessage === "Pass" ? (
            <div className="pb-2 mb-2 px-2 font-poppins">
              <p className="py-1">

                 <RenderPreview content={question?.passage} />
              </p>
            </div>
          ) : null}

          {CurrentInput}
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
