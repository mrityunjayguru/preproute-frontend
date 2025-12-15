"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";
import TimeTooltip from "./TimeTooltip";
import TimeDonut from "./TimeDonut";

/* ------------------ HELPER: BUILD SECTION TIME DATA ------------------ */
const buildSectionTimeData = (examResult: any) => {
  if (!examResult) return {};

  // Map sectionId -> sectionName
  const sectionIdMap = examResult.sectionDetails.reduce(
    (acc: any, sec: any) => {
      acc[sec._id] = sec.section; // VA, QA-SA, QA-MCQ
      return acc;
    },
    {}
  );

  const sectionTimeData: Record<string, any[]> = {};

  examResult.details.forEach((q: any) => {
    const sectionName = sectionIdMap[q.section];
    if (!sectionName) return;

    if (!sectionTimeData[sectionName]) {
      sectionTimeData[sectionName] = [];
    }

    if (q.userAttempt && q.usergiven) {
      const time = Number(q.usergiven.timeTaken || 0);

      const status =
        q.usergiven.userAnswer &&
        q.usergiven.userAnswer === q.correctAnswer
          ? "correct"
          : "wrong";

      sectionTimeData[sectionName].push({
        q: q.questionNo,
        time,
        status,
      });
    }
  });

  // Sort by question number
  Object.keys(sectionTimeData).forEach((key) => {
    sectionTimeData[key].sort((a, b) => a.q - b.q);
  });

  return sectionTimeData;
};

/* ------------------ COMPONENT ------------------ */
export default function TimeAnalysis() {
  const [active, setActive] = useState("QA-MCQ");

  const examResult = useSelector(
    (state: any) => state.question?.result?.data
  );

  const sectionTimeData = useMemo(
    () => buildSectionTimeData(examResult),
    [examResult]
  );

  const data = sectionTimeData[active] || [];

  const donutData = useMemo(() => {
    const total = data.reduce((s, d) => s + d.time, 0);
    const correct = data
      .filter((d) => d.status === "correct")
      .reduce((s, d) => s + d.time, 0);

    return [
      { name: "Correct", value: Math.round((correct / total) * 100) || 0 },
      {
        name: "Wrong",
        value: Math.round(((total - correct) / total) * 100) || 0,
      },
    ];
  }, [data]);

  return (
    <div className="bg-[#fff] ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Time Analysis</h2>

        <div className="flex gap-2 border rounded-lg overflow-hidden">
          {Object.keys(sectionTimeData).map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-1 text-sm font-medium ${
                active === t
                  ? "bg-[#fe5654] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Bar Chart */}
        <div className="flex-1 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="q" axisLine={false} />
              <YAxis axisLine={false} />
              <Tooltip content={<TimeTooltip />} />

              <Bar dataKey="time"  maxBarSize={15} radius={[6, 6, 0, 0]}>
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.status === "correct" ? "#16a34a" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <TimeDonut data={donutData} />
      </div>
    </div>
  );
}
