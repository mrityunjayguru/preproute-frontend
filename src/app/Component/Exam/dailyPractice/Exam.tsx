"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getQuestionById } from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";
import { createboockMark } from "@/api/boockMark";
import { createReport } from "@/api/Users";
import { Button } from "@/components/ui/button";
import Popup from "../../ManageExam/Component/Report";

import TIMER from "@/assets/vectors/timer.svg"
import { createdailyStreaks } from "@/api/Exam";

interface AnswerState {
  selected: string | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  timeTaken: number; 
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
  const [timerActive, setTimerActive] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  const currentAnswer = answers[questionNo] || {
    selected: null,
    isSubmitted: false,
    isCorrect: null,
    timeTaken: 0,
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

    // Logic to handle time state when navigating
    if (answers[questionNo]?.isSubmitted) {
      setTimerActive(false);
      setSeconds(answers[questionNo].timeTaken); 
    } else {
      setTimerActive(true);
      // We don't setSeconds(0) here because we want to keep the count 
      // if they just clicked the question number button without submitting.
      // If it's a brand new question, it starts from where it was or 0 if handled in handleNext
    }
  }, [dispatch, exam?._id, sectionId, questionNo, answers]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (examFinished || !timerActive) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
      setTotalTime((prevTotal) => prevTotal + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [examFinished, timerActive]);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ================= SELECTION & SUBMIT ================= */
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

