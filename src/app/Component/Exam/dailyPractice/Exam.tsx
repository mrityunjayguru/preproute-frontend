"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";
import { createReport } from "@/api/Users";
import { Button } from "@/components/ui/button";
import Popup from "../../ManageExam/Component/Report";

interface AnswerState {
  selected: string | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
}

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
  const userLogin = useSelector(
    (state: any) => state?.Auth?.loginUser
  );

  const exam = topicExamData?.[0] || null;
  const question = singleQuestion?.[0] || null;
  const sectionId = exam?.sectionDetail?._id || null;

  const totalQuestions = useMemo(() => {
    return Number(exam?.examDetail?.sections?.[0]?.noOfQuestions || 0);
  }, [exam]);

  /* ================= STATE ================= */
  const [questionNo, setQuestionNo] = useState(1);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [seconds, setSeconds] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  const currentAnswer = answers[questionNo] || {
    selected: null,
    isSubmitted: false,
    isCorrect: null,
  };

  /* ================= FETCH QUESTION ================= */
  const fetchQuestion = useCallback(async () => {
    if (!exam?._id || !sectionId) return;

    const response: any = await dispatch(
      getQuestionById({
        questionPaperId: exam._id,
        sectionId,
        questionNo,
      })
    );

    setBookmarkStatus(response?.payload?.data?.status || false);
  }, [dispatch, exam?._id, sectionId, questionNo]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (examFinished) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [examFinished]);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!question) return;

    let correct = false;

    if (question.answerType === "MCQ") {
      const right = question.options?.find((o: any) => o.isCorrect);
      correct = currentAnswer.selected === right?._id;
    }

    if (question.answerType === "Numeric") {
      correct = currentAnswer.selected === question.correctAnswer;
    }

    setAnswers((prev) => ({
      ...prev,
      [questionNo]: {
        selected: currentAnswer.selected,
        isSubmitted: true,
        isCorrect: correct,
      },
    }));
  };

  /* ================= NAVIGATION ================= */
  const handleNext = () => {
    if (!currentAnswer.isSubmitted) return;
    if (questionNo < totalQuestions) {
      setQuestionNo((q) => q + 1);
    } else {
      setExamFinished(true);
    }
  };

  const handlePrev = () => {
    if (questionNo > 1) {
      setQuestionNo((q) => q - 1);
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

  /* ================= SCORE CALCULATIONS ================= */
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
  const wrongCount = Object.values(answers).filter((a) => a.isSubmitted && !a.isCorrect).length;
  const percentage = totalQuestions ? ((correctCount / totalQuestions) * 100).toFixed(2) : 0;

  /* ================= SCORE PAGE ================= */
  if (examFinished) {
    return (
      <div className="min-h-screen bg-[#F4F9FF] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-[500px] text-center">
          <h2 className="text-3xl font-bold mb-6">Practice Completed 🎉</h2>
          <div className="space-y-4 text-lg text-left bg-gray-50 p-6 rounded-xl border">
            <p className="flex justify-between">Total Questions: <b>{totalQuestions}</b></p>
            <p className="flex justify-between text-green-600">Correct: <b>{correctCount}</b></p>
            <p className="flex justify-between text-red-500">Wrong: <b>{wrongCount}</b></p>
            <p className="flex justify-between text-blue-600">Score: <b>{percentage}%</b></p>
            <p className="flex justify-between">Time Taken: <b>{formatTime(seconds)}</b></p>
          </div>
          <button
            onClick={() => router.push("/user-dashboard")}
            className="mt-8 bg-[#FF5A3C] text-white px-12 py-3 rounded-lg font-semibold hover:bg-[#e04d32] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Popup
        isOpen={reportToggle}
        onClose={() => setReportToggle(false)}
        onSubmit={handleSubmitReport}
        title="Report Question"
        question={question}
      />

      <div className="min-h-screen bg-[#F4F9FF] p-6">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">
              the<span className="text-[#FF5A3C]">prep</span>route
            </div>
            <button
              onClick={() => router.push("/user-dashboard")}
              className="bg-black text-white px-8 py-2 rounded-full text-sm hover:opacity-80 transition-opacity"
            >
              Exit
            </button>
          </div>

          {/* QUESTION CARD */}
          <div className="bg-white rounded-2xl border p-8 mb-6 shadow-sm">
            <div className="flex justify-between mb-6">
              <p className="text-[#FF5A3C] font-semibold">
                Question {questionNo} of {totalQuestions}
              </p>
              <div className="flex items-center gap-2 font-mono bg-gray-100 px-3 py-1 rounded-md">
                <span className="text-gray-500">Timer:</span>
                <span className="font-bold">{formatTime(seconds)}</span>
              </div>
            </div>

            <div className="text-xl mb-6">
              <RenderPreview content={question?.questionText} />
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
              {question?.options?.map((opt: any) => {
                const right = question.options?.find((o: any) => o.isCorrect);
                const isSelected = currentAnswer.selected === opt._id;
                const showCorrect = currentAnswer.isSubmitted && opt._id === right?._id;
                const showWrong = currentAnswer.isSubmitted && isSelected && opt._id !== right?._id;

                return (
                  <div
                    key={opt._id}
                    onClick={() =>
                      !currentAnswer.isSubmitted &&
                      setAnswers((prev) => ({
                        ...prev,
                        [questionNo]: { ...currentAnswer, selected: opt._id },
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center
                    ${
                      showCorrect
                        ? "border-green-500 bg-green-50"
                        : showWrong
                        ? "border-red-500 bg-red-50"
                        : isSelected
                        ? "border-[#FF5A3C] bg-[#FFF8F6]"
                        : "border-gray-200 hover:border-gray-300"
                    } ${currentAnswer.isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <RenderPreview content={opt.text} />
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION & QUESTION NUMBERS */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-6">
              <button
                disabled={questionNo === 1}
                onClick={handlePrev}
                className="w-full md:w-auto px-8 py-2 border border-[#FF5A3C] text-[#FF5A3C] rounded-lg disabled:opacity-30 font-medium hover:bg-[#FFF8F6]"
              >
                Prev
              </button>

              {/* QUESTION MAP (The added section) */}
              <div className="flex gap-2 overflow-x-auto py-2 max-w-full md:max-w-[400px] scrollbar-hide px-2">
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
                  const qStatus = answers[num];
                  return (
                    <button
                      key={num}
                      onClick={() => setQuestionNo(num)}
                      className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all border
                      ${
                        questionNo === num
                          ? "bg-[#FF5A3C] text-white border-[#FF5A3C] scale-110 shadow-md"
                          : qStatus?.isSubmitted
                          ? qStatus.isCorrect
                            ? "bg-green-100 border-green-300 text-green-700"
                            : "bg-red-100 border-red-300 text-red-700"
                          : "bg-white border-gray-200 text-gray-500 hover:border-[#FF5A3C]"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              <div className="w-full md:w-auto">
                {!currentAnswer.isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!currentAnswer.selected}
                    className="w-full md:w-auto px-10 py-2 bg-[#FF5A3C] text-white rounded-lg disabled:opacity-50 font-medium hover:bg-[#e04d32] transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full md:w-auto px-10 py-2 border-2 border-[#FF5A3C] text-[#FF5A3C] rounded-lg font-bold hover:bg-[#FF5A3C] hover:text-white transition-all shadow-sm"
                  >
                    {questionNo === totalQuestions ? "Finish Test" : "Next Question"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleBookmark}
              variant="outline"
              className={`flex-1 md:flex-none px-6 bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] ${
                bookmarkStatus ? "text-blue-600 font-bold border-blue-200" : ""
              }`}
            >
              {bookmarkStatus ? "★ Bookmarked" : "☆ Bookmark"}
            </Button>

            <Button
              onClick={() => setReportToggle(true)}
              variant="outline"
              className="flex-1 md:flex-none px-6 bg-gradient-to-t from-[#FFECDF] to-white border border-[#F0F9FF] text-orange-700"
            >
              Report Issue
            </Button>
          </div>

          {/* SOLUTION SECTION */}
          {currentAnswer.isSubmitted && (
            <div className="bg-white rounded-2xl border p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#FF5A3C] rounded-full"></div>
                <p className="text-lg font-bold text-gray-800">Explanation & Solution</p>
              </div>
              <div className="prose prose-slate max-w-none text-gray-600">
                {question?.hint ? (
                  <RenderPreview content={question.hint} />
                ) : (
                  <p className="italic text-gray-400">No detailed solution available for this question.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DailyPractice;