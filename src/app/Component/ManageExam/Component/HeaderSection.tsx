"use client";
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
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-28 mb-3 font-poppins">
        {/* Exam Title */}
        <div className="flex items-center">
          <h1 className="text-lg font-normal text-gray-800">
            {examName || "IPMAT-Indore"}{" "}
            <span className="text-orange-500">{paperName || "Mock One"}</span>
          </h1>
        </div>

        {/* Timer */}
        {timeLeft ? (
          <div className="text-lg font-normal font-poppins ">
            Time Left :{" "}
            <span className="text-lg font-semibold text-blue-600">
              {formatTime(timeLeft)}
            </span>
          </div>
        ) : null}
        <div></div>
      </div>
    </div>
  );
};

export default HeaderSection;
