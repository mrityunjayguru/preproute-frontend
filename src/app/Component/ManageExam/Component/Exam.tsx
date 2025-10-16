"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { BlockMath } from "react-katex";
import { createUserExam } from "@/api/Exam";
import { userExamResult, userQuestiongetQuestionById } from "@/api/Question";
import { useRouter } from "next/navigation";
import StatusIndicators from "./StatusIndicators";
import OpenNewWindowButton from "./OpenNewWindowButton";

interface Option {
  _id: string;
  text: string;
  isCorrect?: boolean;
}

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

interface NumericalKeypadProps {
  value: string;
  onKeyPress: (key: string) => void;
}

interface MCQOptionsProps {
  options: Option[];
  selected: string | null;
  setSelected: (value: string) => void;
}

const statusColors: Record<string, string> = {
  answered: "#8BC34A",
  review: "#9C27B0",
  visited: "#F44336",
  notVisited: "#BDBDBD",
};

const pentagonShape = {
  clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 100%, 0% 100%)",
};

const circleShape = {
  borderRadius: "40%",
};

// ---------------- Numerical Keypad ----------------
const NumericalKeypad: React.FC<NumericalKeypadProps> = ({ value, onKeyPress }) => {
  const keys = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["Clear All", "0", "⌫"],
  ];

  return (
    <div className="max-w-xs mt-2">
      <input
        type="text"
        readOnly
        value={value}
        className="w-full h-10 mb-4 rounded-lg border border-gray-300 px-3 text-right text-lg font-mono focus:ring-2 focus:ring-red-500"
        placeholder="Enter answer"
      />
      <div className="grid grid-cols-3 gap-2">
        {keys.flat().map((key) => (
          <Button
            key={key}
            variant={["Clear All", "⌫"].includes(key) ? "secondary" : "outline"}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        ))}
      </div>
    </div>
  );
};

// ---------------- MCQ Options ----------------
const MCQOptions: React.FC<MCQOptionsProps> = ({ options, selected, setSelected }) => (
  <div className="space-y-3">
    {options.map((opt, idx) => (
      <div
        key={opt._id}
        onClick={() => setSelected(opt._id)}
        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
          selected === opt._id
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <span className="w-6 h-6 flex items-center justify-center mr-3 border-2 rounded-full font-bold text-gray-500">
          {String.fromCharCode(65 + idx)}
        </span>
        <span>{opt.text}</span>
      </div>
    ))}
  </div>
);

