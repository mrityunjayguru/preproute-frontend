"use client"
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import DifficultyWiseTab from "./DifficultyWiseTab";
import OverallTab from "./OverallTab";
import QuestionWiseTab from "./QuestionWiseTab";
import SectionWiseTab from "./SectionWiseTab";
import TimeWiseTab from "./TimeWiseTab";
import TopicWiseTab from "./TopicWiseTab";
import { 
  FileText, 
  MonitorCheck, 
  Network, 
  AlertCircle, 
  Layers, 
  Clock,
  Trophy,
  Target,
  Percent,
  TrendingUp
} from "lucide-react";

interface SummaryTabsProps {
  data: any;
  examName?: string;
}

const SummaryTabs = ({ data, examName }: SummaryTabsProps) => {
  const [activeTab, setActiveTab] = useState("Overall");

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });
  };

  const tabItems = [
    { value: "Overall", label: "Overall", icon: FileText },
    { value: "Question-wise", label: "Question-wise", icon: MonitorCheck },
    { value: "Topic-wise", label: "Topic-wise", icon: Network },
    { value: "Difficulty-wise", label: "Difficulty-wise", icon: AlertCircle },
    { value: "Section-wise", label: "Section-wise", icon: Layers },
    { value: "Time-wise", label: "Time-wise", icon: Clock },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="bg-white rounded-xl shadow-sm w-full">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="col-span-3 border-r border-gray-200 p-6">
            <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 gap-2">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-[#FF5635] data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Right Content Area */}
          <div className="col-span-9 p-6">
            {/* Test Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {data?.questionpaper?.questionPapername || "IPMAT-Indore Mock One"}
              </h2>
              <p className="text-gray-600">
                Attempted on {formatDate(data?.examdetail?.examDate) || "25 Dec 2025"}
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Score</span>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-[#FF5635]">
                  {data?.totalMarks || 0}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Accuracy</span>
                  <Target className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-[#FF5635]">
                  {data?.accuracy || "0%"}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Percentage</span>
                  <Percent className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-[#FF5635]">
                  {data?.percentage || "0%"}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Percentile</span>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-[#FF5635]">
                  {data?.percentile ? `${data.percentile}%ile` : "0%ile"}
                </p>
              </Card>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-600 mb-1">Attempted</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.attempted || 0} out of {data?.totalQuestions || 0}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-600 mb-1">Correct</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.correct || 0} out of {data?.attempted || 0}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-600 mb-1">Incorrect</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.wrong || 0} out of {data?.attempted || 0}
                </p>
              </Card>

              <Card className="border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-600 mb-1">Avg. Time/Question</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.avgTimePerQuestion || "1 Min 26 Sec"}
                </p>
              </Card>
            </div>

            {/* Content Area */}
            {tabItems.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <div className="bg-gray-100 rounded-lg p-6 min-h-[400px]">
                  {tab.value === "Overall" && <OverallTab data={data} />}
                  {tab.value === "Question-wise" && <QuestionWiseTab data={data} />}
                  {tab.value === "Topic-wise" && <TopicWiseTab data={data} />}
                  {tab.value === "Difficulty-wise" && <DifficultyWiseTab data={data} />}
                  {tab.value === "Section-wise" && <SectionWiseTab data={data} />}
                  {tab.value === "Time-wise" && <TimeWiseTab data={data} />}
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default SummaryTabs;