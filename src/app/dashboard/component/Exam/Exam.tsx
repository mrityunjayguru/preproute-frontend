"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Check, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createQuestion, getQuestionById, handleUpdateQuestion } from "@/api/Question";
import { getTopic } from "@/api/Topic";
import { getSubTopicByTopicId } from "@/api/subTopic";
import OptionWithLatex from "./OptionWithLatex";
import QuestionWithOptionsEditor from "./Component/LatexCode";
import LatexForSoluction from "./Component/LatexForSoluction";
import { Input } from "@/components/ui/input";

type AnswerType = "Numeric" | "MCQ";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  label: string;
}

const Exam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux data
  const selectedexam = useSelector((state: any) => state?.exam?.selectedexam);
  const selectedExamDetail = useSelector((state: any) => state?.exam?.selectedExamDetail);
  const topic = useSelector((state: any) => state?.topic?.topic);
  const subtopicData = useSelector((state: any) => state?.subTopic?.subTopic);
  const singleQuestion=useSelector((state:any)=>state.question.singleQuestion)
  // Local state
  const [questionData, setQuestionData] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("Easy");
  const [answerType, setAnswerType] = useState<AnswerType>("MCQ");
  const [hintText, setHintText] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [selectedSectionData, setSelectedSectionData] = useState<any>(null);
  const [numericAnswer,setNumericAnswer]=useState<Number>(0)

  const sectionsData = selectedExamDetail[0]?.examDetail?.sections || [];
  const sectionNames = sectionsData.map((sec: any) => sec.sectiontype);

  useEffect(()=>{
    console.log(singleQuestion,"singleQuestionsingleQuestion")
if(singleQuestion && singleQuestion.length>0){
  setAnswerType(singleQuestion[0]?.answerType)
  setQuestionType(singleQuestion[0]?.questionType)
  setActiveSection(singleQuestion[0]?.section)
  setQuestionData(singleQuestion[0]?.questionText)
  setHintText(singleQuestion[0]?.hint)
  setSelectedTopic(singleQuestion[0]?.topicId)
  setSelectedSubtopic(singleQuestion[0]?.subtopicId)
  setNumericAnswer(singleQuestion[0]?.numericAnswer)
}else{
setQuestionData("")
  setSelectedTopic("")
  setSelectedSubtopic("")
}
  },[singleQuestion])

  useEffect(() => {
    if (sectionNames.length > 0) {
      setActiveSection(sectionNames[0]);
    }
    getTopicData();
  }, []);

  // Fetch Topics
  const getTopicData = async () => {
    try {
      const payload:any={}
      await dispatch(getTopic(payload));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Subtopics when Topic changes
  useEffect(() => {
    if (selectedTopic) {
      const payload:any={
         topicId: selectedTopic 
      }
      dispatch(getSubTopicByTopicId(payload));
    }
  }, [selectedTopic, dispatch]);

  // Default options
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: true, label: "1st" },
    { id: 2, text: "", isCorrect: false, label: "2nd" },
    { id: 3, text: "", isCorrect: false, label: "3rd" },
    { id: 4, text: "", isCorrect: false, label: "4th" },
  ]);

  const handleOptionTextChange = (id: number, newText: string) => {
    setOptions((opts) => opts.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt)));
  };

  const handleCorrectToggle = (id: number) => {
    setOptions((opts) => opts.map((opt) => ({ ...opt, isCorrect: opt.id === id })));
  };

  const totalQuestions = selectedSectionData?.noOfQuestions || 10;
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  // Submit
const handleSubmit = async () => {
  try {
    // ✅ Extract correct answer
    const correctAnswer = options.find((opt) => opt.isCorrect)?.text || "";

    // ✅ Build clean payload for backend schema
    const payload:any = {
      questionPaperId: selectedExamDetail[0]?._id, // The question paper ID
      section: activeSection,                      // Section ObjectId
      topicId: selectedTopic || null,              // Optional
      subtopicId: selectedSubtopic || null ,        // Optional
      questionNo: activeQuestion,
      questionText: questionData,                  // HTML + LaTeX
      questionType: questionType,                  // Easy / Medium / Hard
      answerType: answerType,                      // MCQ / Numeric
      numericAnswer:numericAnswer,    
      options:
        answerType === "MCQ"
          ? options.map((opt) => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))
          : [],
      correctAnswer:
        answerType === "Numeric"
          ? correctAnswer
          : options.find((opt) => opt.isCorrect)?.text || "",
      hint: hintText,
      createdBy: "6710fbc3f2b9b9e...", // replace with logged-in user ID
    };

    if(singleQuestion && singleQuestion.length>0){
    payload._id=singleQuestion[0]._id
    await dispatch(handleUpdateQuestion(payload))
    }else{
    await dispatch(createQuestion(payload));
  setSelectedTopic("")
  setSelectedSubtopic("")
    }
  } catch (err) {
    console.error("Error creating question:", err);
  }
};
const handleActiveQuestion=(val:any)=>{
  const payload:any={
    questionNo:val,
    questionPaperId: selectedExamDetail[0]?._id, // The question paper ID
    section: activeSection, 
  }
  dispatch(getQuestionById(payload))
  setActiveQuestion(val)
}
useEffect(() => {
  if (singleQuestion && singleQuestion.length > 0) {
    const q = singleQuestion[0];

    setAnswerType(q.answerType || "MCQ");
    setQuestionType(q.questionType || "Easy");
    setActiveSection(q.section || "");
    setQuestionData(q.questionText || "");
    setHintText(q.hint || "");

    // ✅ Set options (for MCQ)
    if (q.answerType === "MCQ" && Array.isArray(q.options)) {
      setOptions(
        q.options.map((opt: any, index: number) => ({
          id: index + 1,
          text: opt.text || "",
          isCorrect: opt.isCorrect || false,
          label: `${index + 1}${getOrdinalSuffix(index + 1)}`, // “1st”, “2nd”, etc.
        }))
      );
    } else {
      // For non-MCQ questions, clear options
      setOptions([
        { id: 1, text: "", isCorrect: true, label: "1st" },
        { id: 2, text: "", isCorrect: false, label: "2nd" },
        { id: 3, text: "", isCorrect: false, label: "3rd" },
        { id: 4, text: "", isCorrect: false, label: "4th" },
      ]);
    }
  } else {
    // ✅ Reset all states when no question found
    setQuestionData("");
    setHintText("");
    setOptions([
      { id: 1, text: "", isCorrect: true, label: "1st" },
      { id: 2, text: "", isCorrect: false, label: "2nd" },
      { id: 3, text: "", isCorrect: false, label: "3rd" },
      { id: 4, text: "", isCorrect: false, label: "4th" },
    ]);
  }
}, [singleQuestion]);
const getOrdinalSuffix = (n: number) => {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
};


