import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface TopicWiseTabProps {
  data: any;
}
interface GroupedTopic {
  topic: string;
  sections: Set<string>;
  _id: string;
}

const TopicWiseTab = ({ data }: TopicWiseTabProps) => {
  const topicData = useSelector((state: any) => state?.topic?.topic);

  const getTopicName = (topicId: string) => {
    const topic = topicData.find((t:any) => t._id === topicId);
    return topic ? topic.topic : "Unknown Topic";
  };

  return (
    <div className="overflow-x-auto mt-4">
      {!data ? (
        <p className="text-center text-gray-500">No topic data found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">Topic Name</th>
              <th className="p-2">Question Type</th>
              <th className="p-2">Total</th>
              <th className="p-2">Attempted</th>
              <th className="p-2">Correct</th>
              <th className="p-2">Wrong</th>
              <th className="p-2">Accuracy</th>
              <th className="p-2">Attempt %</th>
              <th className="p-2">Avg Time (sec)</th>
            </tr>
          </thead>
          <tbody>
            {data?.topicData.map((topicId:any,i:any) => (
              <React.Fragment key={topicId}>
                {/* Topic header row */}
                <tr className="bg-gray-50 font-semibold border-t">
                  <td colSpan={9} className="p-2 text-blue-700">
                    {getTopicName(topicId.topicId)}
                  </td>
                </tr>

                {/* Sub rows for each questionType */}
                {topicId.details.map((t: any) => (
                  <tr key={`${t.topicId}-${t.questionType}`} className="border-t">
                    <td className="p-2"></td>
                    <td className="p-2">{t.QuestionType}</td>
                    <td className="p-2">{t.total}</td>
                    <td className="p-2">{t.attempted}</td>
                    <td className="p-2 text-green-600">{t.correct}</td>
                    <td className="p-2 text-red-500">{t.wrong}</td>
                    <td className="p-2">{t.accuracy}%</td>
                    <td className="p-2">{t.percentage}%</td>
                    <td className="p-2">{t.avgTime}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopicWiseTab;
