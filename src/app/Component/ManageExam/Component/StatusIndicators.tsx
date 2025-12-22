import { questionIcon } from "@/Common/svgIcon";
import React from "react";

// Wrapper to apply color via Tailwind text-* classes
const IconShape = ({ icon, color } : any) => (
  <span
    className="w-8 h-8 flex items-center justify-center"
    style={{ color }} // SVG inherits this color
  >
    {icon}
  </span>
);

const Indicator = ({ color, label, icon } : any) => {
  return (
    <div className="flex items-center space-x-3">
      <IconShape icon={questionIcon} color={color} />
      <span className="text-sm text-gray-800 whitespace-nowrap">{label}</span>
    </div>
  );
};

const StatusIndicators = ({ questionIcon } : any) => {
  const indicatorsData = [
    { color: "#8BC34A", label: "Answered" },
    { color: "#F44336", label: "Not Answered" },
    { color: "#BDBDBD", label: "Not Visited" },
    { color: "#9C27B0", label: "Marked for Review" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 w-full max-w-xs sm:max-w-sm">
      {indicatorsData.map((item, index) => (
        <Indicator key={index} {...item} icon={questionIcon} />
      ))} 
    </div>
  );
};

export default StatusIndicators;
