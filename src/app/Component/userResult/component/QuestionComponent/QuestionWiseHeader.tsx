"use client";
import { formatDateTime } from "@/Common/ComonDate";
import React from "react";
import { CheckCircle2, XCircle, Trophy, Clock } from "lucide-react"; // icons

interface Props {
  isSection: boolean;
  examSections: any[];
  selectedSection: any;
  handleSection: (section: any) => void;
  timeLeft: any;
  formatTime: (seconds: number) => string;
  data: any;
}

const QuestionWiseHeader: React.FC<Props> = ({
  isSection,
  examSections,
  selectedSection,
  handleSection,
  timeLeft,
  formatTime,
  data,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white ">
      {/* ---- Section Tabs ---- */}
      {isSection && (
        <div className="flex flex-wrap gap-3 overflow-x-auto">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-10 py-2 rounded-[8px] transition-all text-md font-medium whitespace-nowrap font-dm-sans ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-[#005EB6] text-white "
                  : "bg-[#5291D2] text-white hover:bg-[#4a85f6]"
              }`}
            >
              {t.section || "Section"}
            </button>
          ))}
        </div>
      )}

      {/* Result Summary - Hidden to match screenshot */}
      {/* <div className="flex items-center gap-6 text-sm text-gray-700">
        {data?.fullExamEndTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{formatDateTime(data.fullExamEndTime)}</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{data?.correct ?? 0}</span>
        </div>

        <div className="flex items-center gap-1 text-red-500 font-medium">
          <XCircle className="w-4 h-4" />
          <span>{data?.wrong ?? 0}</span>
        </div>

        <div className="flex items-center gap-1 text-yellow-600 font-medium">
          <Trophy className="w-4 h-4" />
          <span>{data?.totalMarks ?? 0}</span>
        </div>
      </div> */}
    </div>
  );
};

export default QuestionWiseHeader;
