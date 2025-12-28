"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

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
  }[];
  correctAnswer: string;
  userAttempt?: boolean;
  userTime?: number; // From singleQuestion
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
  question: Question;
}

const QuestionWiseRightSection: React.FC<Props> = ({ question }) => {
  if (!question) return null;

  const isAttempted = question.userAttempt;

  // Determine correctness
  let isCorrect = false;
  if (isAttempted && question.usergiven && question.usergiven.length > 0) {
    const userAns = question.usergiven[0];
    if (question.answerType === "Numeric") {
      // Numeric logic might be complex depending on tolerance, but usually exact match or range
      // For now assuming simple string match or backend flag.
      // Actually backend usually computes result.
      // We can check if we have a way to know.
      // The 'Answer' component logic: userAnswerId === option._id
      // Numeric answers don't use options.
      // Let's assume strict equality for now or rely on what's available.
      // Wait, usually the result data has 'isCorrect' flag?
      // Let's check the options logic for MCQ.
      isCorrect = false; // Default for numeric if logic missing
      if (question.options && question.options.length > 0) {
        // MCQ
        const selectedOpt = question.options.find(
          (opt) => opt._id === userAns.userAnswer
        );
        isCorrect = selectedOpt?.isCorrect || false;
      } else {
        // Numeric
        isCorrect = userAns.numericAnswer === question.correctAnswer;
      }
    } else {
      // MCQ
      const selectedOpt = question.options.find(
        (opt) => opt._id === userAns.userAnswer
      );
      isCorrect = selectedOpt?.isCorrect || false;
    }
  }

  // Time formatting
  const timeTaken =
    question.userTime || question.usergiven?.[0]?.timeTaken || 0;
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} Min ${s} Sec`;
  };

  return (
    <aside className="lg:w-1/4 w-full bg-white py-6 flex-shrink-0 font-poppins px-6">
      <div className="">
        {/* Status Card */}
        <div
          className={`border-none  p-6 rounded-xl bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]`}
        >
          <div className="">
            <p className="text-gray-600 text-sm font-normal ">
              Answer Status
            </p>
            {isAttempted ? (
              isCorrect ? (
                <p className="text-3xl font-medium text-green-500">Correct</p>
              ) : (
                <p className="text-3xl font-medium text-red-500">Wrong</p>
              )
            ) : (
              <p className="text-3xl font-medium text-gray-400">Unattempted</p>
            )}
          </div>

          <div>
            <p className="text-gray-600 text-sm font-normal ">
              Response Time
            </p>
            <p className="text-xl font-normal text-blue-500">
              {formatTime(timeTaken)}
            </p>
          </div>
          {/* Decorative Icon/Image could go here to match screenshot (top right corner of card) */}
        </div>
      </div>
    </aside>
  );
};

export default QuestionWiseRightSection;
