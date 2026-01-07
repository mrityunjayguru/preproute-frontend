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

interface DifficultyWiseTabProps {
  data: {
    typeWise?: TypeWiseData[];
  };
}

const DifficultyWiseTab: React.FC<DifficultyWiseTabProps> = ({ data }) => {
  const typeWise = data?.typeWise || [];

  if (!typeWise.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No difficulty data found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg overflow-hidden border border-[#E6F4FF]">
        {/* 🔹 Header */}
        <div className="bg-[#005EB6] text-white flex">
          <div className="p-4 w-1/4 min-w-[220px] text-lg font-poppins">
            Difficulty
          </div>
          <div className="flex-1 flex">
            {typeWise.map((item, i) => (
              <div
                key={i}
                className="flex-1 p-4 text-center text-sm"
              >
                {item.questionType}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Total Questions */}
        <div className="flex border-b">
          <div className="p-4 w-1/4 min-w-[220px] font-poppins">
            Total Questions
          </div>
          <div className="flex-1 flex">
            {typeWise.map((item, i) => (
              <div key={i} className="flex-1 p-4 text-center">
                {item.totalQuestions}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Correct | Wrong | Attempted | NA */}
        <div className="flex border-b bg-[#F9FBFC]">
          <div className="p-4 w-1/4 min-w-[220px] font-poppins">
            Correct | Wrong | Attempted | NA
          </div>
          <div className="flex-1 flex text-sm">
            {typeWise.map((item, i) => (
              <div key={i} className="flex-1 p-4 text-center">
                <span className="text-green-600">{item.correct}</span> |{" "}
                <span className="text-red-500">{item.wrong}</span> |{" "}
                <span>{item.attempted}</span> |{" "}
                <span>{item.notAttempted}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Accuracy | Percentage */}
        <div className="flex border-b">
          <div className="p-4 w-1/4 min-w-[220px] font-poppins text-[#005EB6]">
            Accuracy | Percentage
          </div>
          <div className="flex-1 flex text-[#005EB6]">
            {typeWise.map((item, i) => (
              <div key={i} className="flex-1 p-4 text-center">
                {item.accuracy} |{" "}
                <span
                  className={
                    parseFloat(item.percentage) >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Marks */}
        <div className="flex bg-[#F9FBFC]">
          <div className="p-4 w-1/4 min-w-[220px] font-poppins">
            Marks (Scored | Negative | Possible)
          </div>
          <div className="flex-1 flex">
            {typeWise.map((item, i) => (
              <div key={i} className="flex-1 p-4 text-center">
                {item.totalMarks} |{" "}
                <span className="text-red-500">
                  {item.totalNegative}
                </span>{" "}
                | {item.totalPossibleMarks}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultyWiseTab;
