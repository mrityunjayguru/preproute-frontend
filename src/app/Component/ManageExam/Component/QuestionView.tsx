"use client";
import React, { useMemo } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Input } from "react-select/animated";
import RenderPreview from "@/Common/CommonLatex";

interface Props {
  question: any;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  CurrentInput: any;
}

const QuestionView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  currentQuestionIndex,
  CurrentInput,
}) => {
 
  return (
    <div className="bg-white p-4 rounded-lg flex-1">
      <p className="text-sm font-bold bg-[#F7F7F5] p-2 rounded mb-2">
        {examName} – {paperName}
      </p>

      <p className="font-bold text-lg mb-4">
        Question: {currentQuestionIndex + 1}
      </p>

<div
  className={`w-full ${
    question?.questionPessage === "Pass"
      ? "flex gap-2 items-start"
      : "flex flex-col"
  }`}
>
  {/* 🟩 Question Preview Section */}
  <div
    className={`${
      question?.questionPessage === "Pass" ? "w-[65%]" : "w-full"
    } question-preview leading-relaxed space-y-2`}
  >
      <RenderPreview content={question?.questionText} />

  </div>

  {/* 🟦 Current Input Section */}
<div
  className={`${
    question?.questionPessage === "Pass" ? "w-[35%] border-gray-300" : "w-full"
  }`}
>
  {question?.questionPessage === "Pass" ? (
    <div className="pb-3 mb-3 border-b border-gray-300">
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
