import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface DifficultyWiseTabProps {
  data: any;
}

const SectionWiseTab: React.FC<DifficultyWiseTabProps> = ({ data }) => {
  const toicData = useSelector((state: any) => state?.examType?.examDetail || []);
  console
  return (
    <div>
      {/* <h2 className="text-lg font-semibold mb-4">Section-wise Difficulty Stats</h2> */}

      {data?.sectiondifculty.length === 0 ? (
        <p className="text-center text-gray-500"></p>
      ) : (
        <div className="space-y-6">
          {data?.sectiondifculty.map((section: any) => (
            <div
              key={section.sectionId}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-blue-600 mb-3">
                Section: {section.sectionName}
              </h3>

              <table className="min-w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
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
                    <tr key={d.difficulty} className="border-t">
                      <td className="p-2 font-semibold text-gray-800">
                        {d.difficulty}
                      </td>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionWiseTab;
