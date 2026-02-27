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
  console.log(selectedExam, "isPlanUnlockedisPlanUnlocked")

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
        <div className="w-full">
          {/* DESKTOP VIEW */}
          <div className="hidden sm:block overflow-x-auto">
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

          {/* MOBILE VIEW */}
          <div className="sm:hidden space-y-4 font-poppins p-4 bg-[#F8FCFF]">
            <MobileTopicRows topic={topic} hasPlanAccess={hasPlanAccess} />
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= ROWS ================= */

const MobileTopicRows = ({ topic, hasPlanAccess }: any) => {
  const allSubTopicsArr = getOrganizedSubTopics(topic);

  return (
    <>
      {allSubTopicsArr.map((row: any, i: number) => (
        <div key={i} className="border rounded-lg bg-white p-4 shadow-sm">
          <div className="font-semibold text-[#FF5A3C] mb-3 border-b pb-2">
            {row.subTopicName}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <MobileLevelItem
              label="Basic"
              tests={row.basic.tests}
              isSubTopicLocked={row.basic.isLocked}
              hasPlanAccess={hasPlanAccess}
            />
            <MobileLevelItem
              label="Advanced"
              tests={row.advanced.tests}
              isSubTopicLocked={row.advanced.isLocked}
              hasPlanAccess={hasPlanAccess}
            />
            <MobileLevelItem
              label="Expert"
              tests={row.expert.tests}
              isSubTopicLocked={row.expert.isLocked}
              hasPlanAccess={hasPlanAccess}
            />
          </div>
        </div>
      ))}
    </>
  );
};

const MobileLevelItem = ({ label, tests, isSubTopicLocked, hasPlanAccess }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="pl-2 border-l-2 border-[#FFEDE0]">
        <LevelCell
          tests={tests}
          isSubTopicLocked={isSubTopicLocked}
          hasPlanAccess={hasPlanAccess}
        />
      </div>
    </div>
  );
};

const getOrganizedSubTopics = (topic: any) => {
  const allSubTopics = new Map();

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
        isLocked: st.isLocked ?? level !== "basic",
      };
    });
  });

  return [...allSubTopics.values()];
};

const TopicRows = ({ topic, hasPlanAccess }: any) => {
  const allSubTopicsArr = getOrganizedSubTopics(topic);

  return (
    <>
      {allSubTopicsArr.map((row: any, i: number) => (
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
    const canAccess = isFree || (hasPlanAccess && !isSubTopicLocked);
    console.log(canAccess, "canAccesscanAccess")
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
          console.log(isFree, "canAccesscanAccess")
          console.log(hasPlanAccess, "hasPlanAccesshasPlanAccess")
          return (
            <div
              key={test._id}
              className={`flex items-center md:justify-center gap-2 text-sm ${canAccess
                ? "text-blue-600 cursor-pointer hover:underline"
                : "text-gray-400 cursor-not-allowed"
                }`}
              onClick={() => canAccess && handleStartExam(test)}
            >
              {isSubTopicLocked && !isFree && (
                <FaLock size={12} className="text-gray-400" />
              )}

              {isFree && !hasPlanAccess && (
                <FaLockOpen size={12} className="text-green-600" />
              )}
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