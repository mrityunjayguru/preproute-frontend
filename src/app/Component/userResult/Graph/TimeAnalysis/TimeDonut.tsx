"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const COLORS = ["#0fcfa2", "#fe5654"];

/* -------- Active Shape (Hover Effect) -------- */
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      {/* Glow ring */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.25}
      />

      {/* Main expanded slice */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function TimeDonut({ data }: any) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeData = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="relative w-[220px] h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            activeIndex={activeIndex ?? undefined}
            activeShape={renderActiveShape}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="text-gray-500 text-sm transition-all duration-200">
          {activeData ? activeData.name : "Time Spent"}
        </p>
        <p className="text-xl font-semibold transition-all duration-200">
          {activeData ? `${activeData.value}%` : "100%"}
        </p>
      </div>
    </div>
  );
}
