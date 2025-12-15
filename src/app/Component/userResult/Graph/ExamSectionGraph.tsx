"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useSelector } from "react-redux";

export default function ExamSectionGraph() {
  const examResult = useSelector(
    (state: any) => state.question?.result?.data
  );

  const graphData = useMemo(() => {
    if (!examResult) return [];

    const { sectionDetails = [], sectionWise = [] } = examResult;

    return sectionDetails.map((section: any) => {
      const stats = sectionWise.find(
        (s: any) => s.sectionId === section._id
      );

      const total = stats?.totalQuestions ?? 0;
      const attempted = stats?.attempted ?? 0;
      const correct = stats?.correct ?? 0;
      const wrong = stats?.wrong ?? 0;
      const missed = total - attempted;
      const success = stats
        ? parseFloat(stats.percentage)
        : 0;

      return {
        name: section.section, // VA / QA-SA / QA-MCQ
        total,
        attempted,
        correct,
        wrong,
        missed,
        success,
      };
    });
  }, [examResult]);

  return (
    <div className="w-full h-[280px] bg-white rounded-2xl p-5">
      <h2 className="font-semibold text-xl mb-4">Graph</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={graphData}
          barSize={28}
          barGap={-28}
          margin={{ left: 40, right: 30 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 18 }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* TOTAL (GRAY BACKGROUND) */}
          <Bar
            dataKey="total"
            fill="#e5e7eb"
            radius={[12, 12, 12, 12]}
            isAnimationActive={false}
          />

          {/* WRONG (RED) */}
          <Bar
            dataKey="wrong"
            fill="#04cfa3"
            stackId="a"
            radius={[12, 0, 0, 12]}
          />

          {/* ATTEMPTED (PURPLE) */}
          <Bar
            dataKey="attempted"
            fill="#fe5654"
            stackId="a"
            radius={[0, 12, 12, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
