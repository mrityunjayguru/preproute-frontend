"use client";
import React from "react";
import QuestionHeader from "./QuestionHeader";

interface SectionDetail {
  _id: string;
  section: string;
}

interface Section {
  sectionId: string;
  sectionDetail: SectionDetail;
  noOfQuestions: number;
  duration?: number;
}

interface Props {
  isSection: boolean;
  examSections: Section[];
  selectedSection: Section | null;
  handleSection: (section: Section) => void;
  question?: any;
  currentQuestionIndex?: number;
}

const SubjectTabs: React.FC<Props> = ({
  isSection,
  examSections,
  selectedSection,
  handleSection,
  question,
  currentQuestionIndex = 0,
}) => {
  return (
    <>
      {isSection && examSections.length > 0 && (
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar font-dm-sans px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 lg:py-0 mt-2 lg:pb-2 bg-gray-50 border-y lg:bg-transparent lg:border-none">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-4 lg:px-6 py-2 rounded-[8px] text-sm lg:text-md transition-all whitespace-nowrap shadow-sm ${t.sectionId === selectedSection?.sectionId
                ? "bg-[#005EB6] text-white"
                : "bg-white text-[#5291D2] border border-blue-100 hover:bg-blue-50"
                }`}
            >
              {t.sectionDetail?.section || "Section"}
            </button>
          ))}
        </div>
      )}
      <div className="bg-[#5291D2] py-1">
        <span className="font-dm-sans text-xs sm:text-sm font-medium px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-white block">
          Question No. {currentQuestionIndex + 1}
        </span>
      </div>
    </>
  );
};

export default SubjectTabs;

