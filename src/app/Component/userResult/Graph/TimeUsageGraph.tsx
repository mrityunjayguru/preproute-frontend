"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface SectionTimeData {
  name: string;
  correct: number;
  wrong: number;
  unattempted: number;
}

const TimeUsageGraph = () => {
  const examResult = useSelector((state: any) => state.question?.result?.data);

  const data: SectionTimeData[] = useMemo(() => {
    if (!examResult) return [];

    const { sectionDetails = [], details = [] } = examResult;
    
    // Map sectionId -> sectionName
    const sectionIdMap = sectionDetails.reduce((acc: any, sec: any) => {
      acc[sec._id] = sec.section;
      return acc;
    }, {});

    const sectionTimeStats: Record<string, { correct: number; wrong: number; unattempted: number; total: number }> = {};

    // Initialize sections
    sectionDetails.forEach((sec: any) => {
      sectionTimeStats[sec.section] = { correct: 0, wrong: 0, unattempted: 0, total: 0 };
    });

    details.forEach((q: any) => {
      const sectionName = sectionIdMap[q.section];
      if (!sectionName) return;

      const time = Number(q.usergiven?.timeTaken || 0);
      if (time === 0) return;

      const isCorrect = q.usergiven?.userAnswer === q.correctAnswer;
      const isAttempted = q.userAttempt; // Assuming userAttempt is boolean

      if (isAttempted) {
        if (isCorrect) {
          sectionTimeStats[sectionName].correct += time;
        } else {
          sectionTimeStats[sectionName].wrong += time;
        }
      } else {
        sectionTimeStats[sectionName].unattempted += time;
      }
      sectionTimeStats[sectionName].total += time;
    });

    return Object.entries(sectionTimeStats).map(([name, stats]) => {
      const total = stats.total || 1;
      return {
        name,
        correct: Math.round((stats.correct / total) * 100),
        wrong: Math.round((stats.wrong / total) * 100),
        unattempted: Math.round((stats.unattempted / total) * 100),
      };
    });
  }, [examResult]);

  return (
    <div className="bg-[#f0f9ff] rounded-[8px] p-6 mt-6">
      <div className="flex items-center justify-between mb-4 font-poppins">
        <h3 className="text-lg font-medium text-[#005EB6]">Time Usage</h3>
        <div className="flex gap-5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#94C740]"></div>
            <span className="text-gray-600">Correct Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#ED3324]"></div>
            <span className="text-gray-600">Wrong Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#B2B2B2]"></div>
            <span className="text-gray-600">Unattempted</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 font-dm-sans">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-40 font-medium text-gray-700">{item.name}</div>
            <div className="flex-1 h-7 flex rounded-full overflow-hidden bg-gray-200">
              {/* Correct */}
              {item.correct > 0 && (
                <div
                  style={{ width: `${item.correct}%` }}
                  className="bg-[#94C740] h-full flex items-center justify-center text-white text-xs font-medium"
                >
                  {item.correct}%
                </div>
              )}
              {/* Wrong */}
              {item.wrong > 0 && (
                <div
                  style={{ width: `${item.wrong}%` }}
                  className="bg-[#ED3324] h-full flex items-center justify-center text-white text-xs font-medium"
                >
                  {item.wrong}%
                </div>
              )}
              {/* Unattempted */}
              {item.unattempted > 0 && (
                <div
                  style={{ width: `${item.unattempted}%` }}
                  className="bg-[#B2B2B2] h-full flex items-center justify-center text-white text-xs font-medium"
                >
                  {item.unattempted}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeUsageGraph;
