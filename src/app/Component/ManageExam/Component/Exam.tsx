"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { BlockMath } from "react-katex";
import { createUserExam, handleGivenExam, setCurrentSection } from "@/api/Exam";
import { clearQuestionResponce, userExamResult, userQuestiongetQuestionById } from "@/api/Question";

import HeaderSection from "./HeaderSection";
import QuestionView from "./QuestionView";
import RightSection from "./RightSection";
import FooterActions from "./FooterActions";
import { NumericalKeypad } from "./NumericalKeypad";
import { MCQOptions } from "./MCQOptions";
import { createReport, updaquesPaperTime } from "@/api/Users";
import ExamHeader from "./ExamHeader";
import Popup from "./Report";
import InstructionPaeg from "./InstructionPaeg";
import { questionPaper } from "@/api/endPoints";
import TabSwitchWarning from "./TabSwitchWarning";
import SectionRestrictionPopup from "./Popup/SectionRestrictionPopup";
import SubmitExamPopup from "./Popup/SubmitExamPopup";

interface SectionDetail {
  _id: string;
  section: string;
}

interface Section {
  sectionId: string;
  sectionDetail: SectionDetail;
  noOfQuestions: number;
  duration?: number;
}

export default function ExamUI() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const examData = useSelector((state: any) => state.examType?.examDetail);
  
  const singleQuestion = useSelector(
    (state: any) => state.question?.singleQuestion
  );
  const userLogin = useSelector((state: any) => state.Auth?.loginUser);
  const givenExam = useSelector((state: any) => state.exam?.givenExam);
  const [isSection, setIsSection] = useState(false);
  const [switchable, setSwitchable] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [question, setQuestion] = useState<any>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [loder,setloder]=useState<boolean>(false)
  const currentSectionId = useSelector(state => state.exam.currentSectionId);
  const [sectionQuestionStatus, setSectionQuestionStatus] = useState<
    Record<string, Record<number, string>>
  >({});
  const [timeLeft, setTimeLeft] = useState(1);
  const [isTimeUp, setIsTimeUp] = useState(false);
const [showPopup, setShowPopup] = useState(false);
  const exam = examData?.[0]?.exam || {};
  const examSections: Section[] = exam?.sections || [];
  // alert(JSON.stringify(givenExam))
  const currentStatus =
    givenExam[currentSectionId?.sectionId || "no-section"] || {};
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(
    null
  )

  const getISTDate = () => {
    const date = new Date();
    const utcOffsetInMinutes = 5 * 60 + 30; // IST is UTC + 5:30
    const istDate = new Date(date.getTime() + utcOffsetInMinutes * 60000);
    return istDate;
  };
  // ---------------- Setup Exam ----------------
 // ---------------- Setup Exam ----------------
 useEffect(()=>{
  if(selectedSection?.sectionId){
  const payload:any={
    sectionId:selectedSection?.sectionId,
    currentQuestionIndex:currentQuestionIndex
  }
dispatch(setCurrentSection(payload))
  }

 },[selectedSection,currentQuestionIndex])
