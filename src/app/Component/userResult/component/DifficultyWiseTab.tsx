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

  return (
    <div className="overflow-x-auto border border-[#E6F4FF] rounded-[8px]">
        {!data ? (
        <p className="text-center text-gray-500">No topic data found.</p>
      ) : (
      <table className="min-w-full bg-gradient-to-t from-[#F0F9FF] to-white text-sm text-left">
        <thead className="bg-[#005EB6] text-white">
           <tr className="font-poppins  font-medium text-sm">
            <th className="p-2">Difficulty</th>
            <th className="p-2">Total Qs</th>
            <th className="p-2">Attempted</th>
            <th className="p-2">Correct</th>
            <th className="p-2">Wrong</th>
            <th className="p-2">Not Attempted</th>
            <th className="p-2">Accuracy</th>
            <th className="p-2">Total Marks</th>
          <th className="p-2">Neg. Marks</th>
           <th className="p-2">Possible Marks</th>
            <th className="p-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {typeWise.map((item, idx) => (
            <tr
              key={idx}
             className="border-t border-[#C8DCFE] font-poppins font-normal"
            >
              <td className="px-4 py-2 font-medium">
                {item.questionType}
              </td>
              <td className="p-2">{item.totalQuestions}</td>
              <td className="p-2">{item.attempted}</td>
              <td className="p-2 text-green-600">
                {item.correct}
              </td>
              <td className="p-2 text-red-500">{item.wrong}</td>
              <td className="p-2">{item.notAttempted}</td>
              <td className="p-2">{item.accuracy}</td>
              <td className="p-2">{item.totalMarks}</td>
              <td className="p-2">{item.totalNegative}</td>
              <td className="p-2">{item.totalPossibleMarks}</td>
              <td
                className={`p-2 ${
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
      )}
    </div>
  );
};

export default DifficultyWiseTab;
