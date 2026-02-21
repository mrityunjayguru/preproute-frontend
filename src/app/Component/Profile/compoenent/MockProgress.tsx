import React from "react";
import { useSelector } from "react-redux";

function MockProgress() {
  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard,
  );
const completed = userdashboarddata?.summary?.attempted || 0;
const total = userdashboarddata?.summary?.completed || 0;

// Prevent divide by zero
const percentage = total > 0 ? (completed / total) * 100 : 0;

// Circle calculation
const radius = 54;
const circumference = 2 * Math.PI * radius;

const strokeDashoffset =
  circumference - (percentage / 100) * circumference;

  return (
    <div className="flex justify-between items-center h-full">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-[#FF5635] mb-6">
          Mocks Progress
        </h3>
        <div className="flex items-end gap-2">
          <div className="text-5xl font-medium text-[#FF5635]">{userdashboarddata?.summary?.attempted|| 0}</div>
          <div className="text-gray-900 font-medium font-dm-sans">Attempted</div>
        </div>
        {/* <div className="text-gray-500 font-medium font-dm-sans">/ Out of {userdashboarddata?.summary?.attempted} Exams</div> */}
      </div>
   <div className="font-poppins relative w-32 h-32">
  <svg className="w-full h-full transform -rotate-90">
    {/* Background Circle */}
    <circle
      cx="64"
      cy="64"
      r={radius}
      stroke="#D7E3FF"
      strokeWidth="12"
      fill="transparent"
    />

    {/* Progress Circle */}
    <circle
      cx="64"
      cy="64"
      r={radius}
      stroke="#FF5635"
      strokeWidth="12"
      fill="transparent"
      strokeDasharray={strokeDashoffset}
      strokeDashoffset={circumference}
      strokeLinecap="round"
      className="transition-all duration-500 ease-in-out"
    />
  </svg>

  {/* Center Text */}
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <span className="text-2xl font-bold text-gray-800">
      {percentage.toFixed(0)}%
    </span>
    <span className="text-[10px] text-gray-500 uppercase font-bold font-dm-sans tracking-wide">
      Completed
    </span>
  </div>
</div>

    </div>
  );
}

export default MockProgress;
