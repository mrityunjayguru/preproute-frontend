"use client";
import { formatDateTime } from "@/Common/ComonDate";
import React, { useEffect } from "react";
import Image from "next/image";
import RANKING from "@/assets/vectors/ranking.svg";
import { capitalizeWords } from "@/Utils/Cappital";

interface Props {
  isSection: boolean;
  examSections: any[];
  selectedSection: any;
  handleSection: (section: any) => void;
  timeLeft: any;
  formatTime: (seconds: number) => string;
  data: any;
  examName?: string;
  attemptDate?: string;
  paperName: any;
}

const QuestionWiseHeader: React.FC<Props> = ({
  isSection,
  examSections,
  selectedSection,
  handleSection,
  data,
  examName,
  attemptDate,
  paperName,
}) => {

  /* ===========================
     AUTO SELECT FIRST SECTION
  ============================ */
  useEffect(() => {
    if (
      isSection &&
      examSections?.length > 0 &&
      !selectedSection?.sectionId
    ) {
      handleSection(examSections[0]);
    }
  }, [isSection, examSections, selectedSection, handleSection]);

  const formattedDate = attemptDate
    ? formatDateTime(attemptDate)
    : "Unknown Date";

  return (
    <div className=" pb-2 w-full space-y-6">
      {/* Top Row: Exam Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-normal font-poppins text-black">
            {examName || "Exam Name"}{" "}
            <span className="text-[#FF5959]">
              {capitalizeWords(paperName)}
            </span>
          </h2>

          <p className="text-sm text-gray-600 font-dm-sans">
            Attempted on {formatDateTime(data?.updatedAt)}
          </p>
        </div>
      </div>

      {/* Section Tabs */}
      {isSection && (
        <div className="flex  flex-wrap gap-3 overflow-x-auto  ">
          {examSections?.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-6 py-2 rounded-[8px] transition-all text-sm font-medium whitespace-nowrap font-dm-sans ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-[#005EB6] text-white"
                  : "bg-[#5291D2] text-white hover:bg-[#4a85f6]"
              }`}
            >
              {t.section || "Section"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionWiseHeader;
