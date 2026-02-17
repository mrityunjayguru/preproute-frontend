"use client";

import React, { useState } from "react";
import { getQuestionPaperById } from "@/api/QuestionPaper";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "@/Utils/Cappital";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa";
/* ================= PARENT ================= */

const TopicExamCard = ({ selectedExam }: any) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];
console.log(selectedExam,"selectedExamselectedExam")
  return (
    <div className="space-y-6">
      {examById.map((topic: any, index: number) => (
        <TopicBlock
          key={index}
          topic={topic}
          hasAccess={selectedExam?.hasAccess}
        />
      ))}
    </div>
  );
};

export default TopicExamCard;

/* ================= TOPIC BLOCK ================= */

const TopicBlock = ({ topic, hasAccess }: any) => {
  const [open, setOpen] = useState(true);

  const countSubTopics =
    (topic.basic?.subTopics?.length || 0) +
    (topic.advanced?.subTopics?.length || 0) +
    (topic.expert?.subTopics?.length || 0);

  return (
    <div className="border rounded-md overflow-hidden">
      {/* HEADER */}
      <div
        className="flex justify-between items-center bg-[#FF5A3C] text-white px-3 sm:px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="font-semibold text-sm sm:text-base">
          {topic?.topicName}
          <span className="text-xs sm:text-sm font-normal block sm:inline">
            {" "} | Sub Topics {countSubTopics}
          </span>
        </div>

        {open ? (
          <FaArrowAltCircleUp size={24} />
        ) : (
          <FaArrowAltCircleDown size={24} />
        )}
      </div>

      {open && (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-4 bg-[#FFEDE0] text-sm font-medium">
              <div className="p-3"></div>
              <div className="p-3 text-center text-black">Basic</div>
              <div className="p-3 text-center text-black">Advanced</div>
              <div className="p-3 text-center text-black">Expert</div>
            </div>
            <TopicRows topic={topic} hasAccess={hasAccess} />
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= ROWS ================= */

const TopicRows = ({ topic, hasAccess }: any) => {
  const allSubTopics = new Map();

  ["basic", "advanced", "expert"].forEach((level) => {
    topic[level]?.subTopics?.forEach((st: any) => {
      if (!allSubTopics.has(st.subTopicId)) {
        allSubTopics.set(st.subTopicId, {
          subTopicName: st.subTopicName,
          basic: [],
          advanced: [],
          expert: [],
        });
      }
      allSubTopics.get(st.subTopicId)[level] = st.tests || [];
    });
  });

  return (
    <>
      {[...allSubTopics.values()].map((row: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-4 border-b text-sm bg-[#F8FCFF]"
        >
          {/* SUB TOPIC NAME */}
          <div className="p-3 font-medium text-[#FF5A3C]">
            {row.subTopicName}
          </div>

          <LevelCell tests={row.basic} hasAccess={hasAccess} />
          <LevelCell tests={row.advanced} hasAccess={hasAccess} />
          <LevelCell tests={row.expert} hasAccess={hasAccess} />
        </div>
      ))}
    </>
  );
};

/* ================= LEVEL CELL ================= */

const LevelCell = ({ tests = [], hasAccess }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleStartExam = async (test: any) => {
    let token=localStorage.getItem("token")
    if(!token){
      router.push("/PlanandPricing")
      return
    }
    const isFree = test?.isfree === true;
    const canAccess = hasAccess || isFree;

    // ❌ If locked → redirect to home
    if (!canAccess) {
      router.push("/PlanandPricing"); // redirect to home page
      return;
    }

    // ✅ If accessible → start exam
    await dispatch(getQuestionPaperById({ _id: test._id }));
    router.push("/Exam/attemptTopicExam");
  };

  return (
    <div className="p-3 text-center space-y-2">
      {tests.length === 0 && (
        <span className="text-gray-400">Coming Soon</span>
      )}

      {tests.map((test: any) => {
        const isFree = test?.isfree === true;
        const canAccess = hasAccess || isFree;

        return (
          <div
            key={test._id}
            className={`flex items-center justify-center gap-2 text-sm ${canAccess
                ? "text-blue-600 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
              }`}
            onClick={() => {
              handleStartExam(test);
            }}
          >
            {!canAccess && (
              <FaLock size={14} className="text-red-500" />
            )}
            {isFree && (
              <span className=" text-green-600  ">
                <FaLockOpen size={14} />
              </span>
            )}
            <span>{capitalizeWords(test.testName)}</span>
          </div>
        );
      })}
    </div>
  );
};
