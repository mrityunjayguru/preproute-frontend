"use client";

import React, { useState, ChangeEvent } from "react";
import { Check, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createQuestion } from "@/api/Question";
import MathEditor from "./Quil";
import OptionWithLatex from "./OptionWithLatex"
import RichTextEditor from "./Component/RichTextEditor";
import QuestionWithOptionsEditor from "./Component/LatexCode";

type AnswerType = "Numeric" | "MCQ";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  label: string;
}

interface Topic {
  id: string;
  topictype: string;
  sectionId: string;
}

interface Subtopic {
  id: string;
  subtopictype: string;
  topic?: Topic;
}

interface AnswerOptionProps {
  choice: string;
  value: string;
  isCorrect: boolean;
  onCheckToggle: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  choice,
  value,
  isCorrect,
  onCheckToggle,
  onChange,
}) => (
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2">
      <input
        className="flex h-10 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        placeholder={`${choice} Choice`}
        value={value}
        onChange={onChange}
      />
      <div
        className={`flex items-center space-x-1 cursor-pointer p-2 rounded-lg ${
          isCorrect
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
        onClick={onCheckToggle}
      >
        {isCorrect ? (
          <Check className="w-4 h-4" />
        ) : (
          <Minus className="w-4 h-4 opacity-0" />
        )}
        <span className="text-sm font-semibold">
          {isCorrect ? "Marked Correct" : "Mark Correct"}
        </span>
      </div>
    </div>
  </div>
);

const Exam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedexam = useSelector((state: any) => state?.exam?.selectedexam);
  const selectedExamDetail = useSelector((state: any) => state?.exam?.selectedExamDetail);

  
  console.log("selectedExamDetailselectedExamDetail:", selectedExamDetail);
  const [questionData, setQuestionData] = useState({})

  const sectionsData = selectedexam?.sections || [];
  const topicsData: Topic[] = selectedexam?.topics || [];
  const subtopicsData: Subtopic[] = selectedexam?.subtopics || [];
 const [question, setQuestion] = useState<string>("");
  const sectionNames = sectionsData.map((sec: any) => sec.sectiontype);
  const [activeSection, setActiveSection] = useState<string>(
    sectionNames[0] || ""
  );
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [answerType, setAnswerType] = useState<AnswerType>("MCQ");

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("Easy"); // ✅ radio buttons

  const [questionText, setQuestionText] = useState<string>("");
  const [hintText, setHintText] = useState<string>("");

  const initialOptions: Option[] = [
    { id: 1, text: "", isCorrect: true, label: "1st" },
    { id: 2, text: "", isCorrect: false, label: "2nd" },
    { id: 3, text: "", isCorrect: false, label: "3rd" },
    { id: 4, text: "", isCorrect: false, label: "4th" },
  ];

  const [options, setOptions] = useState<Option[]>(initialOptions);

const handleOptionTextChange = (id: number, newText: string) => {
  setOptions((opts) =>
    opts.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt))
  );
};


  const handleCorrectToggle = (id: number) => {
    setOptions((opts) =>
      opts.map((opt) => ({ ...opt, isCorrect: opt.id === id }))
    );
  };

  const filteredTopics = topicsData.filter(
    (topic: any) => topic.sections?.sectiontype === activeSection
  );

  const filteredSubtopics = subtopicsData.filter(
    (sub) => sub.topic?.id?.toString() === selectedTopic
  );

  const activeSectionData = sectionsData.find(
    (sec: any) => sec.sectiontype === activeSection
  );
  const totalQuestions = activeSectionData?.sectionnumberofquestion || 10;
  const questionNumbers = Array.from(
    { length: totalQuestions },
    (_, i) => i + 1
  );

  const handleSubmit = async () => {
    const activeSectionData = sectionsData.find(
      (sec: any) => sec.sectiontype === activeSection
    );
    const selectedTopicData = topicsData.find((t) => t.id === selectedTopic);
    const selectedSubtopicData = subtopicsData.find(
      (s) => s.id === selectedSubtopic
    );
    console.log(questionData,"questionDataquestionData")

    const payload: any = {
      content: questionData,
      correct_answer:
        answerType === "Numeric"
          ? options.find((opt) => opt.isCorrect)?.text || ""
          : options.find((opt) => opt.isCorrect)?.text || "",
      optionA: options[0]?.text || "",
      optionB: options[1]?.text || "",
      optionC: options[2]?.text || "",
      optionD: options[3]?.text || "",
      answertype: answerType,
      created_at: null,
      examformat: selectedexam?.examformat || "Online",
      examtype:questionType,
      numberofquestion: activeSectionData?.sectionnumberofquestion || 10,
      others: "others",
      
      examName: selectedexam?.examName ,
      previewwindow: null,
      questionsolution: `${questionText} = ${
        options.find((opt) => opt.isCorrect)?.text || ""
      }`,
      activeQuestion: activeQuestion,
      questiontype: questionType, // ✅ dynamic
      sectiontype: activeSection,
      subtopicname: selectedSubtopicData?.subtopictype || "",
      topicname: selectedTopicData?.topictype || "",
      updated_at: null,
    };
    console.log(payload,"payload")
return 
    await dispatch(createQuestion(payload));
    console.log("SUBMIT PAYLOAD:", payload);
  };
  const [selectedData,setSelectedData]=useState<any>(null)
const handlesectionclick=(val:any)=>{
  setActiveSection(val.id)
  console.log(val,"valval")
  setSelectedData(val)
}
  return (
   
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
          <div className="flex space-x-2">
            {selectedExamDetail.map((section:any) => (
              <button
                key={section.id}
                onClick={() => {handlesectionclick(section)}}
                className={`w-24 h-12 text-lg font-semibold rounded-lg transition-colors ${
                  section.id === activeSection
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {section?.sections?.sectiontype}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-500 mr-2">Exam:</span>
              <span className="font-bold text-lg text-red-500">
                {selectedexam?.examName} - { selectedExamDetail && selectedExamDetail.length>0 && selectedExamDetail[0]?.examType.name}
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

        {/* Question Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-white shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                Question No.{activeQuestion} ({activeSection})
              </h2>

              {/* Topic / Subtopic */}
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-700">
                    Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value);
                      setSelectedSubtopic("");
                    }}
                    className="w-full mt-1 border border-gray-200 rounded-lg p-2"
                  >
                    <option value="">-- Select Topic --</option>
                    {filteredTopics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.topictype}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-700">
                    Subtopic
                  </label>
                  <select
                    value={selectedSubtopic}
                    onChange={(e) => setSelectedSubtopic(e.target.value)}
                    className="w-full mt-1 border border-gray-200 rounded-lg p-2"
                  >
                    <option value="">-- Select Subtopic --</option>
                    {filteredSubtopics.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.subtopictype}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ✅ Question Type Radio Buttons */}
              <div className="flex flex-col pt-4">
                <span className="text-sm font-semibold text-gray-700 mb-2">
                  Question Type
                </span>
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

              {/* Question Text */}
<QuestionWithOptionsEditor onChange={setQuestionData}/>
              {/* Answer Type */}
              <div className="flex items-center space-x-6 pt-4">
                <span className="text-base font-semibold text-gray-700">
                  Answer:
                </span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="answerType"
                      value="Numeric"
                      checked={answerType === "Numeric"}
                      onChange={() => setAnswerType("Numeric")}
                    />
                    <span className="text-sm">Numeric</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="answerType"
                      value="MCQ"
                      checked={answerType === "MCQ"}
                      onChange={() => setAnswerType("MCQ")}
                    />
                    <span className="text-sm">MCQ</span>
                  </label>
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
  onChange={(html) => handleOptionTextChange(opt.id, html)} // ✅
  onCheckToggle={() => handleCorrectToggle(opt.id)}
/>

))}

                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Go to Question No.
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {questionNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveQuestion(num)}
                    className={`h-10 w-10 p-0 rounded-full font-bold transition-colors ${
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

            <div className="rounded-xl bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Hint*
              </h3>
              <textarea
                placeholder="Enter Hint"
                rows={6}
                value={hintText}
                onChange={(e) => setHintText(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
