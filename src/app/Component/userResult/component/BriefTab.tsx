import React from "react";

type BriefTabProps = {
  data: Partial<{
    totalMarks: number;
    accuracy: string;
    percentage: string;
    attempted: number;
    totalQuestions: number;
    correct: number;
    wrong: number;
    percentile: string;
  }>;
};

const BriefTab = ({ data }: BriefTabProps) => {
  const percentile = "15.03";
  const avgTime = "1 min 26 sec";
// console.log(data,"datadatadatadata")
  return (
    <div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-xl p-4 flex flex-col items-center text-center">
          <div className="text-yellow-500 text-3xl mb-2">👍</div>
          <p className="text-3xl font-semibold">{data.totalMarks  || 0}</p>
          <p className="text-gray-600 text-sm">SCORE</p>
        </div>

        <div className="border rounded-xl p-4 flex flex-col items-center text-center">
          <div className="text-green-400 text-3xl mb-2">⭐</div>
          <p className="text-3xl font-semibold">{data.accuracy || "0"}</p>
          <p className="text-gray-600 text-sm">ACCURACY</p>
        </div>

        <div className="border rounded-xl p-4 flex flex-col items-center text-center">
          <div className="text-green-500 text-3xl mb-2">🏆</div>
          <p className="text-3xl font-semibold">{data.percentage || "0"}</p>
          <p className="text-gray-600 text-sm">PERCENTAGE</p>
        </div>

        <div className="border rounded-xl p-4 flex flex-col items-center text-center">
          <div className="text-blue-500 text-3xl mb-2">📊</div>
          <p className="text-3xl font-semibold">{data.percentile} %ile</p>
          <p className="text-gray-600 text-sm">PERCENTILE</p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-6 text-gray-700">
        <div>
          <p className="font-semibold">Attempted</p>
          <p>
            {data.attempted} out of {data.totalQuestions || 0}
          </p>
        </div>

        <div>
          <p className="font-semibold">Correct</p>
          <p>{data.correct} out of {data.attempted}</p>
          {/* <p className="text-green-500 text-xs">0.77% students did better</p>    */}
        </div>

        <div>
          <p className="font-semibold">Incorrect</p>
          <p>{data.wrong} out of {data.attempted}</p>
        </div>

        {/* <div>
          <p className="font-semibold">Average Time/Ques</p>
          <p>{avgTime}</p>
          <p className="text-blue-500 text-xs">49.9% students were faster</p>
        </div> */}
      </div>
    </div>
  );
};

export default BriefTab;
