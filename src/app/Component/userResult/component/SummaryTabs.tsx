"use client";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import DifficultyWiseTab from "./DifficultyWiseTab";
import OverallTab from "./OverallTab";
import QuestionWiseTab from "./QuestionWiseTab";
import SectionWiseTab from "./SectionWiseTab";
import TimeWiseTab from "./TimeWiseTab";
import TopicWiseTab from "./TopicWiseTab";

import OVERALL from "@/assets/vectors/reportanalytics/routes/overall.svg";
import QUESTIONWISE from "@/assets/vectors/reportanalytics/routes/presention-chart.svg";
import TOPICWISE from "@/assets/vectors/reportanalytics/routes/share.svg";
import DIFFICULTYWISE from "@/assets/vectors/reportanalytics/routes/warning.svg";
import SECTIONWISE from "@/assets/vectors/reportanalytics/routes/graph.svg";
import Clock from "@/assets/vectors/reportanalytics/routes/clock.svg";
import Image from "next/image";

interface SummaryTabsProps {
  data: any;
  examName?: string;
}

const SummaryTabs = ({ data }: SummaryTabsProps) => {
  const [activeTab, setActiveTab] = useState("Overall");

  const tabItems = [
    { value: "Overall", label: "Overall", icon: OVERALL },
    { value: "Question-wise", label: "Question-wise", icon: QUESTIONWISE },
    { value: "Topic-wise", label: "Topic-wise", icon: TOPICWISE },
    {
      value: "Difficulty-wise",
      label: "Difficulty-wise",
      icon: DIFFICULTYWISE,
    },
    { value: "Section-wise", label: "Section-wise", icon: SECTIONWISE },
    { value: "Time-wise", label: "Time-wise", icon: Clock },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - Navigation */}
        <div className="col-span-3  ">
          <div className="bg-[#F9FAFC] py-4 rounded-[5px]">
            <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 cursor-pointer">
              {tabItems.map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-[#FF5635] data-[state=active]:border-l-8 rounded-none  data-[state=active]:border-[#FFD930] data-[state=active]:text-white  text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={24}
                      height={24}
                      className={`data-[state=active]:invert ${
                        activeTab === tab.value ? "invert" : ""
                      }`}
                    />
                    <span className="font-medium font-poppins">
                      {tab.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-1 lg:col-span-9 space-y-6">
          {/* Content Area */}
          <div className="mt-0  cursor-pointer">
            {tabItems.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 outline-none cursor-pointer"
              >
                {/* Each tab content is responsible for its own container styling if needed */}
                {tab.value === "Overall" && <OverallTab data={data} />}
                {tab.value === "Question-wise" && (
                  <QuestionWiseTab data={data} />
                )}
                {tab.value === "Topic-wise" && <TopicWiseTab data={data} />}
                {tab.value === "Difficulty-wise" && (
                  <DifficultyWiseTab data={data} />
                )}
                {tab.value === "Section-wise" && <SectionWiseTab data={data} />}
                {tab.value === "Time-wise" && <TimeWiseTab data={data} />}
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default SummaryTabs;
