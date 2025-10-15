"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { BlockMath } from "react-katex";
import { createUserExam } from "@/api/Exam";
import { userExamResult, userQuestiongetQuestionById } from "@/api/Question";
import { useRouter } from "next/navigation";

// ---------------- Types ----------------
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

  const examSections: Section[] = examData?.[0]?.exam?.sections || [];

  const [selectedSection, setSelectedSection] = useState<Section | null>(
    examSections?.[0] || null
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(
    examSections?.[0]?.noOfQuestions || 0
  );

  const [question, setQuestion] = useState<any>(null);
  const [numericalValue, setNumericalValue] = useState("");
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- Effects ----------------
  useEffect(() => {
    if (singleQuestion && Array.isArray(singleQuestion) && singleQuestion.length > 0) {
      const q = singleQuestion[0];
      setQuestion(q);

      if (q.userAttempt === true && q.usergiven?.length > 0) {
        setMcqSelected(q.usergiven[0]?.userAnswer || null);
        if (q.usergiven[0]?.numericAnswer) {
          setNumericalValue(q.usergiven[0].numericAnswer);
        }
      }
    }
  }, [singleQuestion]);

  // ---------------- Handlers ----------------
  const handleKeyPress = useCallback((key: string) => {
    if (key === "Clear All") return setNumericalValue("");
    if (key === "⌫") return setNumericalValue((prev) => prev.slice(0, -1));
    if (/[0-9]/.test(key)) return setNumericalValue((prev) => prev + key);
  }, []);

  const handleClearResponse = useCallback(() => {
    setNumericalValue("");
    setMcqSelected(null);
  }, []);

  const handleSelectedSection = (section: Section) => {
    const index = examSections.findIndex((s) => s.sectionId === section.sectionId);
    setSelectedSection(section);
    setCurrentSectionIndex(index);
    setCurrentQuestionIndex(0);
    setTotalNoOfQuestions(section.noOfQuestions);
  };

  const handleNextQuestion = async () => {
    if (!singleQuestion || !Array.isArray(singleQuestion) || !singleQuestion[0]) {
      console.warn("No active question found");
      return;
    }

    const current = singleQuestion[0];
    const payload: any = {
      questionId: current._id,
      userId: userLogin?._id,
    };

    if (current.answerType === "Numeric") {
      payload.numericAnswer = numericalValue;
    } else {
      payload.userAnswer = mcqSelected;
    }

    try {
      await dispatch(createUserExam(payload));
    } catch (err) {
      console.error("Failed to save user answer:", err);
    }

    // Move to next question or section
    if (currentQuestionIndex + 1 < totalNoOfQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex + 1 < examSections.length) {
      const nextSection = examSections[currentSectionIndex + 1];
      setSelectedSection(nextSection);
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setTotalNoOfQuestions(nextSection.noOfQuestions);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = examSections[currentSectionIndex - 1];
      setSelectedSection(prevSection);
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(prevSection.noOfQuestions - 1);
      setTotalNoOfQuestions(prevSection.noOfQuestions);
    }
  };

  const getQuestionByNumberId = async (number: number) => {
    if (!selectedSection) return;
    setLoading(true);
    try {
      const payload:any = {
        questionNo: number + 1,
        questionPaperId: examData?.[0]?._id,
        section: selectedSection?.sectionId,
      };
      await dispatch(userQuestiongetQuestionById(payload));
      setCurrentQuestionIndex(number);
    } catch (err) {
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
     await await dispatch(userExamResult(examData));
      router.push(`result`);

    } catch (err) {
      console.error("Error submitting exam:", err);
    }
  };

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
      <MCQOptions
        options={question?.options || []}
        selected={mcqSelected}
        setSelected={setMcqSelected}
      />
    );
  }, [question, numericalValue, mcqSelected, handleKeyPress]);

  if (loading) return <div className="p-8 text-center">Loading question...</div>;
  if (!examData?.length) return <div className="p-8 text-center">No exam data found.</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {examSections.map((t) => (
            <Button
              key={t.sectionId}
              className={`rounded-t-lg ${
                t.sectionId === selectedSection?.sectionId
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleSelectedSection(t)}
            >
              {t.sectionDetail?.section || "Section"}
            </Button>
          ))}
        </div>
        <div className="text-red-600 font-bold">Time Left: 37:44</div>
      </header>

      {/* Main */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Question Panel */}
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

        {/* Side Panel */}
        <div className="lg:col-span-1 space-y-4 bg-white p-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-white text-2xl">
              {userLogin?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <p className="font-semibold">{userLogin?.username || "User"}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-2">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2 text-sm">
              {Array.from({ length: totalNoOfQuestions }, (_, idx) => (
                <Button
                  key={idx}
                  onClick={() => getQuestionByNumberId(idx)}
                  size="sm"
                  className={`w-8 h-8 rounded-full text-white font-bold p-0 ${
                    idx === currentQuestionIndex ? "bg-red-500" : "bg-gray-400"
                  }`}
                >
                  {idx + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 shadow-md flex flex-wrap gap-2 justify-between sticky bottom-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleNextQuestion}>
            Mark for Review & Next
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearResponse}>
            Clear Response
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handlePreviousQuestion}>
            Previous
          </Button>
          <Button onClick={handleNextQuestion}>Save & Next</Button>
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
    </div>
  );
}
