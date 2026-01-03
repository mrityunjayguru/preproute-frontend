"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Dot,
} from "recharts";

// -------------------- TYPES --------------------
interface ChartPoint {
  marks: number;
  students: number;
  percentile?: number;
}

// -------------------- DATA --------------------
const chartData: ChartPoint[] = [
  { marks: 0, students: 5, percentile: 1 },
  { marks: 20, students: 140, percentile: 15 },
  { marks: 40, students: 120, percentile: 25 },
  { marks: 60, students: 195, percentile: 38 },
  { marks: 80, students: 190, percentile: 40 },
  { marks: 120, students: 150, percentile: 60 },
  { marks: 160, students: 75, percentile: 80 },
  { marks: 200, students: 25, percentile: 92 },
  { marks: 230, students: 6, percentile: 97 },
  { marks: 260, students: 3, percentile: 99 },
];

// 🔴 Cut-off marks
const CUTOFF_MARKS = 100;

// -------------------- TOOLTIP --------------------
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 border">
      <p className="font-semibold text-sm">Marks: {data.marks}</p>
      <p className="text-sm">No. of students: {data.students}</p>
      {data.percentile && (
        <p className="text-sm text-gray-600">
          Percentile: {data.percentile}%
        </p>
      )}
    </div>
  );
};

// -------------------- DOT --------------------
const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill="#fe5654"
      stroke="#fff"
      strokeWidth={2}
    />
  );
};

// -------------------- MAIN COMPONENT --------------------
export default function MarksDistributionChart() {
     const examResult = useSelector(
        (state: any) => state.question?.result?.data
      );
  return (
    <div className="bg-white rounded-2xl p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Exam</h2>
{/* 
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          {["Exam", "SA", "MCQ", "VA"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded-md text-sm ${
                i === 0
                  ? "bg-orange-500 text-white"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={examResult?.summarylogsresult}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis
              dataKey="marks"
              label={{
                value: "Marks Obtained →",
                position: "bottom",
                offset: 10,
              }}
            />

            <YAxis
              label={{
                value: "No. of Students",
                angle: -90,
                position: "insideLeft",
              }}
            />

            {/* Cut-off Line */}
            <ReferenceLine
              x={CUTOFF_MARKS}
              stroke="#ff6a00"
              strokeDasharray="6 6"
              label={{
                value: "Cut-off",
                position: "top",
                fill: "#ff6a00",
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Main Curve */}
            <Line
              type="monotone"
              dataKey="students"
              stroke="#ff6a00"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
