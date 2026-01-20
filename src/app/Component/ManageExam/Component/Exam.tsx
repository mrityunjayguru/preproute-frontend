"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";

// API & Actions
import {
  createUserExam,
  handleGivenExam,
  ManageExamProgress,
  setCurrentSection,
} from "@/api/Exam";
import {
  clearQuestionResponce,
  userExamResult,
  userQuestiongetQuestionById,
} from "@/api/Question";
import { createReport, updaquesPaperTime } from "@/api/Users";

// Components
import HeaderSection from "./HeaderSection";
import QuestionView from "./QuestionView";
import RightSection from "./RightSection";
import FooterActions from "./FooterActions";
import { NumericalKeypad } from "./NumericalKeypad";
import { MCQOptions } from "./MCQOptions";
import ExamHeader from "./ExamHeader";
import Popup from "./Report";
import TabSwitchWarning from "./TabSwitchWarning";
import SectionRestrictionPopup from "./Popup/SectionRestrictionPopup";
import SubmitExamPopup from "./Popup/SubmitExamPopup";
import SwitchSectionRestrictionPopup from "./Popup/sectionRestriction";
import SubjectTabs from "./SubjectTabs";

// Types
interface SectionDetail {
  _id: string;
  section: string;
}

interface Section {
  sectionId: any;
  sectionDetail: SectionDetail;
  noOfQuestions: number;
  duration?: number;
}

