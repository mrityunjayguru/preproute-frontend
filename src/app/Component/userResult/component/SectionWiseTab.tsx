import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface DifficultyWiseTabProps {
  data: any;
}

const SectionWiseTab: React.FC<DifficultyWiseTabProps> = ({ data }) => {
  const toicData = useSelector(
    (state: any) => state?.examType?.examDetail || []
  );
  console;
  return (
    <div className="overflow-x-auto ">
      {!data ? (
        <p className="text-center text-gray-500">No topic data found.</p>
      ) : (
        <div className="space-y-6">
          {data?.sectiondifculty.map((section: any) => (
            <div key={section.sectionId} className=" rounded-[8px] p-4">
              <h3 className="font-medium font-poppins text-[#005EB6] mb-3">
                Section: {section.sectionName}
              </h3>
              <div className="overflow-x-auto mt-4 border border-[#E6F4FF] rounded-[8px]">
                <table className="min-w-full bg-gradient-to-t from-[#F0F9FF] to-white text-sm text-left">
                  <thead className="bg-[#005EB6] text-white">
                    <tr className="font-poppins  font-medium text-sm">
                      <th className="p-2">Difficulty</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Attempted</th>
                      <th className="p-2">Correct</th>
                      <th className="p-2">Wrong</th>
                      <th className="p-2">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.difficulties.map((d: any) => (
                      <tr
                        key={d.difficulty}
                        className="bg-gray-50 font-normal text-sm font-poppins border-t"
                      >
                        <td className="p-2">{d.difficulty}</td>
                        <td className="p-2">{d.total}</td>
                        <td className="p-2">{d.attempted}</td>
                        <td className="p-2 text-green-600">{d.correct}</td>
                        <td className="p-2 text-red-500">{d.wrong}</td>
                        <td className="p-2">{d.accuracy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionWiseTab;
