import React, { useState } from "react";
import BriefTab from "./BriefTab";
import OverallTab from "./OverallTab";
import QuestionWiseTab from "./QuestionWiseTab";
import TopicWiseTab from "./TopicWiseTab";
import DifficultyWiseTab from "./DifficultyWiseTab";
import SectionWiseTab from "./SectionWiseTab";
import TimeWiseTab from "./TimeWiseTab";


interface SummaryTabsProps {
  data: any;
}

const SummaryTabs: React.FC<SummaryTabsProps> = ({ data }) => {
  const tabs = [
    "Brief",
    "Question-wise",
    "Topic-wise",
    "Difficulty-wise",
    "Section-wise",
    "Time-wise",
  ];

  const [activeTab, setActiveTab] = useState("Brief");

  const renderTab = () => {
    switch (activeTab) {
      case "Brief":
        return <BriefTab data={data} />;
      case "Overall":
        return <OverallTab data={data} />;
      case "Question-wise":
        return <QuestionWiseTab data={data} />;
      case "Topic-wise":
        return <TopicWiseTab data={data} />;
      case "Difficulty-wise":
        return <DifficultyWiseTab data={data} />;
      case "Section-wise":
        return <SectionWiseTab data={data} />;
      case "Time-wise":
        return <TimeWiseTab data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto my-8">
      {/* Tab Header */}
      <div className="flex flex-wrap gap-4 text-gray-600 text-sm border-b pb-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Tab Content */}
      <div>{renderTab()}</div>
    </div>
  );
};

export default SummaryTabs;
