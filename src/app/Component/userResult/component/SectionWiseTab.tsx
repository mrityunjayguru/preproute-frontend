import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface DifficultyWiseTabProps {
  data: any;
}

const SectionWiseTab: React.FC<DifficultyWiseTabProps> = ({ data }) => {
  const toicData = useSelector((state: any) => state?.examType?.examDetail || []);
console.log(toicData?.[0]?.exam?.sections,"toicData?.[0]?.exam?.sections")
  // 🔹 Extract section details from exam data
  const sectionMap = useMemo(() => {
    const sections = toicData?.[0]?.exam?.sections || [];
    const map: Record<string, string> = {};
    sections.forEach((section: any) => {
      const id = section?.sectionDetail?._id;
      const name = section?.sectionDetail?.section;
      if (id && name) map[id] = name;
    });
    return map;
  }, [toicData]);

  // 🔹 Group section-wise + difficulty-wise data
  const sectionWiseArray = useMemo(() => {
    if (!data?.details?.length) return [];

    const grouped: Record<string, any> = {};

    data.details.forEach((q: any) => {
      const sectionId = q.section;
      const difficulty = q.questionType || "Unknown";

      if (!grouped[sectionId]) grouped[sectionId] = {};
      if (!grouped[sectionId][difficulty])
        grouped[sectionId][difficulty] = {
          total: 0,
          attempted: 0,
          correct: 0,
        };

      const g = grouped[sectionId][difficulty];
      g.total += 1;
      if (q.userAttempt) {
        g.attempted += 1;
        const correctOption = q.options?.find((o: any) => o.isCorrect);
        if (correctOption && q.usergiven.userAnswer === correctOption._id) g.correct += 1;
      }
    });

    // 🔹 Compute wrong & accuracy
    return Object.entries(grouped).map(([sectionId, diffData]: any) => {
      const sectionName = sectionMap[sectionId] || "Unknown Section";

      const difficulties = Object.entries(diffData).map(
        ([difficulty, stats]: any) => {
          const wrong = stats.attempted - stats.correct;
          const accuracy =
            stats.attempted > 0
              ? ((stats.correct / stats.attempted) * 100).toFixed(1)
              : "0";
          return {
            difficulty,
            total: stats.total,
            attempted: stats.attempted,
            correct: stats.correct,
            wrong,
            accuracy: `${accuracy}%`,
          };
        }
      );

      return { sectionId, sectionName, difficulties };
    });
  }, [data, sectionMap]);

  console.log(sectionWiseArray,"sectionWiseArraysectionWiseArray")

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Section-wise Difficulty Stats</h2>

      {sectionWiseArray.length === 0 ? (
        <p className="text-center text-gray-500">No section data found.</p>
      ) : (
        <div className="space-y-6">
          {sectionWiseArray.map((section: any) => (
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
