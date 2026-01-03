"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

interface SectionData {
  name: string;
  total: number;
  correct: number;
  wrong: number;
  unattempted: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
}

/* ---------------- Tooltip ---------------- */
const AccuracyTooltip = ({
  label,
  count,
  percent,
  color,
}: {
  label: string;
  count: number;
  percent: number;
  color: string;
}) => (
  <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2">
    <div className="bg-white rounded-xl shadow-lg px-4 py-3 border min-w-[160px]">
      <p className="flex text-sm font-medium text-black text-center  font-poppins">
        {label}
      </p>
      <p
        className="text-2xl font-medium text-center font-dm-sans flex items-center pr-1"
        style={{ color }}
      >
        {count}
        <span className="text-xs font-medium text-black flex items-center">
          Answers
        </span>
      </p>
    </div>
  </div>
);

/* ---------------- Component ---------------- */
const AnswerAccuracyGraph = () => {
  const examResult = useSelector((state: any) => state.question?.result?.data);

  const data: SectionData[] = useMemo(() => {
    if (!examResult) return [];

    const { sectionDetails = [], sectionWise = [] } = examResult;

    return sectionDetails.map((section: any) => {
      const stats = sectionWise.find((s: any) => s.sectionId === section._id);

      const total = stats?.totalQuestions || 1;
      const correctCount = stats?.correct || 0;
      const wrongCount = stats?.wrong || 0;
      const attempted = stats?.attempted || 0;
      const unattemptedCount = total - attempted;

      return {
        name: section.section,
        total,
        correctCount,
        wrongCount,
        unattemptedCount,
        correct: Math.round((correctCount / total) * 100),
        wrong: Math.round((wrongCount / total) * 100),
        unattempted: Math.round((unattemptedCount / total) * 100),
      };
    });
  }, [examResult]);

  return (
    <div className="rounded-[8px] p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4 font-poppins">
        <h3 className="text-lg font-medium text-[#005EB6]">Answer Accuracy</h3>

        <div className="flex gap-5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#94C740]" />
            <span className="text-gray-600">Correct Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#ED3324]" />
            <span className="text-gray-600">Wrong Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#B2B2B2]" />
            <span className="text-gray-600">Unattempted</span>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="space-y-4 font-dm-sans">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-border pb-3"
          >
            {/* Section Name */}
            <div className="w-40 font-medium text-gray-700">{item.name}</div>

            {/* Bars */}
            <div className="flex-1 relative">
              {/* Progress Bar Container */}
              <div className="h-7 flex rounded-full overflow-hidden bg-gray-200">
                {/* Correct */}
                {item.correct > 0 && (
                  <div
                    style={{ width: `${item.correct}%` }}
                    className="bg-[#94C740] h-full flex items-center justify-center 
                   text-white text-xs font-medium min-w-[28px]"
                  >
                    {item.correct}%
                  </div>
                )}

                {/* Wrong */}
                {item.wrong > 0 && (
                  <div
                    style={{ width: `${item.wrong}%` }}
                    className="bg-[#ED3324] h-full flex items-center justify-center 
                   text-white text-xs font-medium min-w-[28px]"
                  >
                    {item.wrong}%
                  </div>
                )}

                {/* Unattempted */}
                {item.unattempted > 0 && (
                  <div
                    style={{ width: `${item.unattempted}%` }}
                    className="bg-[#B2B2B2] h-full flex items-center justify-center 
                   text-white text-xs font-medium min-w-[28px]"
                  >
                    {item.unattempted}%
                  </div>
                )}
              </div>

              {/* ✅ TOOLTIP LAYER (NOT CLIPPED) */}
              <div className="absolute inset-0 flex">
                {/* Correct */}
                {item.correct > 0 && (
                  <div
                    style={{ width: `${item.correct}%` }}
                    className="relative group cursor-pointer"
                  >
                    <div className="hidden group-hover:block">
                      <AccuracyTooltip
                        label="Correct Answers"
                        count={item.correctCount}
                        percent={item.correct}
                        color="#94C740"
                      />
                    </div>
                  </div>
                )}

                {/* Wrong */}
                {item.wrong > 0 && (
                  <div
                    style={{ width: `${item.wrong}%` }}
                    className="relative group cursor-pointer"
                  >
                    <div className="hidden group-hover:block">
                      <AccuracyTooltip
                        label="Wrong Answers"
                        count={item.wrongCount}
                        percent={item.wrong}
                        color="#ED3324"
                      />
                    </div>
                  </div>
                )}

                {/* Unattempted */}
                {item.unattempted > 0 && (
                  <div
                    style={{ width: `${item.unattempted}%` }}
                    className="relative group cursor-pointer"
                  >
                    <div className="hidden group-hover:block">
                      <AccuracyTooltip
                        label="Unattempted"
                        count={item.unattemptedCount}
                        percent={item.unattempted}
                        color="#6B7280"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerAccuracyGraph;
