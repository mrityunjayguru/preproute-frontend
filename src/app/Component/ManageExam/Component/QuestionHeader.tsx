"use client";
import React from "react";

interface Props {
  question: any;
  currentQuestionIndex: number;
  selectedsection:any
}

const QuestionHeader: React.FC<Props> = ({ question, currentQuestionIndex,selectedsection }) => {
  return (
    <div className="flex items-center justify-between px-6 border-b sm:px-8 md:px-12 lg:px-28 py-3 font-dm-sans">
      <div className="text-sm font-medium text-[#005EB6]">
        Question No. {currentQuestionIndex + 1}
      </div>

      <div className="text-sm">
        <span className="mr-4">
        Marks for Correct Answer :
          <span className="text-[#005EB6] ml-1">
            {selectedsection?.correctMark }
          </span>
        </span>
        <span>
        Negative Marks :
          <span className="text-red-500 ml-1">
            {selectedsection?.negativeMarks || 0}
          </span>
        </span>
      </div>
    </div>
  );
};

export default QuestionHeader;

