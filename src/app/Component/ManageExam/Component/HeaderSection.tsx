"use client";
import { capitalizeWords } from "@/Utils/Cappital";
import React from "react";

interface Props {
  timeLeft: any;
  formatTime: (seconds: number) => string;
  examName?: string;
  paperName?: string;
  examData: any
}

const HeaderSection: React.FC<Props> = ({
  timeLeft,
  formatTime,
  examName,
  paperName,
  examData,
}) => {
  console.log(examData[0]?.exam?.subjectName, "examDataexamData")
  return (
    <div className="bg-white  border-b-[0.1px]">
      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 lg:py-2 lg:mb-3 font-poppins">
        {/* Exam Title */}
        <div className="flex items-center text-center md:text-left">
          <h1 className="text-md sm:text-lg font-normal text-gray-800">
            {examName || "IPMAT-Indore"}{" "} {examData[0]?.exam?.subjectName} {" "}
            <span className="text-orange-500">{capitalizeWords(paperName) || "Mock One"}</span>
          </h1>
        </div>

        {/* Timer */}
        {timeLeft ? (
          <div className="text-sm sm:text-base md:text-lg font-normal font-poppins lg:mr-18">
            Time Left :{" "}
            <span className="text-md sm:text-lg font-semibold text-blue-600">
              {formatTime(timeLeft)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderSection;
