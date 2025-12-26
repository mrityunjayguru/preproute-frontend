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
        <div className="flex gap-2 items-center font-dm-sans px-6 sm:px-8 md:px-12 lg:px-28 pb-3 mt-3">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-6 py-2 rounded-[8px] text-md transition-all whitespace-nowrap ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-[#005EB6] text-white"
                  : "bg-blue-100 text-[#5291D2] "
              }`}
            >
              {t.sectionDetail?.section || "Section"}
            </button>
          ))}
        </div>
      )}
      <hr className="h-6 bg-[#5291D2] text-[#5291D2]" />
    </>
  );
};

export default SubjectTabs;

