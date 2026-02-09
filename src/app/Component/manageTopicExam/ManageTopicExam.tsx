"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";

// Note: Ensure these components are imported correctly
// import { MCQOptions } from "../ManageExam/Component/MCQOptions";
// import { NumericalKeypad } from "../ManageExam/Component/NumericalKeypad";

const ManageTopicExam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const topicExamData = useSelector((state: any) => state?.examType?.examDetail);
  const singleQuestion = useSelector((state: any) => state?.question?.singleQuestion);

  const exam = topicExamData?.[0];
  const question = singleQuestion?.[0];

  const totalQuestions = useMemo(
    () => Number(exam?.examDetail?.sections?.[0]?.noOfQuestions || 0),
    [exam]
  );

  const [questionNo, setQuestionNo] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [seconds, setSeconds] = useState(0);

  /* ---------------- FETCH QUESTION ---------------- */
  const fetchQuestion = useCallback(async () => {
    if (!exam?._id) return;
    const payload: any = {
      questionPaperId: exam._id,
      questionNo,
    };
    await dispatch(getQuestionById(payload));
  }, [dispatch, exam?._id, questionNo]);

  useEffect(() => {
    fetchQuestion();
    setSelected(null);
    setNumericalValue("");
    setIsSubmitted(false);
    setIsCorrect(null);
    setSeconds(0);
  }, [fetchQuestion]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (s: number) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  /* ---------------- ACTIONS ---------------- */
  const handleSubmit = useCallback(() => {
    if (!question) return;
    let correct = false;
    if (question.answerType === "MCQ") {
      const correctOption = question.options?.find((o: any) => o.isCorrect);
      correct = selected === correctOption?._id;
    }
    if (question.answerType === "Numeric") {
      correct = numericalValue === question.correctAnswer;
    }
    setIsCorrect(correct);
    setIsSubmitted(true);
  }, [question, selected, numericalValue]);

  const handleNext = useCallback(() => {
    if (questionNo < totalQuestions) setQuestionNo((q) => q + 1);
  }, [questionNo, totalQuestions]);

  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((v) => v.slice(0, -1));
    if (/^[0-9]$/.test(key)) return setNumericalValue((v) => v + key);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FF] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold tracking-tight">
            the<span className="text-[#FF5A3C]">prep</span>route
          </div>
          <button
            onClick={() => router.push("/Exam/topicExam")}
            className="bg-black text-white px-8 py-2 rounded-full text-sm font-medium"
          >
            Exit Exam
          </button>
        </div>

        {/* ================= MAIN QUESTION CARD ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-gray-500 text-lg">Topic / Sub Topic</p>
              <p className="text-[#FF5A3C] font-semibold text-lg">
                {exam?.examDetail?.examname || "Test 1"} - Expert
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#FF5A3C] text-3xl italic">⏱</div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Elapsed Time</span>
                <span className="text-black text-xl font-bold leading-none">{formatTime(seconds)}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[#FF5A3C] font-medium mb-3 text-sm">
              Question No. {questionNo} of {totalQuestions}
            </p>
            <div className="text-gray-800 text-lg leading-relaxed font-normal">
              <RenderPreview content={question?.questionText} />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question?.answerType === "MCQ" && (
              question.options?.map((opt: any) => (
                <div
                  key={opt._id}
                  onClick={() => !isSubmitted && setSelected(opt._id)}
                  className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selected === opt._id ? "border-[#FF5A3C] bg-white" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                    selected === opt._id ? "border-[#FF5A3C]" : "border-gray-300"
                  }`}>
                    {selected === opt._id && <div className="w-2.5 h-2.5 bg-[#FF5A3C] rounded-full" />}
                  </div>
                  <RenderPreview content={opt.text} />
                </div>
              ))
            )}
          </div>

          {/* PAGINATION & BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
            <button
              disabled={questionNo === 1}
              onClick={() => setQuestionNo((q) => Math.max(1, q - 1))}
              className="px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg font-medium hover:bg-orange-50 disabled:opacity-50"
            >
              Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuestionNo(i + 1)}
                  className={`w-9 h-9 rounded text-sm font-medium transition-colors ${
                    questionNo === i + 1 ? "bg-[#2563EB] text-white" : "border text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                disabled={questionNo === totalQuestions}
                onClick={handleNext}
                className="px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg font-medium hover:bg-orange-50 disabled:opacity-50"
              >
                Next
              </button>
              {!isSubmitted && (
                <button
                  onClick={handleSubmit}
                  className="px-10 py-2 bg-[#FF5A3C] text-white rounded-lg font-semibold shadow-lg shadow-orange-100 hover:bg-[#e44d32]"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= RESULT SECTION ================= */}
        {isSubmitted && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-50">
              <div>
                <p className="text-gray-400 text-sm font-medium">Correct Answer</p>
                <p className="text-[#64D164] text-2xl font-bold">
                  {question?.answerType === "MCQ"
                    ? question?.options?.find((o: any) => o.isCorrect)?.text || "Option 2"
                    : question?.correctAnswer}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[#F9F9F9] border border-gray-200 rounded-lg text-gray-600 text-sm font-medium">
                  Report
                </button>
                <button className="px-6 py-2 bg-[#F9F9F9] border border-gray-200 rounded-lg text-gray-600 text-sm font-medium">
                  Bookmark
                </button>
              </div>
            </div>

            <div className="p-8">
              <p className="text-center text-gray-400 font-medium mb-4">Solution</p>
              <div className="w-full  rounded-xl aspect-video max-h-[350px] flex items-center justify-center overflow-hidden">
                {question?.hint ? (
                  <RenderPreview content={question.hint} />
                ) : (
                 null
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTopicExam;