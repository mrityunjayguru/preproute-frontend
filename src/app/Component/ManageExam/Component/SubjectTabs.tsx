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
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar font-dm-sans px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10  pb-2 mt-2">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-6 py-2 rounded-[8px] text-md transition-all whitespace-nowrap ${t.sectionId === selectedSection?.sectionId
                  ? "bg-[#005EB6] text-white"
                  : "bg-blue-100 text-[#5291D2] "
                }`}
            >
              {t.sectionDetail?.section || "Section"}
            </button>
          ))}
        </div>
      )}
      <span className="h-6 bg-[#5291D2] font-dm-sans text-sm font-medium px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10  text-white" >
        Question No. {currentQuestionIndex + 1}
      </span>
    </>
  );
};

export default SubjectTabs;