// ---------------- Main Exam UI ----------------
export default function ExamUI() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const examData = useSelector((state: any) => state.examType?.examDetail);
  const singleQuestion = useSelector((state: any) => state.question?.singleQuestion);
  const userLogin = useSelector((state: any) => state.Auth?.loginUser);

  const [isSection, setIsSection] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const exam = examData?.[0]?.exam || {};
  const examSections: Section[] = exam?.sections || [];

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [sectionQuestionStatus, setSectionQuestionStatus] = useState<Record<string, Record<number, string>>>({});
  const [examDuration, setExamDuration] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [switchable,setSwitchable]=useState<boolean>(false)
  const currentStatus = sectionQuestionStatus[selectedSection?.sectionId || "no-section"] || {};

  // ---------------- Setup ----------------
  useEffect(() => {
    if (!examData?.length) return;
    const examInfo = examData[0].exam;
    console.log(examInfo?.switchable,"examInfoexamInfo")
    setIsSection(examInfo.isSection);
    setSwitchable(examInfo?.switchable)
    // setSwitachable

    let totalDuration = 0;
    if (examInfo.isSection) {
      totalDuration = examInfo.sections?.reduce(
        (acc: number, sec: any) => acc + Number(sec.duration || 0),
        0
      );
    } else {
      totalDuration = Number(examInfo.fullExamduration || 0);
    }

    setExamDuration(totalDuration);
    setTimeLeft(totalDuration * 60); // Convert minutes → seconds

    if (examInfo.isSection) {
      const firstSection = examSections[0];
      setSelectedSection(firstSection);
      setTotalNoOfQuestions(firstSection?.noOfQuestions || 0);
      const payload: any = {
        questionNo: 1,
        questionPaperId: examData[0]._id,
        section: firstSection?.sectionId,
      };
      dispatch(userQuestiongetQuestionById(payload));
    } else {
      setTotalNoOfQuestions(Number(examInfo.noOfQuestions) || 0);
      const payload: any = {
        questionNo: 1,
        questionPaperId: examData[0]._id,
      };
      dispatch(userQuestiongetQuestionById(payload));
    }
  }, [examData]);

  // ---------------- Timer Countdown ----------------
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ---------------- Format Time ----------------
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ---------------- Sync Question ----------------
  useEffect(() => {
    if (singleQuestion?.[0]) {
      const q = singleQuestion[0];
      setQuestion(q);
      if (q.userAttempt && q.usergiven?.length > 0) {
        setMcqSelected(q.usergiven[0]?.userAnswer || null);
        setNumericalValue(q.usergiven[0]?.numericAnswer || "");
      }
    }
  }, [singleQuestion]);

  // ---------------- Handlers ----------------
  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((prev) => prev.slice(0, -1));
    if (/[0-9]/.test(key)) return setNumericalValue((prev) => prev + key);
  }, []);

  const handleClearResponse = () => {
    setNumericalValue("");
    setMcqSelected(null);
  };

  const updateStatus = (status: string) => {
    const sectionKey = isSection ? selectedSection?.sectionId : "no-section";
    if (!sectionKey) return;

    setSectionQuestionStatus((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [currentQuestionIndex]: status,
      },
    }));
  };

  const fetchQuestion = async (questionNo: number, sectionId?: string) => {
    const payload: any = {
      questionNo,
      questionPaperId: examData?.[0]?._id,
    };
    if (isSection) payload.section = sectionId;
    await dispatch(userQuestiongetQuestionById(payload));
  };

  const handleNextQuestion = async () => {
    if (!question) return;
    const payload: any = {
      questionId: question._id,
      userId: userLogin?._id,
    };
    if (question.answerType === "Numeric")
      payload.numericAnswer = numericalValue;
    else payload.userAnswer = mcqSelected;

    try {
      await dispatch(createUserExam(payload));
      updateStatus("answered");
    } catch (err) {
      console.error("Failed to save user answer:", err);
    }

    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      const next = currentQuestionIndex + 1;
      setCurrentQuestionIndex(next);
      await fetchQuestion(next + 1, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex + 1 < examSections.length) {
      const nextSection = examSections[currentSectionIndex + 1];
      setSelectedSection(nextSection);
      setCurrentSectionIndex((p) => p + 1);
      setCurrentQuestionIndex(0);
      setTotalNoOfQuestions(nextSection.noOfQuestions);
      await fetchQuestion(1, nextSection.sectionId);
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      const prev = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prev);
      await fetchQuestion(prev + 1, selectedSection?.sectionId);
    } else if (isSection && currentSectionIndex > 0) {
      const prevSection = examSections[currentSectionIndex - 1];
      setSelectedSection(prevSection);
      setCurrentSectionIndex((p) => p - 1);
      setCurrentQuestionIndex(prevSection.noOfQuestions - 1);
      setTotalNoOfQuestions(prevSection.noOfQuestions);
      await fetchQuestion(prevSection.noOfQuestions, prevSection.sectionId);
    }
  };

  const handleMarkForReview = () => {
    updateStatus("review");
    handleNextQuestion();
  };

  const handleSubmit = async () => {
    try {
      await dispatch(userExamResult(examData));
      router.push("result");
    } catch (err) {
      console.error("Error submitting exam:", err);
    }
  };

  const getQuestionByNumberId = async (number: number) => {
    setCurrentQuestionIndex(number);
    await fetchQuestion(number + 1, selectedSection?.sectionId);
    updateStatus("visited");
  };
