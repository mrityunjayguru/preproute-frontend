import React from "react";
interface TypeWiseData {
  questionType: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  notAttempted: number;
  totalMarks: number;
  totalNegative: number;
  totalPossibleMarks: number;
  accuracy: string;
  percentage: string;
}

interface TopicWiseTabProps {
  data: {
    typeWise?: TypeWiseData[];
  };
}

const DifficultyWiseTab: React.FC<TopicWiseTabProps> = ({ data }) => {
  const typeWise = data?.typeWise || [];

  if (!typeWise.length) {
    return (
      <div className="text-center text-gray-600">
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-sm text-gray-700 text-center">
            <th className="px-4 py-2 border">Difficulty</th>
            <th className="px-4 py-2 border">Total Qs</th>
            <th className="px-4 py-2 border">Attempted</th>
            <th className="px-4 py-2 border">Correct</th>
            <th className="px-4 py-2 border">Wrong</th>
            <th className="px-4 py-2 border">Not Attempted</th>
            <th className="px-4 py-2 border">Accuracy</th>
            <th className="px-4 py-2 border">Total Marks</th>
            <th className="px-4 py-2 border">Neg. Marks</th>
            <th className="px-4 py-2 border">Possible Marks</th>
            <th className="px-4 py-2 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {typeWise.map((item, idx) => (
            <tr
              key={idx}
              className="text-center text-gray-800 text-sm hover:bg-gray-50"
            >
              <td className="px-4 py-2 border font-medium">
                {item.questionType}
              </td>
              <td className="px-4 py-2 border">{item.totalQuestions}</td>
              <td className="px-4 py-2 border">{item.attempted}</td>
              <td className="px-4 py-2 border text-green-600">
                {item.correct}
              </td>
              <td className="px-4 py-2 border text-red-500">{item.wrong}</td>
              <td className="px-4 py-2 border">{item.notAttempted}</td>
              <td className="px-4 py-2 border">{item.accuracy}</td>
              <td className="px-4 py-2 border">{item.totalMarks}</td>
              <td className="px-4 py-2 border">{item.totalNegative}</td>
              <td className="px-4 py-2 border">{item.totalPossibleMarks}</td>
              <td
                className={`px-4 py-2 border ${
                  parseFloat(item.percentage) >= 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DifficultyWiseTab;
