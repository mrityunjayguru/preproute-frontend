import { svgIcon1, svgIcon2, svgIcon3, svgIcon4 } from "@/Common/svgIcon";
import React from "react";

/**
 * Updated BriefTab component styled to match the provided UI image.
 */

const StatCard = ({ icon, value, label, color }) => (
  <div className="border-[#FF5635] border-x border-y mt-10 rounded-2xl p-2 px-4   grid grid-cols-2 gap-2 bg-[#F8F7F3]">

       <div className="flex flex-col">
      <p className="text-xl text-gray-900  tracking-wide">{label}</p>
      <p className="text-[#FF5635] font-semibold  text-4xl leading-tight pt-10">{value}</p>
    </div>

    {/* Column 2: icon on top */}
    <div className="flex items-start justify-end">
      <div className={`text-4xl ${color}`}>{icon}</div>
    </div>

  </div>
);


const SmallStat = ({ label, value }) => (
  <div className="px-4 py-6 rounded-xl bg-[#F8F7F3]">
    <p className="font-semibold text-[#B3B3B5] text-lg">{label}</p>
    <p className="text-gray-900 mt-1 text-xl font-semibold">{value}</p>
  </div>
);

const BriefTab = ({ data }) => {
  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          icon= {svgIcon1}
          value={data.totalMarks || 0}
          label="Score"
          color="text-yellow-500"
        />

        <StatCard
          icon= {svgIcon2}
          value={data.accuracy || "0%"}
          label="Accuracy"
          color="text-green-500"
        />

        <StatCard
          icon= {svgIcon3}
          value={data.percentage || "0%"}
          label="Percentage"
          color="text-orange-500"
        />

        <StatCard
          icon= {svgIcon4}
          value={`${data.percentile || 0}%ile`}
          label="Percentile"
          color="text-blue-500"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <SmallStat
          label="Attempted"
          value={`${data.attempted || 0} out of ${data.totalQuestions || 0}`}
        />

        <SmallStat
          label="Correct"
          value={`${data.correct || 0} out of ${data.attempted || 0}`}
        />

        <SmallStat
          label="Incorrect"
          value={`${data.wrong || 0} out of ${data.attempted || 0}`}
        />

        {/* If needed later */}
        {/* <SmallStat label="Average Time/Ques" value="1 min 26 sec" /> */}
      </div>
    </div>
  );
};

export default BriefTab;


