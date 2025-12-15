import React from "react";

export default function TimeTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 border text-sm">
      <p className="font-semibold">MCQ {data.q}</p>
      <p className="text-gray-500 flex items-center gap-1">
        ⏱ {data.time}s
      </p>
      <p className="text-blue-600 text-xs w-[100px] mt-1 cursor-pointer">
      </p>
    </div>
  );
}