useEffect(() => {
  if (!examData?.length) return;

  const examInfo = examData[0].exam;

  setIsSection(examInfo.isSection);
  setSwitchable(examInfo?.switchable);

  // ⏳ GET SAVED TIME FROM LOCAL STORAGE
  const savedTime = localStorage.getItem("exam_timeLeft");

  if (savedTime) {
    // ⬇️ Restore timer from last saved state
    setTimeLeft(Number(savedTime));
  } else {
    // ⬇️ Fresh exam start
    if (examInfo.switchable === true) {
      setTimeLeft(examInfo.fullExamduration * 60);
    } else {
      const totalDuration = examInfo.isSection
        ? examInfo.sections[0].duration
        : Number(examInfo.fullExamduration || 0);

      setTimeLeft(totalDuration * 60);
    }
  }

  // ⬇️ Load First Question Logic
if (examInfo.isSection && examSections.length) {
  const firstSection:any = examSections[0];

  // STEP 1: Set section only once (when NOT already selected)
  if (!currentSectionId?.sectionId) {
    setSelectedSection(firstSection);

    // setRedux
    dispatch(setCurrentSection(firstSection.sectionId));

    // default question index 0
    // dispatch(setcurrentse(0));
    setCurrentQuestionIndex(0);
  }

  // STEP 2: Set total questions based on ACTIVE section
  const activeSectionId =
    currentSectionId?.sectionId || firstSection.sectionId;

  const activeSection = examSections.find(
    (s) => s.sectionId === activeSectionId
  );

  setTotalNoOfQuestions(activeSection?.noOfQuestions || 0);

  // STEP 3: Fetch ONLY if we have section + question index
  if (currentSectionId?.sectionId) {
    setCurrentQuestionIndex(currentSectionId?.currentQuestionIndex )
    fetchQuestion(
      currentSectionId.currentQuestionIndex || 0,
      currentSectionId.sectionId
    );
  }

  // STEP 4: Store start time ONLY once (not every render)
  if (!localStorage.getItem("sectionStartTime_" + firstSection.sectionId)) {
    const payload:any = {
      questionPaperId: examData?.[0]?._id,
      sectionWise: [
        {
          sectionId: firstSection.sectionId,
          startTime: getISTDate(),
        },
      ],
    };

    dispatch(updaquesPaperTime(payload));
    localStorage.setItem(
      "sectionStartTime_" + firstSection.sectionId,
      "1"
    );
  }
}
else {
    setTotalNoOfQuestions(Number(examInfo.noOfQuestions) || 0);
    fetchQuestion(1);
  }
}, [examData]);


  // ---------------- Timer Countdown ----------------
  useEffect(() => {
    if (timeLeft === 0) {
      if (isSection && currentSectionIndex + 1 < examSections.length) {
        const prevSectionId = selectedSection?.sectionId;
        const nextSection: any = examSections[currentSectionIndex + 1];
setIsTimeUp(true)
        // ✅ Update backend with section timing
        updateSectionTime(prevSectionId, nextSection.sectionId);

        // Switch section
        setSelectedSection(nextSection);
        setTimeLeft(nextSection.duration * 60);
        setCurrentSectionIndex((p) => p + 1);
        setCurrentQuestionIndex(0);
        setTotalNoOfQuestions(nextSection.noOfQuestions);
        fetchQuestion(1, nextSection.sectionId);
      }
      handleSubmitFullExam()
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      localStorage.setItem("exam_timeLeft", timeLeft.toString());
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {

  }, [isTimeUp]);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
// useEffect(()=>{
//   if(currentSectionId?.sectionId){
//   setSelectedSection(currentSectionId)

//   }
// },[currentSectionId])
  // ---------------- Sync Question ----------------
  useEffect(() => {
    if (!singleQuestion?.[0]) return;
    const q = singleQuestion[0];
    setQuestion(q);
    // Start timer when question is displayed
    setQuestionStartTime(Date.now());
    if (q.userAttempted && q.usergiven?.length) {
      setMcqSelected(q.usergiven[0]?.userAnswer || null);
      setNumericalValue(q.usergiven[0]?.numericAnswer || "");
    }
  }, [singleQuestion]);

  // ---------------- Handlers ----------------
  const fetchQuestion = async (questionNo: number, sectionId?: string) => {
    const payload: any = { questionNo, questionPaperId: examData?.[0]?._id };
    if (isSection) payload.section = sectionId;
    await dispatch(userQuestiongetQuestionById(payload));
  };

  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((prev) => prev.slice(0, -1));
    if (/[0-9]/.test(key)) return setNumericalValue((prev) => prev + key);
  }, []);

  const updateStatus = (status: string) => { 
    const sectionKey = isSection ? selectedSection?.sectionId : "no-section";
    if (!sectionKey) return;
    setSectionQuestionStatus((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [currentQuestionIndex]: status },
    }));
     const payload:any = {
    sectionId: sectionKey,
    questionIndex: currentQuestionIndex,
    status: status,
  };

  // 🔹 Dispatch Redux Action
    dispatch(handleGivenExam(payload))
  };
  const handleNextQuestion = async () => {
    // alert(mcqSelected)
    setloder(true)
  if (!question || (!mcqSelected && !numericalValue)){
      updateStatus("visited");
      if (currentQuestionIndex + 1 < totalNoOfQuestions) {
         console.log("true")
       
        setCurrentQuestionIndex((p) => p + 1);
        fetchQuestion(currentQuestionIndex + 2, selectedSection?.sectionId);
      } else if (isSection && currentSectionIndex + 1 < examSections.length) {
       
        const nextSection: any = examSections[currentSectionIndex + 1];
        // console.log(nextSection,"nextSectionnextSection")
        if(switchable==false){
        setTimeLeft(nextSection?.duration * 60);
        }
        setSelectedSection(nextSection);
        setCurrentSectionIndex((p) => p + 1);
        setCurrentQuestionIndex(0);
        setTotalNoOfQuestions(nextSection.noOfQuestions);
        fetchQuestion(1, nextSection.sectionId);
        await updateSectionTime(
          selectedSection?.sectionId,
          nextSection.sectionId
        );
      }
    setloder(false)
      return;
    }

    const endTime = Date.now();
    const timeTaken = questionStartTime
      ? Math.floor((endTime - questionStartTime) / 1000)
      : 0; // seconds
    const payload: any = {
      questionId: question._id,
      userId: userLogin?._id,
      timeTaken: timeTaken,
      questionPaperId: examData?.[0]?._id,
    };
    question.answerType === "Numeric"
      ? (payload.numericAnswer = numericalValue)
      : (payload.userAnswer = mcqSelected);

    try {
      await dispatch(createUserExam(payload));
      updateStatus("answered");

    } catch (err) {
      console.error("Failed to save user answer:", err);
    }
    setQuestionStartTime(Date.now());
    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      setCurrentQuestionIndex((p) => p + 1);
      fetchQuestion(currentQuestionIndex + 2, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex + 1 < examSections.length) {
      const nextSection = examSections[currentSectionIndex + 1];
      setSelectedSection(nextSection);
      setCurrentSectionIndex((p) => p + 1);
      setCurrentQuestionIndex(0);
      setTotalNoOfQuestions(nextSection.noOfQuestions);
      fetchQuestion(1, nextSection.sectionId);
    }
    setloder(false)

  };

  const handlePreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
      fetchQuestion(currentQuestionIndex, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex > 0) {
      // const prevSection = examSections[currentSectionIndex - 1];
      // setSelectedSection(prevSection);
      // setCurrentSectionIndex((p) => p - 1);
      // setCurrentQuestionIndex(prevSection.noOfQuestions - 1);
      // setTotalNoOfQuestions(prevSection.noOfQuestions);
      // fetchQuestion(prevSection.noOfQuestions, prevSection.sectionId);
    }
  };

  const handleMarkForReview = () => {
    updateStatus("review");
    // handleNextQuestion();
    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      setCurrentQuestionIndex((p) => p + 1);
      fetchQuestion(currentQuestionIndex + 2, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex + 1 < examSections.length) {
      const nextSection = examSections[currentSectionIndex + 1];
      setSelectedSection(nextSection);
      setCurrentSectionIndex((p) => p + 1);
      setCurrentQuestionIndex(0);
      setTotalNoOfQuestions(nextSection.noOfQuestions);
      fetchQuestion(1, nextSection.sectionId);
    }
  };

  const handleClearResponse =async () => {
    const payload:any={
      questionPaperId:question?._id
    }
    await dispatch(clearQuestionResponce(payload))
     setMcqSelected("")
    updateStatus("visited");
    setNumericalValue("");
    setMcqSelected(null);
    setNumericalValue("")
  };

