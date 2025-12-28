"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface SectionData {
  name: string;
  correct: number;
  wrong: number;
  unattempted: number;
}

const AnswerAccuracyGraph = () => {
  const examResult = useSelector((state: any) => state.question?.result?.data);

  const data: SectionData[] = useMemo(() => {
    if (!examResult) return [];

    const { sectionDetails = [], sectionWise = [] } = examResult;

    return sectionDetails.map((section: any) => {
      const stats = sectionWise.find((s: any) => s.sectionId === section._id);
      const total = stats?.totalQuestions || 1; // Avoid division by zero
      const correct = stats?.correct || 0;
      const wrong = stats?.wrong || 0;
      const unattempted =
        (stats?.totalQuestions || 0) - (stats?.attempted || 0);

      return {
        name: section.section,
        correct: Math.round((correct / total) * 100),
        wrong: Math.round((wrong / total) * 100),
        unattempted: Math.round((unattempted / total) * 100),
      };
    });
  }, [examResult]);

  return (
    <div className="bg-[#F0F9FF] rounded-[8px] p-6">
      <div className="flex items-center justify-between mb-4 font-poppins">
        <h3 className="text-lg font-medium text-[#005EB6]">Answer Accuracy</h3>
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

export default AnswerAccuracyGraph;
