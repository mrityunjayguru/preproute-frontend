"use client";
import React, { useState } from "react";
import Topic from "../../Tpoic/topic"; // ✅ check spelling
import Exam from "../../Exam/Exam"; 
import SetUpSection from "../Component/Section/Section";
import SubTopic from "../Component/SubTopic/SubTopic";
import ExamTypes from "../ExamType/ExamType";
import CreateExamPage from "../Component/Exam/Exam";
import PlanPricing from "../Component/Plan&Pricing/Plan&Pricing";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("sections");

  const renderComponent = () => {
    switch (activeComponent) {
      case "sections":
        return <SetUpSection />;
      case "topics":
        return <Topic />;
      case "subtopics":
        return <SubTopic />;
      case "exam":
        return <CreateExamPage />;
          case "examtype":
        return <ExamTypes />;
         case "Plan":
        return <PlanPricing />;
      default:
        // return <Section />;
    }
  };

  return (

    
    <div className="flex">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-[#F7F7F5]  h-1/2  ">
        <nav className="flex flex-col space-y-2">
                      <button
            onClick={() => setActiveComponent("examtype")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "examtype"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create examType
          </button>
          <button
            onClick={() => setActiveComponent("sections")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "sections"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create Sections
          </button>

          <button
            onClick={() => setActiveComponent("topics")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "topics"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create Topics
          </button>

          <button
            onClick={() => setActiveComponent("subtopics")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "subtopics"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create Sub Topics
          </button>

          <button
            onClick={() => setActiveComponent("exam")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "exam"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create Exam
          </button>

                    <button
            onClick={() => setActiveComponent("Plan")}
            className={`p-2 rounded-md font-semibold ${
              activeComponent === "Plan"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Create Plan
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6">{renderComponent()}</div>
    </div>
  );
};

export default Sidebar;