export default function ExamUI() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // --- Redux State ---
  const examData = useSelector((state: any) => state.examType?.examDetail);
  const singleQuestion = useSelector((state: any) => state.question?.singleQuestion);
  const examProgress = useSelector((state: any) => state.exam?.examProgress);
  const userLogin = useSelector((state: any) => state.Auth?.loginUser);
  const currentSectionId = useSelector((state: any) => state.exam.currentSectionId);

  // --- UI & Modal State ---
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [sectionRestriction, setsectionRestriction] = useState(false);
  const [sectionShowPopup, setSectionShowPopup] = useState(false);
  const [loder, setloder] = useState<boolean>(false);

  // --- Exam Logic State ---
  const [isSection, setIsSection] = useState(false);
  const [switchable, setSwitchable] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [question, setQuestion] = useState<any>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [sectionQuestionStatus, setSectionQuestionStatus] = useState<Record<string, Record<number, string>>>({});
  const [timeLeft, setTimeLeft] = useState(1);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);

  // --- Derived State ---
  const exam = useMemo(() => examData?.[0]?.exam || {}, [examData]);
  const examSections: Section[] = useMemo(() => exam?.sections || [], [exam]);
  const activeSectionId = examProgress?.currentSection?.sectionId || selectedSection?.sectionId;

  const currentStatus = useMemo(() => {
    if (examProgress?.givenExam) {
      return examProgress?.givenExam[activeSectionId] || {};
    }
    return sectionQuestionStatus[selectedSection?.sectionId] || {};
  }, [examProgress, sectionQuestionStatus, activeSectionId, selectedSection]);

  // --- Helper Functions ---
  const getISTDate = useCallback(() => {
    const date = new Date();
    return new Date(date.getTime() + (5 * 60 + 30) * 60000);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const fetchQuestion = useCallback(async (questionNo: number, sectionId?: string) => {
    if (!examData?.[0]?._id) return;
    const payload: any = { 
        questionNo, 
        questionPaperId: examData[0]._id,
        section: sectionId 
    };
    await dispatch(userQuestiongetQuestionById(payload));
  }, [dispatch, examData]);

  const updateSectionTime = useCallback(async (prevSectionId?: any, newSectionId?: string) => {
    if (!examData?.[0]?._id) return;
    const payload: any = {
      questionPaperId: examData[0]._id,
      userId: userLogin?._id,
      sectionWise: [],
    };

    if (prevSectionId) payload.sectionWise.push({ sectionId: prevSectionId, endTime: getISTDate() });
    if (newSectionId) payload.sectionWise.push({ sectionId: newSectionId, startTime: getISTDate() });

    try {
      await dispatch(updaquesPaperTime(payload));
    } catch (err) {
      console.error("Failed to update section time:", err);
    }
  }, [dispatch, examData, userLogin, getISTDate]);

  const updateStatus = useCallback((status: string) => {
    const sectionKey = isSection ? selectedSection?.sectionId : "no-section";
    if (!sectionKey) return;
    setSectionQuestionStatus((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [currentQuestionIndex]: status },
    }));
  }, [isSection, selectedSection, currentQuestionIndex]);

  // --- Initialization & Progress Recovery ---
  useEffect(() => {
    if (!examData?.length || !userLogin) return;

    const examInfo = examData[0].exam;
    setIsSection(examInfo?.isSection);
    setSwitchable(examInfo?.switchable);

    const fetchProgress = async () => {
      const payload: any = {
        userId: userLogin._id,
        examId: examInfo._id,
        questionPaperId: examData[0]._id,
        status: "Find",
      };

      const response: any = await dispatch(ManageExamProgress(payload));
      
      if (response?.payload?.givenExam) {
        setSectionQuestionStatus(response.payload.givenExam);
        const savedSection = examSections.find(s => s.sectionId === response.payload.currentSection.sectionId);
        if (savedSection) setSelectedSection(savedSection);
        
        setCurrentQuestionIndex(response.payload.currentQuestionNoIndex);
        setTotalNoOfQuestions(response.payload.currentSection.noofQuestion);
        fetchQuestion(response.payload.currentQuestionNoIndex + 1, response.payload.currentSection.sectionId);
      } else {
        // Fresh start
        if (examInfo.isSection && examSections.length) {
          const firstSection = examSections[0];
          setSelectedSection(firstSection);
          setTotalNoOfQuestions(firstSection.noOfQuestions);
          fetchQuestion(1, firstSection.sectionId);

          if (!localStorage.getItem(`sectionStartTime_${firstSection.sectionId}`)) {
            updateSectionTime(null, firstSection.sectionId);
            localStorage.setItem(`sectionStartTime_${firstSection.sectionId}`, "1");
          }
        } else {
          setTotalNoOfQuestions(Number(examInfo.noOfQuestions) || 0);
          fetchQuestion(1);
        }
      }

      // Restore Timer
      const savedTime = localStorage.getItem(`exam_timeLeft_${examData[0]._id}`);
      if (savedTime) {
        setTimeLeft(Number(savedTime));
      } else {
        const duration = examInfo.switchable ? examInfo.fullExamduration : (examInfo.isSection ? examSections[0].duration : examInfo.fullExamduration);
        setTimeLeft(Number(duration || 0) * 60);
      }
    };

    fetchProgress();
  }, [examData, userLogin, dispatch]);

  // --- Timer Effect ---
  useEffect(() => {
    if (timeLeft <= 0) {
      if (isSection && currentSectionIndex + 1 < examSections.length) {
        handleSubmitSection();
      } else {
        handleSubmitFullExam();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        localStorage.setItem(`exam_timeLeft_${examData?.[0]?._id}`, String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examData, isSection, currentSectionIndex, examSections]);

  // --- Question Sync ---
  useEffect(() => {
    if (!singleQuestion?.[0]) return;
    const q = singleQuestion[0];
    setQuestion(q);
    setQuestionStartTime(Date.now());
    
    if (q.userAttempted && q.usergiven?.length) {
      setMcqSelected(q.usergiven[0]?.userAnswer || null);
      setNumericalValue(q.usergiven[0]?.numericAnswer || "");
      updateStatus(currentStatus[currentQuestionIndex] || "answered");
    } else {
      setMcqSelected(null);
      setNumericalValue("");
      updateStatus(currentStatus[currentQuestionIndex] || "visited");
    }
  }, [singleQuestion, currentQuestionIndex]);

  // --- Tab Visibility Security ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("tabSwitch", "true");
      } else if (localStorage.getItem("tabSwitch") === "true") {
        setShowWarning(true);
        localStorage.removeItem("tabSwitch");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // --- Handlers ---
  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((prev) => prev.slice(0, -1));
    if (/[0-9]/.test(key)) return setNumericalValue((prev) => prev + key);
  }, []);

  const saveCurrentAnswer = async (statusType = "visited") => {
    if (!question) return;
   
    const timeTaken = questionStartTime ? Math.floor((Date.now() - questionStartTime) / 1000) : 0;
    const payload: any = {
      questionId: question._id,
      userId: userLogin?._id,
      timeTaken,
      questionPaperId: examData?.[0]?._id,
      statusType,
    };

    if (question.answerType === "Numeric") {
      payload.numericAnswer = numericalValue;
    } else {
      payload.userAnswer = mcqSelected;
    }

    if (mcqSelected || numericalValue) {
      await dispatch(createUserExam(payload));
      updateStatus(statusType);
      return
    }
    if(statusType=="review"){
      updateStatus("review");
    } 
    else {
      updateStatus("visited");
    }
  };

  const handleNextQuestion = async () => {
    setloder(true);
    await saveCurrentAnswer("answered");

    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      setCurrentQuestionIndex((p) => p + 1);
      fetchQuestion(currentQuestionIndex + 2, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex + 1 < examSections.length) {
      switchable ? handleSubmitSection() : setsectionRestriction(true);
    }
    setloder(false);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
      fetchQuestion(currentQuestionIndex, selectedSection?.sectionId);
    }
  };

  const handleMarkForAnswerAndReview = async () => {
    setloder(true);
          if (mcqSelected || numericalValue) {
  await saveCurrentAnswer("reviewAndAnswer");
    }else{
  await saveCurrentAnswer("review");
    }
    // await saveCurrentAnswer("reviewAndAnswer");

    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      setCurrentQuestionIndex((p) => p + 1);
      fetchQuestion(currentQuestionIndex + 2, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex + 1 < examSections.length) {
      switchable ? handleSubmitSection() : setsectionRestriction(true);
    }
    setloder(false);
  };

  const handleClearResponse = async () => {
    await dispatch(clearQuestionResponce({ questionPaperId: question._id }));
    setMcqSelected(null);
    setNumericalValue("");
    updateStatus("visited");
  };

  const handleSubmitSection = async () => {
    setsectionRestriction(false);
    const nextIndex = currentSectionIndex + 1;
    const nextSection = examSections[nextIndex];
    if (!nextSection) return;

    if (!switchable) setTimeLeft(nextSection.duration! * 60);
    
    await updateSectionTime(selectedSection?.sectionId, nextSection.sectionId);
    setSelectedSection(nextSection);
    setCurrentSectionIndex(nextIndex);
    setCurrentQuestionIndex(0);
    setTotalNoOfQuestions(nextSection.noOfQuestions);
    fetchQuestion(1, nextSection.sectionId);
  };

  const handleSection = async (section: Section) => {
    if (!switchable) {
      setSectionShowPopup(true);
      return;
    }
    await updateSectionTime(selectedSection?.sectionId, section.sectionId);
    setSelectedSection(section);
    setCurrentSectionIndex(examSections.findIndex((s) => s.sectionId === section.sectionId));
    setCurrentQuestionIndex(0);
    setTotalNoOfQuestions(section.noOfQuestions);
    fetchQuestion(1, section.sectionId);
  };

  const handleSubmitFullExam = async () => {
    try {
      await updateSectionTime(selectedSection?.sectionId, undefined);
      await dispatch(userExamResult(examData));
      router.push("/analytics");
    } catch (err) {
      console.error("Error submitting exam:", err);
    }
  };

  // --- Progress Sync Effect ---
  useEffect(() => {
    if (!userLogin || !examData?.length || !selectedSection) return;
    const payload: any = {
      userId: userLogin._id,
      examId: examData[0].exam._id,
      questionPaperId: examData[0]._id,
      currentSection: {
        sectionId: selectedSection.sectionId,
        sectionName: selectedSection.sectionDetail?.section,
        duration: selectedSection.duration,
        noofQuestion: selectedSection.noOfQuestions,
      },
      currentQuestionNoIndex: currentQuestionIndex,
      givenExam: sectionQuestionStatus,
      status: "in-progress",
    };
    dispatch(ManageExamProgress(payload));
  }, [sectionQuestionStatus, currentQuestionIndex, selectedSection]);

  const CurrentInput = useMemo(() => {
    if (!question) return null;
    return question.answerType === "Numeric" ? (
      <NumericalKeypad value={numericalValue} onKeyPress={handleKeyPress} />
    ) : (
      <MCQOptions options={question.options || []} selected={mcqSelected} setSelected={setMcqSelected} />
    );
  }, [question, numericalValue, mcqSelected, handleKeyPress]);

  if (!examData?.length) return <div className="p-8 text-center">No exam data found.</div>;

  return (
    <>
      {showSubmitPopup && <SubmitExamPopup onClose={() => setShowSubmitPopup(false)} onConfirm={handleSubmitFullExam} />}
      {sectionRestriction && <SwitchSectionRestrictionPopup onClose={() => setsectionRestriction(false)} onConfirm={handleSubmitSection} selectedSection={selectedSection} />}
      {sectionShowPopup && <SectionRestrictionPopup examname={exam[0]?.examname} onClose={() => setSectionShowPopup(false)} />}
      {showWarning && <TabSwitchWarning onClose={() => setShowWarning(false)} />}
      <Popup title="Submit Report" isOpen={showPopup} onClose={() => setShowPopup(false)} onSubmit={(val: any) => dispatch(createReport({ title: val, questionId: question._id }))} question={question} />

      <div><ExamHeader /></div>
      <div className="h-[94vh] flex flex-col overflow-hidden">
        <HeaderSection timeLeft={timeLeft} formatTime={formatTime} examName={exam?.examname} paperName={examData[0]?.questionPaper} />
        <div className="flex flex-col justify-between lg:flex-row flex-1">
          <div className="flex flex-col w-full">
            <SubjectTabs isSection={isSection} examSections={examSections} selectedSection={selectedSection} handleSection={handleSection} question={question} currentQuestionIndex={currentQuestionIndex} />
            <QuestionView question={question} examName={exam?.examname} paperName={examData[0]?.questionPaper} currentQuestionIndex={currentQuestionIndex} selectedsection={selectedSection} CurrentInput={CurrentInput} />
          </div>
          <RightSection userLogin={userLogin} totalNoOfQuestions={totalNoOfQuestions} currentStatus={currentStatus} currentQuestionIndex={currentQuestionIndex} getQuestionByNumberId={(n: number) => { setCurrentQuestionIndex(n); fetchQuestion(n + 1, selectedSection?.sectionId); }} isSection={isSection} selectedSection={examProgress} isTimeUp={isTimeUp} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t">
        <FooterActions handleClearResponse={handleClearResponse} handlePreviousQuestion={handlePreviousQuestion} handleNextQuestion={handleNextQuestion} handleSubmit={() => setShowSubmitPopup(true)} handleMarkForAnswerAndReview={handleMarkForAnswerAndReview} isTimeUp={isTimeUp} loder={loder} ReportQuestion={() => setShowPopup(true)} />
      </div>
    </>
  );
}