const handleSection=(t:any)=>{
  if(switchable){
setSelectedSection(t);
      setCurrentSectionIndex(
       examSections.findIndex((s) => s.sectionId === t.sectionId)
       );
      setCurrentQuestionIndex(0);
      setTotalNoOfQuestions(t.noOfQuestions);
       fetchQuestion(1, t.sectionId);
  }else{
    alert("not allow to switch section till not completed")
  }
      
}
  // ---------------- Render Question ----------------
  const renderPreview = () => {
    if (!question?.questionText) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(question.questionText, "text/html");
    return Array.from(doc.body.childNodes).map((node, i) => {
      if (node.nodeType === 1 && (node as HTMLElement).classList.contains("latex-span")) {
        return <BlockMath key={i} math={(node as HTMLElement).dataset.tex || ""} />;
      } else if (node.nodeType === 1) {
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: (node as HTMLElement).outerHTML }}
          />
        );
      } else if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }
      return null;
    });
  };

  const CurrentInput = useMemo(() => {
    if (!question) return null;
    return question.answerType === "Numeric" ? (
      <NumericalKeypad value={numericalValue} onKeyPress={handleKeyPress} />
    ) : (
      <MCQOptions options={question?.options || []} selected={mcqSelected} setSelected={setMcqSelected} />
    );
  }, [question, numericalValue, mcqSelected, handleKeyPress]);

  if (loading) return <div className="p-8 text-center">Loading question...</div>;
  if (!examData?.length) return <div className="p-8 text-center">No exam data found.</div>;

  return (
    <>
    {/* <OpenNewWindowButton/> */}
      <div className="min-h-screen flex justify-between bg-white">
        <div className="bg-white p-4 w-full">
          <div className="w-full flex justify-between">
            {isSection ? (
              <div className="flex items-center gap-3">
                {examSections.map((t) => (
                  <Button
                    key={t.sectionId}
                    className={`rounded-t-lg ${
                      t.sectionId === selectedSection?.sectionId
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleSection(t)}
                    disabled={!isTimeUp}
                  >
                    {t.sectionDetail?.section || "Section"}
                  </Button>
                ))}
              </div>
            ) : null}

            <div
              className={`font-bold ${
                timeLeft < 60 ? "text-red-600" : "text-green-600"
              }`}
            >
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="lg:col-span-3 p-4">
            <p className="text-sm text-black font-bold bg-gray-100 p-3 rounded">
              {examData[0]?.exam?.examname} – {examData[0]?.questionPaper}
            </p>
            <p className="text-black font-bold text-lg mb-4">
              Question: {currentQuestionIndex + 1}
            </p>
            <div className="mb-6">{renderPreview()}</div>
            {CurrentInput}
          </div>
        </div>

        <main>
          <div className="lg:col-span-1 space-y-4 bg-white p-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-white text-2xl">
                {userLogin?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <p className="font-semibold">{userLogin?.username || "User"}</p>
            </div>

            <div>
              <div className="mt-4">
                <StatusIndicators />
              </div>
              <h3 className="text-sm font-bold text-gray-500 mb-2">
                Question Palette{" "}
                {isSection ? `(${selectedSection?.sectionDetail?.section})` : ""}
              </h3>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {Array.from({ length: totalNoOfQuestions }, (_, idx) => {
                  let bgColor = statusColors.notVisited;
                  let shapeStyle: any = pentagonShape;
                  if (currentStatus[idx] === "answered") bgColor = statusColors.answered;
                  else if (currentStatus[idx] === "review") {
                    bgColor = statusColors.review;
                    shapeStyle = circleShape;
                  } else if (idx === currentQuestionIndex) bgColor = statusColors.visited;
                  else if (currentStatus[idx] === "visited") bgColor = statusColors.visited;

                  return (
                    <Button
                      key={idx}
                      onClick={() => getQuestionByNumberId(idx)}
                      size="sm"
                      className="w-8 h-8 font-bold p-0 text-white border-none"
                      style={{
                        backgroundColor: bgColor,
                        ...shapeStyle,
                      }}
                      disabled={!isTimeUp}
                    >
                      {idx + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white p-4 shadow-md flex flex-wrap gap-2 justify-between sticky bottom-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkForReview} disabled={!isTimeUp}>
            Mark for Review & Next
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearResponse} disabled={!isTimeUp}>
            Clear Response
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handlePreviousQuestion} disabled={!isTimeUp}>
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={!isTimeUp}>
            Save & Next
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          variant="destructive"
          size="lg"
          className="w-full sm:w-auto"
        >
          Submit
        </Button>
      </footer>
    </>
  );
}
