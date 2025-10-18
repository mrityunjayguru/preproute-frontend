"use client";
import React from "react";
import LatexForSoluction from "../LatexForSoluction";

interface Props {
  totalQuestions: number;
  questionNumbers: number[];
  activeQuestion: number;
  handleActiveQuestion: (val: number) => void;
  hintText: string;
  setHintText: (val: string) => void;
}

const SidebarSection: React.FC<Props> = ({
  questionNumbers,
  activeQuestion,
  handleActiveQuestion,
  hintText,
  setHintText,
}) => (
  <div className="lg:col-span-1 space-y-6">
    {/* Question Navigation */}
    <div className="rounded-xl bg-white shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Go to Question No.</h3>
      <div className="grid grid-cols-5 gap-3">
        {questionNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handleActiveQuestion(num)}
            className={`h-10 w-10 rounded-full font-bold transition-colors ${
              num === activeQuestion ? "bg-red-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>

    {/* Hint / Solution */}
    <div className="rounded-xl bg-white shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Solution</h3>
      <LatexForSoluction value={hintText} onChange={setHintText} />
    </div>
  </div>
);

export default SidebarSection;
