import React from "react";
import AnswerAccuracyGraph from "../Graph/AnswerAccuracyGraph";
import TimeUsageGraph from "../Graph/TimeUsageGraph";

const BriefTab = () => {
  return (
    <div className="w-full">
       {/* Graphs Section */}
       <div className="space-y-6">
        <AnswerAccuracyGraph />
        <TimeUsageGraph />
      </div>
    </div>
  );
};

export default BriefTab;
