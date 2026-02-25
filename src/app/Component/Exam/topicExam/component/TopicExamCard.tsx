"use client";

import React, { useState } from "react";
import { getQuestionPaperById } from "@/api/QuestionPaper";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "@/Utils/Cappital";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen, FaCheckCircle } from "react-icons/fa";

/* ================= PARENT ================= */

const TopicExamCard = ({ selectedExam }: any) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];

  const isPlanUnlocked = !!(
    selectedExam &&
    selectedExam?.OrderDetail?.[0]?.planMatch?.[0]?.features?.topicwise
  );
  console.log(selectedExam,"isPlanUnlockedisPlanUnlocked")

  return (
    <div className="space-y-6">
      {examById.map((topic: any, index: number) => (
        <TopicBlock
          key={index}
          topic={topic}
          hasPlanAccess={isPlanUnlocked}
        />
      ))}
    </div>
  );
};

export default TopicExamCard;

/* ================= TOPIC BLOCK ================= */

const TopicBlock = ({ topic, hasPlanAccess }: any) => {
  const [open, setOpen] = useState(true);

  const countSubTopics =
    (topic.basic?.subTopics?.length || 0) +
    (topic.advanced?.subTopics?.length || 0) +
    (topic.expert?.subTopics?.length || 0);

  return (
    <div className="border rounded-md overflow-hidden">
      {/* HEADER */}
      <div
        className="flex justify-between items-center bg-[#FF5A3C] text-white px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="font-semibold text-sm sm:text-base">
          {topic?.topicName}
          <span className="text-xs sm:text-sm font-normal ml-2">
            | Sub Topics {countSubTopics}
          </span>
        </div>

        {open ? (
          <FaArrowAltCircleUp size={22} />
        ) : (
          <FaArrowAltCircleDown size={22} />
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

            <TopicRows topic={topic} hasPlanAccess={hasPlanAccess} />
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= ROWS ================= */

const TopicRows = ({ topic, hasPlanAccess }: any) => {
  const allSubTopics = new Map();

  // We organize data so each row represents one SubTopic across all 3 levels
  ["basic", "advanced", "expert"].forEach((level) => {
    topic[level]?.subTopics?.forEach((st: any) => {
      if (!allSubTopics.has(st.subTopicId)) {
        allSubTopics.set(st.subTopicId, {
          subTopicName: st.subTopicName,
          basic: { tests: [], isLocked: false },
          advanced: { tests: [], isLocked: true },
          expert: { tests: [], isLocked: true },
        });
      }
      
      const current = allSubTopics.get(st.subTopicId);
      current[level] = {
        tests: st.tests || [],
        // ✅ Use the lock status returned by the API for this specific subtopic
        isLocked: st.isLocked ?? (level !== "basic") 
      };
    });
  });

  return (
    <>
      {[...allSubTopics.values()].map((row: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-4 border-b text-sm bg-[#F8FCFF]"
        >
          <div className="p-3 font-medium text-[#FF5A3C]">
            {row.subTopicName}
          </div>

          <LevelCell
            tests={row.basic.tests}
            isSubTopicLocked={row.basic.isLocked}
            hasPlanAccess={hasPlanAccess}
          />
          <LevelCell
            tests={row.advanced.tests}
            isSubTopicLocked={row.advanced.isLocked}
            hasPlanAccess={hasPlanAccess}
          />
          <LevelCell
            tests={row.expert.tests}
            isSubTopicLocked={row.expert.isLocked}
            hasPlanAccess={hasPlanAccess}
          />
        </div>
      ))}
    </>
  );
};

/* ================= LEVEL CELL ================= */

const LevelCell = ({ tests = [], isSubTopicLocked, hasPlanAccess }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleStartExam = async (test: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/PlanandPricing");
      return;
    }

    const isFree = test?.isfree === true;
    
    // ✅ Logic: Can access if the test is free OR (User has plan AND Subtopic is not locked)
    const canAccess = isFree || (hasPlanAccess && !isSubTopicLocked);
console.log(canAccess,"canAccesscanAccess")
    if (!canAccess) {
      router.push("/PlanandPricing");
      return;
    }

    await dispatch(getQuestionPaperById({ _id: test._id }));
    router.push("/Exam/attemptTopicExam");
  };

  return (
    <div className="p-3 text-center space-y-2">
      {tests.length === 0 ? (
        <span className="text-gray-400">Coming Soon</span>
      ) : (
        tests.map((test: any) => {
          const isFree = test?.isfree === true;
          const canAccess = isFree || (hasPlanAccess && !isSubTopicLocked);
console.log(isFree,"canAccesscanAccess")
console.log(hasPlanAccess,"hasPlanAccesshasPlanAccess")
          return (
            <div
              key={test._id}
              className={`flex items-center justify-center gap-2 text-sm ${
                canAccess
                  ? "text-blue-600 cursor-pointer hover:underline"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => canAccess && handleStartExam(test)}
            >
              {/* 🔒 Locked Icon: Show only if it's locked AND not a free test */}
              {isSubTopicLocked && !isFree && (
                <FaLock size={12} className="text-gray-400" />
              )}

              {/* 🔓 Free Icon: Show if test is free and user hasn't bought plan yet */}
              {isFree && !hasPlanAccess && (
                <FaLockOpen size={12} className="text-green-600" />
              )}

              {/* ✅ Completed Icon */}
              {test.isCompleted && (
                <FaCheckCircle size={12} className="text-green-600" />
              )}

              <span
                className={
                  test.isCompleted ? "text-green-600 font-medium" : ""
                }
              >
                {capitalizeWords(test.testName)}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};