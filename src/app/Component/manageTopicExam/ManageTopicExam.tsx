"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";
import { Button } from "@/components/ui/button";
import Popup from "../ManageExam/Component/Report";
import { createReport } from "@/api/Users";

interface AnswerState {
  selected: string | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
}

const ManageTopicExam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const topicExamData = useSelector((state: any) => state?.examType?.examDetail);
  const singleQuestion = useSelector((state: any) => state?.question?.singleQuestion);
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const exam = topicExamData?.[0];
  const question = singleQuestion?.[0];

  /* ================= TOTAL QUESTIONS ================= */
  const totalQuestions = useMemo(() => {
    return Number(exam?.examDetail?.sections?.[0]?.noOfQuestions || 0);
  }, [exam]);

  /* ================= STATES ================= */
  const [questionNo, setQuestionNo] = useState(1);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [seconds, setSeconds] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [reporttoggle, setReportToggle] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  /* ================= FETCH QUESTION ================= */
  const fetchQuestion = useCallback(async () => {
    if (!exam?._id) return;

    const response: any = await dispatch(
      getQuestionById({
        questionPaperId: exam._id,
        questionNo,
      })
    );

    setBookmarkStatus(response?.payload?.data?.status || false);
  }, [dispatch, exam?._id, questionNo]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (examFinished) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examFinished]);

  const formatTime = (s: number) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const currentAnswer = answers[questionNo] || {
    selected: null,
    isSubmitted: false,
    isCorrect: null,
  };

  /* ================= SELECT OPTION ================= */
  const handleSelect = (optionId: string) => {
    if (currentAnswer.isSubmitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionNo]: {
        ...currentAnswer,
        selected: optionId,
      },
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!question) return;

    const correctOption = question.options?.find((o: any) => o.isCorrect);
    const isCorrect = currentAnswer.selected === correctOption?._id;

    setAnswers((prev) => ({
      ...prev,
      [questionNo]: {
        selected: currentAnswer.selected,
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (!currentAnswer.isSubmitted) return;

    if (questionNo < totalQuestions) {
      setQuestionNo((prev) => prev + 1);
    } else {
      setExamFinished(true);
    }
  };

  /* ================= PREV ================= */
  const handlePrev = () => {
    if (questionNo > 1) {
      setQuestionNo((prev) => prev - 1);
    }
  };

  /* ================= BOOKMARK ================= */
  const handleBookmark = async () => {
    if (!question?._id) return;

    const payload = {
      questionId: question._id,
      BookmarkStatus: bookmarkStatus ? "remove" : "add",
    };

    await dispatch(createboockMark(payload));
    setBookmarkStatus(!bookmarkStatus);
  };

  /* ================= REPORT ================= */
  const handleSubmitReport = (val: string) => {
    const payload = {
      title: val,
      questionId: question?._id,
      userId: userLogin?._id,
    };

    dispatch(createReport(payload));
    setReportToggle(false);
  };

  /* ================= SCORE ================= */
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
  const wrongCount = Object.values(answers).filter(
    (a) => a.isSubmitted && !a.isCorrect
  ).length;

  const percentage = totalQuestions
    ? ((correctCount / totalQuestions) * 100).toFixed(2)
    : 0;

  /* ================= FINAL PAGE ================= */
  if (examFinished) {
    return (
      <div className="min-h-screen bg-[#F4F9FF] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-[500px] text-center">
          <h2 className="text-3xl font-bold mb-6">Exam Completed 🎉</h2>

          <div className="space-y-4 text-lg">
            <p>Total Questions: <b>{totalQuestions}</b></p>
            <p className="text-green-600">Correct: <b>{correctCount}</b></p>
            <p className="text-red-500">Wrong: <b>{wrongCount}</b></p>
            <p className="text-blue-600">Score: <b>{percentage}%</b></p>
            <p>Time Taken: <b>{formatTime(seconds)}</b></p>
          </div>

          <button
            onClick={() => router.push("/Exam/topicExam")}
            className="mt-6 bg-[#FF5A3C] text-white px-8 py-2 rounded-lg"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <>
      <Popup
        isOpen={reporttoggle}
        onClose={() => setReportToggle(false)}
        onSubmit={handleSubmitReport}
        title="Report Question"
        question={question}
      />

      <div className="min-h-screen bg-[#F4F9FF] p-6 font-sans">
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

          {/* QUESTION CARD */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 mb-6">

            <div className="flex justify-between mb-6">
              <p className="text-[#FF5A3C] font-medium">
                Question {questionNo} of {totalQuestions}
              </p>
              <p className="font-bold">{formatTime(seconds)}</p>
            </div>

            <RenderPreview content={question?.questionText} />

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {question?.options?.map((opt: any) => {
                const correctOption = question.options?.find((o: any) => o.isCorrect);
                const isSelected = currentAnswer.selected === opt._id;
                const showCorrect =
                  currentAnswer.isSubmitted &&
                  opt._id === correctOption?._id;
                const showWrong =
                  currentAnswer.isSubmitted &&
                  isSelected &&
                  opt._id !== correctOption?._id;

                return (
                  <div
                    key={opt._id}
                    onClick={() => handleSelect(opt._id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer
                      ${
                        showCorrect
                          ? "border-green-500 bg-green-50"
                          : showWrong
                          ? "border-red-500 bg-red-50"
                          : isSelected
                          ? "border-[#FF5A3C]"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <RenderPreview content={opt.text} />
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION WITH QUESTION NUMBERS */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">

              {/* PREV */}
              <button
                disabled={questionNo === 1}
                onClick={handlePrev}
                className="px-6 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg disabled:opacity-50"
              >
                Prev
              </button>

              {/* QUESTION NUMBERS */}
              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: totalQuestions }).map((_, i) => {
                  const q = i + 1;
                  const ans = answers[q];

                  return (
                    <button
                      key={q}
                      onClick={() => setQuestionNo(q)}
                      className={`w-9 h-9 rounded font-medium
                        ${
                          q === questionNo
                            ? "bg-blue-600 text-white"
                            : ans?.isSubmitted
                            ? ans?.isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "border border-gray-300 text-gray-600"
                        }
                      `}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>

              {/* SUBMIT / NEXT */}
              <div>
                {!currentAnswer.isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!currentAnswer.selected}
                    className="px-8 py-2 bg-[#FF5A3C] text-white rounded-lg disabled:opacity-50"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg"
                  >
                    {questionNo === totalQuestions ? "Finish" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BOOKMARK & REPORT */}
          <div className="flex gap-2">
            <Button
              onClick={handleBookmark}
              variant="outline"
              className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
            >
              {bookmarkStatus ? "Remove Bookmark" : "Bookmark"}
            </Button>

            <Button
              onClick={() => setReportToggle(true)}
              variant="outline"
              className="bg-gradient-to-t from-[#FFECDF] to-white border border-[#F0F9FF]"
            >
              Report
            </Button>
          </div>

          {/* HINT */}
          {currentAnswer.isSubmitted && (
            <div className="bg-white rounded-2xl shadow-sm border p-8 mt-6">
              <p className="text-center text-gray-400 font-medium mb-4">
                Solution / Hint
              </p>
              {question?.hint ? (
                <RenderPreview content={question.hint} />
              ) : (
                <p className="text-center text-gray-400">
                  No hint available
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageTopicExam;
