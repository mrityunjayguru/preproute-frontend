"use client";
import React, { useState } from "react";
import Topic from "../../Tpoic/topic"; // ✅ check spelling
import Exam from "../../Exam/Exam";
import SetUpSection from "../Component/Section/Section";
import SubTopic from "../Component/SubTopic/SubTopic";
import ExamTypes from "../ExamType/ExamType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateExamPage from "../Component/Exam/Exam";
import SectionalExam from "../Component/sectionalExam/SectionalExam";
import TopicWiseExam from "../Component/topicWiseExam/TopicWiseExam";
import { useSelector } from "react-redux";


const tabItems = [
  { value: "sections", label: "Add examType", bannerText: "Add Exam Type" },
  { value: "topics", label: "Add Sections", bannerText: "Add Section" },
  { value: "subtopics", label: "Add Topics", bannerText: "Add Topic" },
  {
    value: "examtype",
    label: "Add Sub Topics",
    bannerText: "Add Sub Topic",
  },

];


const Sidebar = () => {
  const examTypeData =
      useSelector((state: any) => state.examType.examType) || [];

  const [activeTab, setActiveTab] = useState("sections");
  const currentTab = tabItems.find((t) => t.value === activeTab);
const dynamicExamTabs = examTypeData.map((item: any) => ({
  value: item.examType.toLowerCase().replace(" ", "-"),
  label: `Add Exam (${item.examType})`,
  examType: item.examType,
  subMenus: item.subMenus || [],
  id:item._id
}));

const allTabs = [...tabItems, ...dynamicExamTabs];

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
        <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
          <h1 className="text-[#FF5635] text-2xl f font-poppins">
            Exam Setup{" "}
            <span className="text-black text-lg">
              <span className="text-[#005EB6]"> | </span>

              {currentTab?.bannerText}
            </span>
          </h1>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full  mx-auto   px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
      >
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="col-span-3  ">
            <div className="bg-[#F9FAFC] py-4 rounded-[5px]">
              <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 cursor-pointer">
                {allTabs.map((tab) => {
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-[#FF5635] data-[state=active]:border-l-8 rounded-none  data-[state=active]:border-[#FFD930] data-[state=active]:text-white  text-gray-600 hover:bg-gray-100 transition-colors"
                    >
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
              {allTabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-0 outline-none cursor-pointer"
                >
                  {/* Each tab content is responsible for its own container styling if needed */}
                  {tab.value === "sections" && <ExamTypes />}
                  {tab.value === "topics" && <SetUpSection />}
                  {tab.value === "subtopics" && <Topic />}
                  {tab.value === "mocks" && <CreateExamPage data={tab}  />}
                  {tab.value === "pyqs" && <CreateExamPage data={tab} />}
                  {tab.value === "sectional" && <SectionalExam data={tab}  />}
                  {tab.value === "topic-wise" && <TopicWiseExam data={tab}  />}
                  {tab.value === "examtype" && <SubTopic  />}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </>
  );
};

export default Sidebar;
