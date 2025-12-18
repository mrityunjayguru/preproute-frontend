"use client";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import StatusIndicators from "@/app/Component/ManageExam/Component/StatusIndicators";
import { pentagonShape } from "@/app/Component/ManageExam/Component/style";

interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  section: any;
  _id?: string;
  questionNo: number;
  questionText: string;
  questionType: string;
  answerType: string;
  options: Option[];
  usergiven?: {
    userAnswer: string;
  };
  correctAnswer: string;
  userAttempt?: boolean;
  colorCode?: string;
}

interface Props {
  userLogin: any;
  totalNoOfQuestions: number;
  currentStatus: Record<number, string>;
  currentQuestionIndex: number;
  getQuestionByNumberId: (idx: number) => void;
  isSection: boolean;
  selectedSection: any;
  isTimeUp: boolean;
  data: {
    details: Question[];
  };
}

const statusColors = {
  correct: "#22c55e", // green
  wrong: "#ef4444", // red
  notAttempted: "#9ca3af", // gray
};

const QuestionWiseRightSection: React.FC<Props> = ({
  userLogin,
  getQuestionByNumberId,
  isTimeUp,
  selectedSection,
  data,
}) => {
  // ✅ Preprocess + group questions by section name
  const groupedData = useMemo(() => {
    if (!data?.details?.length) return {};

    const processed = data.details.map((q) => {
      let bgColor = statusColors.notAttempted;
      if (q.usergiven?.userAnswer) {
        const selected = q.options.find(
          (opt) => opt._id === q.usergiven?.userAnswer
        );
        bgColor = selected?.isCorrect
          ? statusColors.correct
          : statusColors.wrong;
      }
      return { ...q, colorCode: bgColor };
    });

    return processed.reduce((acc: Record<string, Question[]>, item) => {
      const sectionKey =
        typeof item.section === "object"
          ? item.section.section || item.section._id
          : item.section;
      if (!acc[sectionKey]) acc[sectionKey] = [];
      acc[sectionKey].push(item);
      return acc;
    }, {});
  }, [data.details]);


  // ✅ Filter only selected section
  const selectedSectionKey =
    selectedSection?.sectionId;

  const selectedSectionQuestions =
    groupedData[selectedSectionKey] || [];
    // console.log(selectedSectionQuestions,"selectedSectionQuestionsselectedSectionQuestions")
    const shortingData=selectedSectionQuestions.sort((a,b)=>a.questionNo - b.questionNo)
  return (
    <aside className="lg:w-1/4 w-full bg-white p-4 border-t lg:border-t-0 lg:border-l flex-shrink-0 overflow-y-auto">
      {/* ✅ User Profile */}
      {userLogin && (
        <>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-white text-2xl">
              {userLogin?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <p className="font-semibold text-center">
              {userLogin?.username || "User"}
            </p>
          </div>

          {/* Status Indicators */}
          <div className="mb-4">
            <StatusIndicators />
          </div>
        </>
      )}

      {/* ✅ Selected Section Palette */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-600 mb-3">
          Section: {selectedSection?.section || "N/A"}
        </h3>

        {shortingData.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {shortingData.map((q, idx) => (
              <Button
                key={q._id || idx}
                onClick={() => getQuestionByNumberId(q.questionNo - 1)}
                size="sm"
                className="cursor-pointer w-10 h-10 font-bold text-white border-none flex items-center justify-center"
                style={{ backgroundColor: q.colorCode }}
                disabled={isTimeUp}
              >
                {q.questionNo}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">
            No questions found for this section.
          </p>
        )}
      </div>
    </aside>
  );
};

export default QuestionWiseRightSection;
