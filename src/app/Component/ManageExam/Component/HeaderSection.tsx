"use client";
import React from "react";

interface Props {
  isSection: boolean;
  examSections: any[];
  selectedSection: any;
  handleSection: (section: any) => void;
  timeLeft: any;
  formatTime: (seconds: number) => string
}

const HeaderSection: React.FC<Props> = ({
  isSection,
  examSections,
  selectedSection,
  handleSection,
  timeLeft,
  formatTime,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-3 border-b">
      {isSection && (
        <div className="flex flex-wrap gap-1 overflow-x-auto">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-5 py-2 rounded-sm border transition-all text-sm whitespace-nowrap ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-[#FF5635] text-white border-[#FF5635]"
                  : "bg-[#fff] text-[#1E1E1E] border-gray-300"
              }`}
            >
              {t.sectionDetail?.section || "Section"}
            </button>
          ))}
        </div>
      )}
      {timeLeft?(
         <div
        className={`font-bold mt-2 sm:mt-0 ${
          timeLeft < 60 ? "text-red-600" : "text-green-600"
        }`}
      >
        Time Left: {formatTime(timeLeft)}
      </div>
      ):(null)}
     
    </div>
  );
};

export default HeaderSection;
