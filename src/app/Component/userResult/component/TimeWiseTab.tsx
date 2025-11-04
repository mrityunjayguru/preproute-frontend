import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface TimeWiseTabProps {
  data: any; // current attempt data
  timewiseData?: any[]; // past stored topic data (optional)
}

const TimeWiseTab: React.FC<TimeWiseTabProps> = ({ data, timewiseData = [] }) => {
  const topicData = useSelector((state: any) => state?.topic?.topic);

  const getTopicName = (topicId: string) => {
    const topic = topicData.find((t:any) => t._id === topicId);
    return topic ? topic.topic : "Unknown Topic";
  };

 

  // 🔹 Render table
  return (
    <div className="overflow-x-auto mt-4">
      {data?.typeWiseTime.length === 0 ? (
        <p className="text-center text-gray-500">No topic data found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">Topic Name</th>
              <th className="p-2">Total</th>
              <th className="p-2">Attempted</th>
              <th className="p-2">Correct</th>
              <th className="p-2">Wrong</th>
              <th className="p-2">Accuracy</th>
              <th className="p-2">Attempt %</th>
              <th className="p-2">Avg Time (sec)</th>
              <th className="p-2">Δ Accuracy</th>
              <th className="p-2">Δ Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.typeWiseTime.map((t: any) => (
              <tr key={t.topicId} className="border-t hover:bg-gray-50 transition">
                <td className="p-2 font-semibold text-blue-700">{getTopicName(t.topicId)}</td>
                <td className="p-2">{t.total}</td>
                <td className="p-2">{t.attempted}</td>
                <td className="p-2 text-green-600">{t.correct}</td>
                <td className="p-2 text-red-500">{t.wrong}</td>
                <td className="p-2">{t.accuracy}%</td>
                <td className="p-2">{t.percentage}%</td>
                <td className="p-2">{t.avgTime}</td>
                <td
                  className={`p-2 ${
                    t.diffAccuracy > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.diffAccuracy ? `${t.diffAccuracy}%` : "—"}
                </td>
                <td
                  className={`p-2 ${
                    t.diffTime && Number(t.diffTime) < 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {t.diffTime ? `${t.diffTime}s` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeWiseTab;
