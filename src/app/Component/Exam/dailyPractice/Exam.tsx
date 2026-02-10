"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";

const DailyPractice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /* ================= REDUX ================= */
  const topicExamData = useSelector(
    (state: any) => state?.examType?.examDetail
  );

  const singleQuestion = useSelector(
    (state: any) => state?.question?.singleQuestion
  );

  const exam = topicExamData?.[0] || null;
  const question = singleQuestion?.[0] || null;

  /* ================= DERIVED ================= */
  const sectionId = exam?.sectionDetail?._id || null;

  const totalQuestions = useMemo(() => {
    return Number(
      exam?.examDetail?.sections?.[0]?.noOfQuestions || 0
    );
  }, [exam]);

  /* ================= STATE ================= */
  const [questionNo, setQuestionNo] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [seconds, setSeconds] = useState(0);

  /* ================= FETCH QUESTION ================= */
  const fetchQuestion = useCallback(async () => {
    if (!exam?._id || !sectionId) return;

    await dispatch(
      getQuestionById({
        questionPaperId: exam._id,
        sectionId,            // ✅ PASSED HERE
        questionNo,
      })
    );
  }, [dispatch, exam?._id, sectionId, questionNo]);

  useEffect(() => {
    fetchQuestion();
    setSelected(null);
    setNumericalValue("");
    setIsSubmitted(false);
    setIsCorrect(null);
    setSeconds(0);
  }, [fetchQuestion]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ================= ACTIONS ================= */
  const handleSubmit = () => {
    if (!question) return;

    let correct = false;
    if (question.answerType === "MCQ") {
      const right = question.options?.find((o: any) => o.isCorrect);
      correct = selected === right?._id;
    }

    if (question.answerType === "Numeric") {
      correct = numericalValue === question.correctAnswer;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (questionNo < totalQuestions) {
      setQuestionNo((q) => q + 1);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F4F9FF] p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">
            the<span className="text-[#FF5A3C]">prep</span>route
          </div>
          <button
            onClick={() => router.push("/Exam/topicExam")}
            className="bg-black text-white px-8 py-2 rounded-full text-sm"
          >
            Exit Exam
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl border p-8 mb-6">

          {/* TOP INFO */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-gray-500 text-lg">Section</p>
              <p className="text-[#FF5A3C] font-semibold text-lg">
                {exam?.sectionDetail?.section || "—"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#FF5A3C] text-3xl">⏱</span>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">
                  Elapsed Time
                </p>
                <p className="text-xl font-bold">{formatTime(seconds)}</p>
              </div>
            </div>
          </div>

          {/* QUESTION */}
          <div className="mb-8">
            <p className="text-[#FF5A3C] font-medium mb-3 text-sm">
              Question No. {questionNo} of {totalQuestions}
            </p>
            <RenderPreview content={question?.questionText} />
          </div>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question?.answerType === "MCQ" &&
              question.options?.map((opt: any) => (
                <div
                  key={opt._id}
                  onClick={() => !isSubmitted && setSelected(opt._id)}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer ${
                    selected === opt._id
                      ? "border-[#FF5A3C]"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="mr-4 w-5 h-5 border-2 rounded-full flex items-center justify-center">
                    {selected === opt._id && (
                      <div className="w-2.5 h-2.5 bg-[#FF5A3C] rounded-full" />
                    )}
                  </div>
                  <RenderPreview content={opt.text} />
                </div>
              ))}
          </div>

          {/* CONTROLS */}
          <div className="flex justify-between items-center border-t pt-6">
            <button
              disabled={questionNo === 1}
              onClick={() => setQuestionNo((q) => q - 1)}
              className="px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg"
            >
              Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuestionNo(i + 1)}
                  className={`w-9 h-9 rounded ${
                    questionNo === i + 1
                      ? "bg-[#2563EB] text-white"
                      : "border"
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
                className="px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg"
              >
                Next
              </button>

              {!isSubmitted && (
                <button
                  onClick={handleSubmit}
                  className="px-10 py-2 bg-[#FF5A3C] text-white rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        {isSubmitted && (
          <div className="bg-white rounded-2xl border">
            <div className="p-6 border-b">
              <p className="text-gray-400 text-sm">Correct Answer</p>
              <p className="text-green-500 text-2xl font-bold">
                {question?.answerType === "MCQ"
                  ? question?.options?.find((o: any) => o.isCorrect)?.text
                  : question?.correctAnswer}
              </p>
            </div>

            <div className="p-8">
              {question?.hint && <RenderPreview content={question.hint} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPractice;
