import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface TopicWiseTabProps {
  data: any;
}

const TimeWiseTab: React.FC<TopicWiseTabProps> = ({ data }) => {
  const toicData = useSelector((state: any) => state?.examType?.examDetail || []);

  // 🔹 Extract topic list with names and IDs
  const topicWiseArray = useMemo(() => {
    const groupedTopics: Record<string, { topic: string; _id: string }> = {};
    const sections = toicData?.[0]?.exam?.sections || [];

    sections.forEach((section: any) => {
      section?.topicDetails?.forEach((topic: any) => {
        groupedTopics[topic._id] = {
          topic: topic.topic,
          _id: topic._id,
        };
      });
    });

    return Object.values(groupedTopics);
  }, [toicData]);

  // 🔹 Aggregate topic-wise stats
  const topicStats = useMemo(() => {
    const grouped: Record<
      string,
      { topicId: string; total: number; attempted: number; correct: number; totalTime: number }
    > = {};

    data.details.forEach((q: any) => {
      const tId = q.topicId;
      if (!grouped[tId]) {
        grouped[tId] = {
          topicId: tId,
          total: 0,
          attempted: 0,
          correct: 0,
          totalTime: 0,
        };
      }

      const topic = grouped[tId];
      topic.total += 1;
      if (q.userAttempt) {
        topic.attempted += 1;
        topic.totalTime += Number(q.usergiven?.timeTaken || 0);
        const correctOption = q.options?.find((o: any) => o.isCorrect);
        if (correctOption && q.usergiven.userAnswer === correctOption._id) {
          topic.correct += 1;
        }
      }
    });

    // 🔹 Compute derived metrics
    return Object.values(grouped).map((topic) => {
      const wrong = topic.attempted - topic.correct;
      const accuracy =
        topic.attempted > 0 ? ((topic.correct / topic.attempted) * 100).toFixed(1) : "0";
      const percentage =
        topic.total > 0 ? ((topic.attempted / topic.total) * 100).toFixed(1) : "0";
      const avgTime =
        topic.attempted > 0 ? (topic.totalTime / topic.attempted).toFixed(2) : "0";

      return { ...topic, wrong, accuracy, percentage, avgTime };
    });
  }, [data.details]);

  // 🔹 Resolve topic name
  const getTopicName = (topicId: string) => {
    const topic = topicWiseArray.find((t) => t._id === topicId);
    return topic ? topic.topic : "Unknown Topic";
  };

  console.log(topicStats,"topicStatstopicStats")
  return (
    <div className="overflow-x-auto mt-4">
      {topicStats.length === 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {topicStats.map((t: any) => (
              <tr key={t.topicId} className="border-t hover:bg-gray-50 transition">
                <td className="p-2 font-semibold text-blue-700">{getTopicName(t.topicId)}</td>
                <td className="p-2">{t.total}</td>
                <td className="p-2">{t.attempted}</td>
                <td className="p-2 text-green-600">{t.correct}</td>
                <td className="p-2 text-red-500">{t.wrong}</td>
                <td className="p-2">{t.accuracy}%</td>
                <td className="p-2">{t.percentage}%</td>
                <td className="p-2">{t.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeWiseTab;
