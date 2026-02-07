"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";

import { MCQOptions } from "../ManageExam/Component/MCQOptions";
import { NumericalKeypad } from "../ManageExam/Component/NumericalKeypad";

const ManageTopicExam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const topicExamData = useSelector(
    (state: any) => state?.examType?.examDetail,
  );
  const singleQuestion = useSelector(
    (state: any) => state?.question?.singleQuestion,
  );

  const exam = topicExamData?.[0];
  const question = singleQuestion?.[0];

  const totalQuestions = useMemo(
    () => Number(exam?.examDetail?.sections?.[0]?.noOfQuestions || 0),
    [exam],
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

  /* ---------------- SUBMIT ---------------- */

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

  /* ---------------- NEXT ---------------- */

  const handleNext = useCallback(() => {
    if (questionNo < totalQuestions) {
      setQuestionNo((q) => q + 1);
    }
  }, [questionNo, totalQuestions]);

  /* ---------------- NUMERIC KEYPAD ---------------- */

  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((v) => v.slice(0, -1));
    if (/^[0-9]$/.test(key)) return setNumericalValue((v) => v + key);
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-orange-500 text-xl">
            {exam?.examDetail?.examname || "Exam"}
          </div>
          <button
            onClick={() => router.push("/Exam/topicExam")}
            className="text-sm text-gray-600"
          >
            Exit Exam
          </button>
        </div>

        {/* Question Navigation */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex gap-3">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <button
                key={i}
                onClick={() => setQuestionNo(i + 1)}
                className={`w-9 h-9 rounded-md border text-sm ${
                  questionNo === i + 1
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-500">Time: {seconds}s</div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <p className="text-gray-500 mb-2">
            Question {questionNo}/{totalQuestions}
          </p>

          <h2 className="text-lg font-medium mb-6">
            <RenderPreview content={question?.questionText} />
          </h2>

          {question?.answerType === "MCQ" && (
            <MCQOptions
              options={question.options || []}
              selected={selected}
              setSelected={setSelected}
              disabled={isSubmitted}
            />
          )}

          {question?.answerType === "Numeric" && (
            <NumericalKeypad
              value={numericalValue}
              onKeyPress={handleKeyPress}
              disabled={isSubmitted}
            />
          )}
        </div>

        {/* Result */}
        {isSubmitted && (
          <div className="mt-4">
            <p
              className={`font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Correct Answer ✅" : "Wrong Answer ❌"}
            </p>

            {!isCorrect && (
              <p className="text-sm text-gray-700 mt-1">
                Correct Answer:{" "}
                {question?.answerType === "MCQ"
                  ? question?.options?.find((o: any) => o.isCorrect)?.text
                  : question?.correctAnswer}
              </p>
            )}

            {question?.hint && (
              <div className="text-sm mt-2 text-gray-500">
                <span className="font-medium">Solution:</span>
                <RenderPreview content={question.hint} />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gray-100 rounded-full"
            >
              Submit
            </button>
          )}

          {isSubmitted && questionNo < totalQuestions && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-black text-white rounded-full"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTopicExam;
