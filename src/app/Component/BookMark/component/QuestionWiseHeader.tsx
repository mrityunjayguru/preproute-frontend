"use client";
import { formatDateTime } from "@/Common/ComonDate";
import React from "react";
import { Trophy } from "lucide-react";
import Image from "next/image";
import RANKING from "@/assets/vectors/ranking.svg";


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
}

const QuestionWiseHeader: React.FC<Props> = ({
  isSection,
  examSections,
  selectedSection,
  handleSection,
  data,
  examName,
  attemptDate,
}) => {
  // Format date if string
  const formattedDate = attemptDate ? formatDateTime(attemptDate) : "Unknown Date";

  return (
    <div className=" pb-2 w-full space-y-6">
      {/* Top Row: Exam Info & Rank */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* Left: Exam Name & Date */}
        <div>
           <h2 className="text-2xl font-normal font-poppins text-black">
            {examName || "Exam Name"} <span className="text-[#FF5959]">Mock One</span>
          </h2>
          <p className="text-sm text-gray-600 font-dm-sans">
            Attempted on {formatDateTime(data?.updatedAt)}
          </p>
        </div>

        {/* Right: Rank Card */}
         {/* <div className="w-full md:w-[220px] rounded-[8px] bg-gradient-to-t from-[#FFECDF] to-white drop-shadow-xs p-4 flex items-center justify-between">
          <div>
             <p className="text-sm font-medium font-poppins text-gray-900">
              My Rank
            </p>
           <p className="text-2xl font-normal font-dm-sans text-[#FF5635]">
                {data?.rank || 25}
              
              <span className="text-gray-800 text-lg font-normal">
                / {data?.totalStudents || 1525}
                </span>
              </p>
          </div>
          <div className="w-7 h-7 rounded-full   text-[#FF5635] text-sm">
            <Image src={RANKING} alt="ranking" width={24} height={24} />
          </div>
        </div> */}
      </div>

      {/* Section Tabs */}
      {isSection && (
        <div className="flex flex-wrap gap-3 overflow-x-auto  ">
          {examSections.map((t) => (
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
