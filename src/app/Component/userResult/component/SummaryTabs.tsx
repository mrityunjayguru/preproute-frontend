import { useState } from "react";
import BriefTab from "./BriefTab";
import DifficultyWiseTab from "./DifficultyWiseTab";
import OverallTab from "./OverallTab";
import QuestionWiseTab from "./QuestionWiseTab";
import SectionWiseTab from "./SectionWiseTab";
import TimeWiseTab from "./TimeWiseTab";
import TopicWiseTab from "./TopicWiseTab";

const SummaryTabs = ({ data, examName }) => {
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
      case "Brief": return <BriefTab data={data} />;
      case "Overall": return <OverallTab data={data} />;
      case "Question-wise": return <QuestionWiseTab data={data} />;
      case "Topic-wise": return <TopicWiseTab data={data} />;
      case "Difficulty-wise": return <DifficultyWiseTab data={data} />;
      case "Section-wise": return <SectionWiseTab data={data} />;
      case "Time-wise": return <TimeWiseTab data={data} />;
      default: return null;
    }
  };
console.log(data?.questionpaper?.questionPapername,"datadata")
console.log(examName,"examNameexamName")
  return (
    <div className="bg-white rounded-xl p-6 w-full mx-auto my-4">

      {/* 2 COLUMN GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT COLUMN — EXAM NAME */}
        <div className="col-span-3  pr-4 pt-4">
          <h2 className="text-xl font-bold  mb-1">
           {data?.examdetail?.examname } :) <span className="text-[#FF5635]">{data?.questionpaper?.questionPapername}</span>
          </h2>
             {/* <h2 className="text-2xl font-bold text-[#FF5635] mb-4">
             
          </h2> */}
        </div>

        {/* RIGHT COLUMN — TABS + CONTENT */}
        <div className="col-span-9">

          {/* Tabs */}
          <div className="flex flex-wrap gap-6 font-semibold bg-[#F8F7F3] 
                          rounded-[8px] pt-2 text-base pl-6 mb-6 select-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tracking-wide transition-all duration-200
                  ${activeTab === tab
                    ? "text-orange-600 font-semibold border-b-2 border-orange-600"
                    : "hover:text-orange-500"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[320px]">
            {renderTab()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SummaryTabs;