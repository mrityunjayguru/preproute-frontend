import React from "react";
import { useSelector } from "react-redux";

interface TimeWiseTabProps {
  data: any;
}

const TimeWiseTab: React.FC<TimeWiseTabProps> = ({ data }) => {
  const topicData = useSelector((state: any) => state?.topic?.topic);

  const getTopicName = (topicId: string) => {
    const topic = topicData?.find((t: any) => t._id === topicId);
    return topic ? topic.topic : "Topic";
  };

  if (!data?.typeWiseTime?.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No time-wise data found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {data.typeWiseTime.map((t: any, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden border border-[#E6F4FF]"
        >
          {/* 🔹 Header */}
          <div className="bg-[#005EB6] text-white flex">
            <div className="p-4 w-1/4 min-w-[200px] text-lg font-poppins">
              {getTopicName(t.topicId)}
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 p-4 text-center text-sm">
                Time Wise
              </div>
            </div>
          </div>

          {/* 🔹 Number of Questions */}
          <div className="flex border-b">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              Number of Questions
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 p-4 text-center">
                {t.total}
              </div>
            </div>
          </div>

          {/* 🔹 Correct | Wrong | Attempted */}
          <div className="flex border-b bg-[#F9FBFC]">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              Correct | Wrong | Attempted
            </div>
            <div className="flex-1 flex text-sm">
              <div className="flex-1 p-4 text-center">
                <span className="text-green-600">{t.correct}</span> |{" "}
                <span className="text-red-500">{t.wrong}</span> |{" "}
                <span>{t.attempted}</span>
              </div>
            </div>
          </div>

          {/* 🔹 Average Time */}
          <div className="flex border-b">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              Average Time
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 p-4 text-center">
                {Number(t.avgTime || 0).toFixed(2)} Sec.
              </div>
            </div>
          </div>

          {/* 🔹 Accuracy | Attempt % */}
          <div className="flex bg-[#F9FBFC]">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins text-[#005EB6]">
              Accuracy | Attempt %
            </div>
            <div className="flex-1 flex text-[#005EB6]">
              <div className="flex-1 p-4 text-center">
                {t.accuracy}% | {t.percentage}%
              </div>
            </div>
          </div>

          {/* 🔹 Delta Accuracy | Delta Time */}
          <div className="flex border-t">
            <div className="p-4 w-1/4 min-w-[200px] font-poppins">
              {/* Δ Accuracy | */}
               Total Time
            </div>
            <div className="flex-1 flex">
              {/* <div
                className={`flex-1 p-4 text-center ${
                  t.totalTime > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {t.diffAccuracy ? `${t.totalTime}%` : "—"}
              </div> */}
              <div
                className={`flex-1 p-4 text-center ${
                  Number(t.totalTime) < 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {t.totalTime ? `${t.totalTime}s` : "—"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeWiseTab;