const handleSubmit = async (confirm?: boolean) => {
  
  // Step 1 → If confirm is undefined → means user clicked submit button.
    setShowSubmitPopup(true);
  

  if (confirm === false) {
    setShowSubmitPopup(false);
    return;
  }

  // Step 3 → User clicked "Yes, Submit"
  try {
    // await updateSectionTime(null, selectedSection?.sectionId);
    // await dispatch(userExamResult(examData));
    // router.push("result");
  } catch (err) {
    console.error("Error submitting exam:", err);
  }
};

const handleSubmitExamPopup=(val:any)=>{
  handleSubmitFullExam()
}


const handleSubmitFullExam = async () => {
  try {
    await updateSectionTime(null, selectedSection?.sectionId);
    await dispatch(userExamResult(examData));
    window.open("", "_self");
    window.close();
    window.open("/Exam/result", "_blank");
  } catch (err) {
    console.error("Error submitting exam:", err);
  }
};


 useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      router.replace("/dashboard"); // force redirect
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);
  useEffect(() => {
    history.pushState(null, "", location.href);

    const preventBack = () => {
      history.pushState(null, "", location.href);
    };

    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  const getQuestionByNumberId = async (number: number) => {
    setCurrentQuestionIndex(number);
     await fetchQuestion(number + 1, selectedSection?.sectionId);
    // updateStatus("visited");
  };
  useEffect(()=>{
    // console.log(question,"questionquestion")
if(question?.userAttempted){
    updateStatus("answered");
}else{
    setMcqSelected("")
    setNumericalValue("")

    updateStatus("visited");
}
  },[question])

  // Helper to get IST Date

  // ⏱️ Update section times API call
  const updateSectionTime = async (
    prevSectionId?: any,
    newSectionId?: string
  ) => {
    const payload: any = {
      questionPaperId: examData?.[0]?._id,
      userId: userLogin?._id,
      sectionWise: [],
    };

    // ⏳ Mark previous section end time
    if (prevSectionId) {
      payload.sectionWise.push({
        sectionId: prevSectionId,
        endTime: getISTDate(),
      });
    }

    // 🟢 Mark new section start time
    if (newSectionId) {
      payload.sectionWise.push({
        sectionId: newSectionId,
        startTime: getISTDate(),
      });
    }

    try {
      await dispatch(updaquesPaperTime(payload));
    } catch (err) {
      console.error("Failed to update section time:", err);
    }
  };

  // 🧭 Handle manual section change
  const handleSection = async (section: Section) => {
    if (!switchable){
  setSectionShowPopup(true)
      return 
    }
  

    const prevSectionId = selectedSection?.sectionId;
    const newSectionId = section.sectionId;

    // ✅ Call backend API for start/end time tracking
    await updateSectionTime(prevSectionId, newSectionId);
    // Update local states
    setSelectedSection(section);
    setCurrentSectionIndex(
      examSections.findIndex((s) => s.sectionId === newSectionId)
    );
    setCurrentQuestionIndex(0);
    setTotalNoOfQuestions(section.noOfQuestions);
    fetchQuestion(1, newSectionId);
  };

  const ReportQuestion=()=>{
    setShowPopup(true);
  }
const submitReport=async(val:any)=>{
  const payload:any={
    title:val,
    questionId:question._id,
  }
  await dispatch(createReport(payload))
    setShowPopup(false);
}
  const CurrentInput = useMemo(() => {
    if (!question) return null;
    return question.answerType === "Numeric" ? (
      <NumericalKeypad value={numericalValue} onKeyPress={handleKeyPress} />
    ) : (
      <MCQOptions
        options={question?.options || []}
        selected={mcqSelected}
        setSelected={setMcqSelected}
      />
    );
  }, [question, numericalValue, mcqSelected, handleKeyPress]);

  if (!examData?.length)
    return <div className="p-8 text-center">No exam data found.</div>;
 const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched/minimized tab
        localStorage.setItem("tabSwitch", "true");
      } else {
        // When user comes back
        if (localStorage.getItem("tabSwitch") === "true") {
          setShowWarning(true);
          localStorage.removeItem("tabSwitch");
        }
      }
    };

    const handleBlur = () => {
      localStorage.setItem("tabSwitch", "true");
    };

    const handleFocus = () => {
      if (localStorage.getItem("tabSwitch") === "true") {
        setShowWarning(true);
        localStorage.removeItem("tabSwitch");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
const [sectionShowPopup, setSectionShowPopup] = useState(false);
// alert(examData[0]?.exam?.examname)
  return (
    <>
     {showSubmitPopup && (
      <SubmitExamPopup
        onClose={() => setShowSubmitPopup(false)}
        onConfirm={handleSubmitExamPopup}
      />
    )}
     {sectionShowPopup && (
        <SectionRestrictionPopup  examname={examData[0]?.exam?.examname} onClose={() => setSectionShowPopup(false)} />
      )}
    {showWarning && (
        <TabSwitchWarning onClose={() => setShowWarning(false)} />
      )}

      <Popup
        title="Submit Report"
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={submitReport}
        question={question}
      />
      <div>
        <ExamHeader />
      </div>

      <div className="flex flex-col min-h-screen sm:px-0 lg:px-20 my-5">
        <HeaderSection
          isSection={isSection}
          examSections={examSections}
          selectedSection={currentSectionId}
          handleSection={handleSection}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />

        <div className="flex flex-col lg:flex-row flex-1">
          <QuestionView
            question={question}
            examName={examData[0]?.exam?.examname}
            paperName={examData[0]?.questionPaper}
            currentQuestionIndex={currentQuestionIndex}
            CurrentInput={CurrentInput}
          />

          <RightSection
            userLogin={userLogin}
            totalNoOfQuestions={totalNoOfQuestions}
            currentStatus={currentStatus}
            currentQuestionIndex={currentQuestionIndex}
            getQuestionByNumberId={getQuestionByNumberId}
            isSection={isSection}
            selectedSection={selectedSection}
            isTimeUp={isTimeUp}
          />
        </div>

        <FooterActions
          handleMarkForReview={handleMarkForReview}
          handleClearResponse={handleClearResponse}
          handlePreviousQuestion={handlePreviousQuestion}
          handleNextQuestion={handleNextQuestion}
          handleSubmit={handleSubmit}
          isTimeUp={isTimeUp}
          loder={loder}
          ReportQuestion={ReportQuestion}
        />
      </div>
    </>
  );
}
