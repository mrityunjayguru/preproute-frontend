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
const toicData = useSelector((state: any) => state?.examType?.examDetail || []);

 const topicWiseArray = useMemo(() => {
  const groupedTopics: { [key: string]: { topic: string; _id: string; sections: Set<string> } } = {};

  const sections = toicData?.[0]?.exam?.sections || [];

  sections.forEach((section: any) => {
    const sectionName = section?.sectionDetail?.section;
    section?.topicDetails?.forEach((topic: any) => {
      if (!groupedTopics[topic.topic]) {
        groupedTopics[topic.topic] = {
          topic: topic.topic,
          _id: topic._id,
          sections: new Set(),
        };
      }
      groupedTopics[topic.topic].sections.add(sectionName);
    });
  });

  return Object.values(groupedTopics).map((t) => ({
    _id: t._id,
    topic: t.topic,
    sections: Array.from(t.sections).join(", "),
  }));
}, [toicData]);


  const topicStats = useMemo(() => {
    const grouped: any = {};

    data.details.forEach((q: any) => {
      const tId = q.topicId;
      const qType = q.questionType || "Unknown";

      if (!grouped[tId]) grouped[tId] = {};
      if (!grouped[tId][qType]) {
        grouped[tId][qType] = {
          topicId: tId,
          questionType: qType,
          total: 0,
          attempted: 0,
          correct: 0,
          wrong: 0,
          totalTime: 0,
        };
      }

      const topicGroup = grouped[tId][qType];
      topicGroup.total += 1;

      if (q.userAttempt) {
        topicGroup.attempted += 1;
        topicGroup.totalTime += Number(q?.usergiven?.timeTaken || 0);

        const correctOption = q.options?.find((o: any) => o.isCorrect);
        if (correctOption && q?.usergiven?.userAnswer === correctOption._id) {
          topicGroup.correct += 1;
        }
      }
    });

    // compute derived metrics
    const final: any = {};

    Object.entries(grouped).forEach(([topicId, qTypes]: any) => {
      final[topicId] = Object.values(qTypes).map((topic: any) => {
        const wrong = topic.attempted - topic.correct;
        const accuracy =
          topic.attempted > 0
            ? ((topic.correct / topic.attempted) * 100).toFixed(0)
            : 0;
        const percentage =
          topic.total > 0
            ? ((topic.attempted / topic.total) * 100).toFixed(0)
            : 0;
        const avgTime =
          topic.attempted > 0
            ? (topic.totalTime / topic.attempted).toFixed(2)
            : 0;

        return {
          ...topic,
          wrong,
          accuracy,
          percentage,
          avgTime,
        };
      });
    });

    return final; // { topicId: [ { questionType: Easy, ... }, ... ] }
  }, [data.details]);

  const topicIds = Object.keys(topicStats);
const getTopicName = (topicId: string) => {
  const topic = topicWiseArray.find((t) => t._id == topicId);
  return topic ? topic.topic : "Unknown Topic";
}


  return (
    <div className="overflow-x-auto mt-4">
      {topicIds.length === 0 ? (
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
            {topicIds.map((topicId) => (
              <React.Fragment key={topicId}>
                {/* Topic header row */}
                <tr className="bg-gray-50 font-semibold border-t">
                  <td colSpan={9} className="p-2 text-blue-700">
                    {getTopicName(topicId)}
                  </td>
                </tr>

                {/* Sub rows for each questionType */}
                {topicStats[topicId].map((t: any) => (
                  <tr key={`${t.topicId}-${t.questionType}`} className="border-t">
                    <td className="p-2"></td>
                    <td className="p-2">{t.questionType}</td>
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