const handleActiveSection=(val:any)=>{
  setActiveQuestion(1)
    setActiveSection(val.sectionId);
    setSelectedSectionData(val);
     const payload:any={
    questionNo:1,
    questionPaperId: selectedExamDetail[0]?._id, // The question paper ID
    section: val.sectionId, 
  }
  dispatch(getQuestionById(payload))
}
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
          <div className="flex space-x-2">
            {sectionsData.map((section: any) => (
              <button
                key={section.sectionId}
                onClick={() => handleActiveSection(section)}
                className={`w-24 h-12 text-lg font-semibold rounded-lg transition-colors ${
                  section.sectionId === activeSection
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {section?.sectionDetail?.section}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-500 mr-2">Exam:</span>
              <span className="font-bold text-lg text-red-500">
                {selectedExamDetail[0]?.examDetail?.examname} -{" "}
                {selectedExamDetail[0]?.questionPapername}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Save And Process
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-white shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Question No. {activeQuestion}</h2>

              {/* Topic/Subtopic */}
              <div className="flex flex-wrap gap-4">
                {/* Topic */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-700">Topic</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value);
                      setSelectedSubtopic("");
                    }}
                    className="w-full mt-1 border border-gray-200 rounded-lg p-2"
                  >
                    <option value="">-- Select Topic --</option>
                    {topic.map((t: any) => (
                      <option key={t._id} value={t._id}>
                        {t.topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subtopic */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-700">Subtopic</label>
                  <select
                    value={selectedSubtopic}
                    onChange={(e) => setSelectedSubtopic(e.target.value)}
                    className="w-full mt-1 border border-gray-200 rounded-lg p-2"
                  >
                    <option value="">-- Select Subtopic --</option>
                    {subtopicData.map((sub: any) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.subtopic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Type */}
              <div className="flex flex-col pt-4">
                <span className="text-sm font-semibold text-gray-700 mb-2">Question Type</span>
                <div className="flex items-center space-x-6">
                  {["Easy", "Medium", "Hard"].map((type) => (
                    <label key={type} className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="questionType"
                        value={type}
                        checked={questionType === type}
                        onChange={() => setQuestionType(type)}
                        className="accent-red-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question Editor */}
              <QuestionWithOptionsEditor value={questionData} onChange={setQuestionData} />

              {/* Answer Type */}
              <div className="flex items-center space-x-6 pt-4">
                <span className="text-base font-semibold text-gray-700">Answer:</span>
                <div className="flex items-center space-x-4">
                  {["Numeric", "MCQ"].map((type) => (
                    <label key={type} className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="answerType"
                        value={type}
                        checked={answerType === type}
                        onChange={() => setAnswerType(type as AnswerType)}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Options */}
              {answerType === "MCQ" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 pt-4">
                  {options.map((opt) => (
                    <OptionWithLatex
                      key={opt.id}
                      choice={opt.label}
                      value={opt.text}
                      isCorrect={opt.isCorrect}
                      onChange={(html) => handleOptionTextChange(opt.id, html)}
                      onCheckToggle={() => handleCorrectToggle(opt.id)}
                    />
                  ))}
                </div>
              )}
                {answerType === "Numeric" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 pt-4">
                 <Input value={numericAnswer} onChange={(e)=>setNumericAnswer(e.target.value)} type="number" placeholder="Enter Value" />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Question Navigation */}
            <div className="rounded-xl bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Go to Question No.</h3>
              <div className="grid grid-cols-5 gap-3">
                {questionNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleActiveQuestion(num)}
                    className={`h-10 w-10 rounded-full font-bold transition-colors ${
                      num === activeQuestion
                        ? "bg-red-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div className="rounded-xl bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Soluction</h3>
              {/* <textarea
                placeholder="Enter Hint"
                rows={6}
                value={hintText}
                onChange={(e) => setHintText(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 resize-none"
              /> */}
              <LatexForSoluction value={hintText} onChange={setHintText} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
