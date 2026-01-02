"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import NOTVISITED from "@/assets/vectors/perticulerExam/not-visited.svg";
import ANSWERED from "@/assets/vectors/perticulerExam/answered.svg";
import UNANSWERED from "@/assets/vectors/perticulerExam/unaswered.svg";
import REVIEWMARKED from "@/assets/vectors/perticulerExam/reviewmarked.svg";
import ANSWEREDANDREVIEW from "@/assets/vectors/perticulerExam/answeredAndReviewMarked.svg";

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
    numericAnswer?: string;
    timeTaken?: number;
    review?: boolean;
  }[];
  correctAnswer: string;
  userAttempt?: boolean;
  userTime?: number;
}

interface Props {
  currentQuestionIndex: number;
  getQuestionByNumberId: (idx: number) => void;
  sectionQuestions: Question[];
}

const QuestionWiseRightSection: React.FC<Props> = ({
  sectionQuestions,
  getQuestionByNumberId,
  currentQuestionIndex,
}) => {
  const totalQuestions = sectionQuestions.length;

  const getStatusIcon = (q: Question) => {
    if (!q.userAttempt) return NOTVISITED;
    if (!q.usergiven || q.usergiven.length === 0) return UNANSWERED;

    const isReview = q.usergiven[0]?.review;
    if (isReview && q.userAttempt) return ANSWEREDANDREVIEW;
    if (q.userAttempt) return ANSWERED;

    return NOTVISITED;
  };

  // ⬅️ Previous
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      getQuestionByNumberId(currentQuestionIndex - 1);
    }
  };

  // ➡️ Next
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      getQuestionByNumberId(currentQuestionIndex + 1);
    }
  };

  return (
    <aside className="lg:w-[350px] w-full bg-white py-6 flex-shrink-0 font-poppins px-6 ">
      <div className="bg-[#F8F9FA] rounded-xl p-4 h-fit border-[0.5px] border-[#C8DCFE] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-[#005EB6] hover:bg-[#0044a5] text-white h-8 w-8 p-0 rounded-md disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </Button>

          <span className="text-sm font-medium text-gray-700">
            Choose Question
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="bg-[#005EB6] hover:bg-[#0044a5] text-white h-8 w-8 p-0 rounded-md disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </Button>
        </div>

        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-3">
          {sectionQuestions.map((q, idx) => {
            const icon = getStatusIcon(q);

            return (
              <button
                key={q._id || idx}
                onClick={() => getQuestionByNumberId(idx)}
                className="relative flex items-center justify-center aspect-square font-bold transition hover:opacity-80"
              >
                <Image
                  src={icon}
                  alt="status"
                  className="w-full h-full object-contain"
                />

                <span
                  className="absolute inset-0 flex items-center justify-center text-sm font-medium"
                  style={{
                    color: icon === NOTVISITED ? "#000000" : "#FFFFFF",
                  }}
                >
                  {q.questionNo}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default QuestionWiseRightSection;
