import React from "react";
import { useSelector } from "react-redux";

function MockProgress() {
  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard,
  );
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-[#FF5635] mb-6">
          Mocks Progress
        </h3>
        <div className="text-5xl font-medium text-[#FF5635]">{userdashboarddata?.summary?.attempted || 0}</div>
        <div className="text-gray-900 font-medium font-dm-sans">Attempted</div>
      </div>
      <div className="font-poppins relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke="#FF5635"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={339.292}
            strokeDashoffset={339.292 * (1 - 0.3)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{userdashboarddata?.summary?.completed}%</span>
          <span className="text-[10px] text-gray-500 uppercase font-bold font-dm-sans tracking-wide">
            Completed
          </span>
        </div>
      </div>
    </div>
  );
}

export default MockProgress;
