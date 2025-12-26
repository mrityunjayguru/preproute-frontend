import React from "react";
import BriefTab from "./BriefTab";

interface OverallTabProps {
  data: any;
}

const OverallTab = ({ data }: OverallTabProps) => {
  return (
    <div className="w-full">
      <BriefTab data={data} />
    </div>
  );
};

export default OverallTab;
