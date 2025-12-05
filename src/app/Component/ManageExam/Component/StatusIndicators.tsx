import React from "react";

// A cleaner, sharper pentagon using clip-path
const pentagonShapeStyle = {
  width: "32px",
  height: "28px",
  clipPath: "polygon(50% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)",
};

// Circle shape
const circleShapeStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
};

const Indicator = ({ color, label, shape }) => {
  const shapeStyle = shape === "pentagon"
    ? { ...pentagonShapeStyle, backgroundColor: color }
    : { ...circleShapeStyle, backgroundColor: color };

  return (
    <div className="flex items-center space-x-3">
      <div style={shapeStyle} />
      <span className="text-sm text-gray-800 whitespace-nowrap">{label}</span>
    </div>
  );
};

const StatusIndicators = () => {
  const indicatorsData = [
    { color: "#8BC34A", label: "Answered", shape: "pentagon" },
    { color: "#F44336", label: "Not Answered", shape: "pentagon" },
    { color: "#AED581", label: "Not Visited", shape: "pentagon" },
    { color: "#9C27B0", label: "Marked for Review", shape: "circle" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 w-full max-w-xs sm:max-w-sm">
      {indicatorsData.map((item, index) => (
        <Indicator key={index} {...item} />
      ))}
    </div>
  );
};

export default StatusIndicators;