  const handleSubmit = () => {
    if (!question || currentAnswer.isSubmitted) return;

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
        timeTaken: seconds, 
      },
    }));
    setTimerActive(false); // Stop timer on submit
  };

  /* ================= NAVIGATION ================= */
  const handleNext = () => {
    if (!currentAnswer.isSubmitted) return;
    
    if (questionNo < totalQuestions) {
      setQuestionNo((q) => q + 1);
      // Only reset seconds if the next question hasn't been submitted yet
      if (!answers[questionNo + 1]?.isSubmitted) {
          setSeconds(0);
          setTimerActive(true);
      }
    } else {
      const payload: any = {
        questionPaperId: exam?._id
      }
      dispatch(createdailyStreaks(payload))
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
    const payload:any = {
      questionId: question._id,
      BookmarkStatus: bookmarkStatus ? "remove" : "add",
    };
    await dispatch(createboockMark(payload));
    setBookmarkStatus(!bookmarkStatus);
  };

  /* ================= REPORT ================= */
  const handleSubmitReport = (val: string) => {
    const payload:any = {
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
  const calculateSecondMinute = (seconds: number) => {
    if (!seconds || seconds < 0) return "0 Min 0 Sec";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} Min ${remainingSeconds} Sec`;
  };

  /* ================= SCORE PAGE ================= */
  if (examFinished) {
    return (
      <div className="bg-white rounded-[10px] border overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-[#F0F9FF] to-white p-6 sm:p-8 border-b ">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
            Exam <span className="text-[#FF5A3C]">Completed</span> 🎉
          </h2>
          <p className="text-gray-500 font-dm-sans mt-2">
            Well done! Here is a summary of your performance.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#FFECDF] p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500 font-dm-sans">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins mt-1">{totalQuestions}</p>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
              <p className="text-sm text-green-600 font-dm-sans">Correct Answers</p>
              <p className="text-2xl font-bold text-green-700 font-poppins mt-1">{correctCount}</p>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
              <p className="text-sm text-red-600 font-dm-sans">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-700 font-poppins mt-1">{wrongCount}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-600 font-dm-sans">Final Score</p>
              <p className="text-2xl font-bold text-blue-700 font-poppins mt-1">{percentage}%</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-gray-50 p-4 rounded-xl mb-8">
            <Image src={TIMER} width={24} height={24} alt="timer" />
            <p className="text-gray-700 font-poppins">
              Total Time Taken: <b className="text-lg">{calculateSecondMinute(totalTime)} </b>
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/user-dashboard")}
              className="bg-[#FF5A3C] text-white cursor-pointer px-12 py-3 rounded-full font-medium hover:bg-[#FF4A2A] transition-all transform hover:scale-105"
            >
              Back to Exams
            </button>
          </div>
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

      <div className="min-h-screen bg-[#F4F9FF] p-4 sm:p-6 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="text-2xl font-bold">
              the<span className="text-[#FF5A3C]">prep</span>route
            </div>

            <button
              onClick={() => router.push("/user-dashboard")}
              className="bg-black cursor-pointer text-white px-8 py-2 rounded-full text-sm w-full sm:w-auto"
            >
              Exit Exam
            </button>
          </div>

          {/* ================= QUESTION CARD ================= */}
          <div className="bg-white rounded-[10px] border py-4 px-4 sm:py-6 sm:px-8 mb-3">

            {/* TOP INFO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div></div>
              <div className="flex gap-3 justify-center items-center text-left font-poppins font-normal">
                <span>
                  <Image src={TIMER} width={32} height={32} className="sm:w-10 sm:h-10" alt="timer" />
                </span>
                <div className="">
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {currentAnswer.isSubmitted ? "Time Taken" : "Elapsed Time"}
                  </p>
                  <p className="text-xl sm:text-2xl">
                    {formatTime(seconds)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[#FF5A3C] font-normal font-dm-sans mb-1">
              Question {questionNo} of {totalQuestions}
            </p>

            <div className="mb-3 font-poppins">
              <RenderPreview content={question?.questionText} />
            </div>

            {/* ================= OPTIONS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question?.options?.map((opt: any) => {
                const correctOption = question.options?.find((o: any) => o.isCorrect);
                const isSelected = currentAnswer.selected === opt._id;
                const showCorrect = currentAnswer.isSubmitted && opt._id === correctOption?._id;
                const showWrong = currentAnswer.isSubmitted && isSelected && opt._id !== correctOption?._id;

                return (
                  <div
                    key={opt._id}
                    onClick={() => handleSelect(opt._id)}
                    className={`flex gap-3 items-start p-4 rounded-xl border font-poppins cursor-pointer
                      ${showCorrect
                        ? "border-green-500 bg-green-50"
                        : showWrong
                          ? "border-red-500 bg-red-50"
                          : isSelected
                            ? "border-[#FF5A3C]"
                            : "border-gray-200 hover:border-gray-300"}
                    `}
                  >
                    <div className="mt-1">
                      <div className="w-4 h-4 rounded-full border flex items-center justify-center">
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#FF5A3C]" />
                        )}
                      </div>
                    </div>
                    <RenderPreview content={opt.text} />
                  </div>
                );
              })}
            </div>

            {/* ================= NAVIGATION ================= */}
            <div className="flex flex-col gap-6 mt-8 pt-6 border-t font-poppins">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                  <button
                    disabled={questionNo === 1}
                    onClick={handlePrev}
                    className="flex-1 md:flex-none px-4 sm:px-8 py-2 cursor-pointer border border-[#FF5A3C] text-[#FF5A3C] rounded-[8px] disabled:opacity-50 hover:bg-[#FFF5F1] transition-colors text-sm sm:text-base"
                    id="prev-btn"
                  >
                    Prev
                  </button>
                  <div className="flex gap-2 flex-wrap justify-center overflow-x-auto py-2 max-w-full">
                    {Array.from({ length: totalQuestions }).map((_, i) => {
                      const q = i + 1;
                      const ans = answers[q];

                      return (
                        <button
                          key={q}
                          id={`q-btn-${q}`}
                          onClick={() => setQuestionNo(q)}
                          className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 rounded-md font-medium font-poppins transition-all cursor-pointer text-xs sm:text-sm
                          ${q === questionNo
                              ? "bg-[#2D74FF] text-white shadow-md"
                              : ans?.isSubmitted
                                ? ans?.isCorrect
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : "bg-gradient-to-t from-[#F0F9FF] to-white border border-[#FFECDF]"}
                        `}
                        >
                          {q}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!currentAnswer.isSubmitted}
                    className="flex-1 md:flex-none px-4 sm:px-8 py-2 cursor-pointer border border-[#FF5A3C] text-[#FF5A3C] rounded-[8px] disabled:opacity-50 hover:bg-[#FFF5F1] transition-colors text-sm sm:text-base"
                    id="next-btn"
                  >
                    {questionNo === totalQuestions ? "Finish" : "Next"}
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.selected || currentAnswer.isSubmitted}
                  className="w-full md:w-auto px-12 py-2 cursor-pointer bg-[#FF5A3C] text-white font-medium rounded-[8px] disabled:opacity-50 hover:bg-[#FF4A2A] transition-all"
                  id="submit-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* ================= CORRECT ANSWER BAR ================= */}
          {currentAnswer.isSubmitted && (
            <div className="bg-white rounded-xl border px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
              <div className="">
                <span className="font-poppins font-normal text-sm sm:text-base">correct answer</span>
                <p className="text-green-600 text-xl sm:text-2xl font-normal font-poppins">
                  Option {question?.options?.findIndex((o: any) => o.isCorrect) + 1}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setReportToggle(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none py-2 cursor-pointer px-4 font-normal text-xs sm:text-sm text-gray-900 font-poppins bg-gradient-to-t from-[#FFECDF] to-white border border-[#FFECDF]"
                >
                  Report
                </Button>

                <Button
                  onClick={handleBookmark}
                  variant="outline"
                  className="flex-1 sm:flex-none py-2 cursor-pointer px-4 font-normal text-xs sm:text-sm text-gray-900 font-poppins bg-gradient-to-t from-[#F0F9FF] to-white border border-[#FFECDF]"
                >
                  {bookmarkStatus ? "Remove" : "Bookmark"}
                </Button>
              </div>
            </div>
          )}

          {/* ================= SOLUTION ================= */}
          {currentAnswer.isSubmitted && (
            <div className="bg-white rounded-2xl border p-6">
              <p className="text-center font-poppins font-bold text-[#FF5A3C] mb-4">Solution</p>
              <div className="w-full h-auto py-5 bg-[#fff] rounded-lg flex items-center justify-center text-gray-600 text-xl">
                {question?.hint ? (
                  <RenderPreview content={question.hint} />
                ) : (
                  <p className="text-center font-poppins font-normal text-gray-400">No hint available</p>
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