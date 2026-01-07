import React from "react";
import { useSelector } from "react-redux";

interface DifficultyWiseTabProps {
  data: any;
}

const SectionWiseTab: React.FC<DifficultyWiseTabProps> = ({ data }) => {
  const examDetail = useSelector(
    (state: any) => state?.examType?.examDetail || []
  );

  if (!data?.sectiondifculty?.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No section difficulty data found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {data.sectiondifculty.map((section: any, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden border border-[#E6F4FF]"
        >
          {/* 🔹 Header */}
          <div className="bg-[#005EB6] text-white flex">
            <div className="p-4 w-1/4 min-w-[200px] text-lg font-poppins">
              {section.sectionName}
            </div>
            <div className="flex-1 flex">
              {section.difficulties.map((d: any, i: number) => (
                <div key={i} className="flex-1 p-4 text-center text-sm">
                  {d.difficulty}
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Number of Questions */}
          <div className="flex border-b">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              Number of Questions
            </div>
            <div className="flex-1 flex">
              {section.difficulties.map((d: any, i: number) => (
                <div key={i} className="flex-1 p-4 text-center">
                  {d.total}
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Correct | Wrong | Attempted */}
          <div className="flex border-b bg-[#F9FBFC]">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              Correct | Wrong | Attempted
            </div>
            <div className="flex-1 flex text-sm">
              {section.difficulties.map((d: any, i: number) => (
                <div key={i} className="flex-1 p-4 text-center">
                  <span className="text-green-600">{d.correct}</span> |{" "}
                  <span className="text-red-500">{d.wrong}</span> |{" "}
                  <span>{d.attempted}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Accuracy */}
          <div className="flex">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins text-[#005EB6]">
              Accuracy
            </div>
            <div className="flex-1 flex text-[#005EB6]">
              {section.difficulties.map((d: any, i: number) => (
                <div key={i} className="flex-1 p-4 text-center">
                  {d.accuracy}%
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWiseTab;
