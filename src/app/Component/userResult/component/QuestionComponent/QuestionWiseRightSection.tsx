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
  _id?: string;
  questionNo: number;
  questionText?: string;
  questionType?: string;
  answerType?: string;
  options?: Option[];
  usergiven?: {
    userAnswer?: string;
    numericAnswer?: string;
    timeTaken?: number;
    review?: boolean;
  };
  userAttempt?: boolean;
}

interface Props {
  currentQuestionIndex: number;
  getQuestionByNumberId: (idx: number) => void;
  sectionQuestions: Question[];
  examResult: any;
}

const QuestionWiseRightSection: React.FC<Props> = ({
  sectionQuestions,
  getQuestionByNumberId,
  currentQuestionIndex,
  examResult,
}) => {
  const isSection = examResult?.examdetail?.isSection;

  /** -------------------------------
   * TOTAL QUESTIONS LOGIC
   * ------------------------------ */
  const totalQuestions = isSection
    ? sectionQuestions.length
    : Number(examResult?.examdetail?.noOfQuestions || 0);

  /** -------------------------------
   * BUILD QUESTIONS LIST
   * ------------------------------ */
  const questionsForGrid: Question[] = isSection
    ? sectionQuestions
    : Array.from({ length: totalQuestions }).map((_, idx) => {
        return (
          sectionQuestions.find((q) => q.questionNo === idx + 1) || {
            questionNo: idx + 1,
          }
        );
      });
  /** -------------------------------
   * STATUS ICON LOGIC
   * ------------------------------ */
  const getStatusIcon = (q: any) => {
    if (!q.userAttempt || !q.usergiven) {
      return NOTVISITED;
    }

    if (q.usergiven.review && q.userAttempt) {
      return ANSWEREDANDREVIEW;
    }

    if (q.usergiven.review) {
      return REVIEWMARKED;
    }

if (q.answerType === "MCQ") {
  if (!q.usergiven?.userAnswer) return UNANSWERED;

  const correctOption = q.options?.find((opt: any) => opt.isCorrect);

  if (q.usergiven.userAnswer === correctOption?._id) {
    return ANSWERED;
  }

  return ANSWEREDANDREVIEW;
}

if (q.answerType === "Numeric") {
  if (!q.usergiven?.numericAnswer) return UNANSWERED;

  const userAns = Number(q.usergiven.numericAnswer);
  const correctAns = Number(q.numericAnswer);

  if (userAns === correctAns) {
    return ANSWERED;
  }

  return ANSWEREDANDREVIEW;
}


    return NOTVISITED;
  };

  /** -------------------------------
   * NAVIGATION
   * ------------------------------ */
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      getQuestionByNumberId(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      getQuestionByNumberId(currentQuestionIndex + 1);
    }
  };

  /** -------------------------------
   * UI (UNCHANGED)
   * ------------------------------ */
  return (
    <aside className="lg:w-[350px] w-full bg-white py-6 flex-shrink-0 font-poppins px-6">
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
          {questionsForGrid.map((q, idx) => {
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
