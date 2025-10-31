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
    console.log(data,"datadatadata")
  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-3 border-b shadow-sm">
      {/* ---- Section Tabs ---- */}
      {isSection && (
        <div className="flex flex-wrap gap-1 overflow-x-auto">
          {examSections.map((t) => (
            <button
              key={t.sectionId}
              onClick={() => handleSection(t)}
              className={`cursor-pointer px-5 py-2 rounded-sm border transition-all text-sm whitespace-nowrap ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-[#FF5635] text-white border-[#FF5635]"
                  : "bg-white text-[#1E1E1E] border-gray-300 hover:bg-gray-100"
              }`}
            >
              {t.sectionDetail?.section || "Section"}
            </button>
          ))}
        </div>
      )}

      {/* ---- Result Summary ---- */}
      <div className="flex items-center gap-6 text-sm text-gray-700">
        {/* Exam End Time */}
        {data?.fullExamEndTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{formatDateTime(data.fullExamEndTime)}</span>
          </div>
        )}

        {/* Correct */}
        <div className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{data?.correct ?? 0}</span>
        </div>

        {/* Wrong */}
        <div className="flex items-center gap-1 text-red-500 font-medium">
          <XCircle className="w-4 h-4" />
          <span>{data?.wrong ?? 0}</span>
        </div>

        {/* Total Marks */}
        <div className="flex items-center gap-1 text-yellow-600 font-medium">
          <Trophy className="w-4 h-4" />
          <span>{data?.totalMarks ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionWiseHeader;
