import { getQuestionPaperById } from "@/api/QuestionPaper";
import { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

/* ================= PARENT ================= */

const TopicExamCard = ({ selectedExam }: any) => {
  const examById = useSelector((s: any) => s.exam?.examById) || [];

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
        className="flex justify-between items-center bg-[#FF5A3C] text-white px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="font-semibold">
          Exam Topic {topic?.topicName}
          <span className="text-sm font-normal">
            {" "} | Sub Topics {countSubTopics}
          </span>
        </div>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="w-full">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 bg-[#FF5A3C] text-white text-sm font-medium">
            <div className="p-3">Exam Topic</div>
            <div className="p-3 text-center">Basic</div>
            <div className="p-3 text-center">Advanced</div>
            <div className="p-3 text-center">Expert</div>
          </div>

          <TopicRows topic={topic} hasAccess={hasAccess} />
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
          {/* SUB TOPIC */}
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
    if (!hasAccess) return;

    await dispatch(getQuestionPaperById({ _id: test._id }));
    router.push("/Exam/attemptTopicExam");
  };

  return (
    <div className="p-3 text-center space-y-2">
      {tests.length === 0 && (
        <span className="text-gray-400">Coming Soon</span>
      )}

      {tests.map((test: any) => (
        <div
          key={test._id}
          className={`text-sm ${
            hasAccess
              ? "text-blue-600 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handleStartExam(test)}
        >
          {hasAccess ? test.testName : `🔒 ${test.testName}`}
        </div>
      ))}
    </div>
  );
};
