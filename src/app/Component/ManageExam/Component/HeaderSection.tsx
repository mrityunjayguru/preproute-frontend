"use client";
import { capitalizeWords } from "@/Utils/Cappital";
import React from "react";

interface Props {
  timeLeft: any;
  formatTime: (seconds: number) => string;
  examName?: string;
  paperName?: string;
}

const HeaderSection: React.FC<Props> = ({
  timeLeft,
  formatTime,
  examName,
  paperName,
}) => {
  return (
    <div className="bg-white  border-b-[0.1px]">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2mb-3 font-poppins">
        {/* Exam Title */}
        <div className="flex items-center">
          <h1 className="text-lg font-normal text-gray-800 text-center md:text-left">
            {examName || "IPMAT-Indore"}{" "}
            <span className="text-orange-500">{capitalizeWords(paperName) || "Mock One"}</span>
          </h1>
        </div>
        <div />
        <div>

          {/* Timer */}
          {timeLeft ? (
            <div className="text-base md:text-lg lg:mr-18 font-normal font-poppins md:mr-[0]">
              Time Left :{" "}
              <span className="text-lg font-semibold text-blue-600">
                {formatTime(timeLeft)}
              </span>
            </div>
          ) : null}
        </div>
        <div />
      </div>
    </div>
  );
};

export default HeaderSection;
