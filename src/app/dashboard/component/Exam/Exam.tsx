"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createQuestion,
  getQuestionById,
  handleUpdateQuestion,
} from "@/api/Question";
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
  const selectedExamDetail = useSelector(
    (state: any) => state?.exam?.selectedExamDetail
  );
  // const topic = useSelector((state: any) => state?.topic?.topic);
  const [topic,setTopic]=useState<any>([])
  const subtopicData = useSelector((state: any) => state?.subTopic?.subTopic);
  const singleQuestion = useSelector(
    (state: any) => state.question.singleQuestion
  );

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
  const [numericAnswer, setNumericAnswer] = useState<number>(0);

  const [isSection, setIsSection] = useState<boolean>(true);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);

  const sectionsData = selectedExamDetail[0]?.examDetail?.sections || [];
  

  // initialize exam type
  useEffect(() => {
    const examDetail = selectedExamDetail[0]?.examDetail;
    if (examDetail) {
      setIsSection(examDetail.isSection);
      if (!examDetail.isSection) {
        setNumberOfQuestion(examDetail.noOfQuestions);
      }
    }
    getTopicData();
  }, []);

  const getTopicData = async () => {
    try {
      const payload:any={}
      await dispatch(getTopic(payload));
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (selectedTopic) {
      const payload:any={ topicId: selectedTopic }
      dispatch(getSubTopicByTopicId(payload));
    }
  }, [selectedTopic, dispatch]);

  // Update from singleQuestion
  useEffect(() => {
    if (singleQuestion && singleQuestion.length > 0) {
      const q = singleQuestion[0];
      setAnswerType(q.answerType || "MCQ");
      setQuestionType(q.questionType || "Easy");
      setActiveSection(q.section || "");
      setQuestionData(q.questionText || "");
      setHintText(q.hint || "");
      setSelectedTopic(q.topicId || "");
      setSelectedSubtopic(q.subtopicId || "");
      setNumericAnswer(q.numericAnswer || 0);

      if (q.answerType === "MCQ" && Array.isArray(q.options)) {
        setOptions(
          q.options.map((opt: any, i: number) => ({
            id: i + 1,
            text: opt.text || "",
            isCorrect: opt.isCorrect || false,
            label: `${i + 1}${getOrdinalSuffix(i + 1)}`,
          }))
        );
      }
    } else {
      resetQuestionFields();
    }
  }, [singleQuestion]);

  const getOrdinalSuffix = (n: number) => {
    if (n === 1) return "st";
    if (n === 2) return "nd";
    if (n === 3) return "rd";
    return "th";
  };

  const resetQuestionFields = () => {
    setQuestionData("");
    setHintText("");
    setOptions([
      { id: 1, text: "", isCorrect: true, label: "1st" },
      { id: 2, text: "", isCorrect: false, label: "2nd" },
      { id: 3, text: "", isCorrect: false, label: "3rd" },
      { id: 4, text: "", isCorrect: false, label: "4th" },
    ]);
  };

  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: true, label: "1st" },
    { id: 2, text: "", isCorrect: false, label: "2nd" },
    { id: 3, text: "", isCorrect: false, label: "3rd" },
    { id: 4, text: "", isCorrect: false, label: "4th" },
  ]);

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

  // 🧠 Dynamic total questions
  const totalQuestions = isSection
    ? selectedSectionData?.noOfQuestions || 0
    : numberOfQuestion || 0;
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  const handleSubmit = async () => {
    try {
      const correctAnswer = options.find((opt) => opt.isCorrect)?.text || "";

      const payload: any = {
        questionPaperId: selectedExamDetail[0]?._id,
        section: isSection ? activeSection : null,
        topicId: isSection ? selectedTopic || null : null,
        subtopicId: isSection ? selectedSubtopic || null : null,
        questionNo: activeQuestion,
        questionText: questionData,
        questionType,
        answerType,
        numericAnswer,
        options:
          answerType === "MCQ"
            ? options.map((opt) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
              }))
            : [],
        correctAnswer:
          answerType === "Numeric"
            ? numericAnswer
            : options.find((opt) => opt.isCorrect)?.text || "",
        hint: hintText,
        createdBy: "6710fbc3f2b9b9e...", // replace dynamically
      };

      if (singleQuestion && singleQuestion.length > 0) {
        payload._id = singleQuestion[0]._id;
        await dispatch(handleUpdateQuestion(payload));
      } else {
        await dispatch(createQuestion(payload));
        resetQuestionFields();
      }
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  const handleActiveQuestion = (val: number) => {
    const payload: any = {
      questionNo: val,
      questionPaperId: selectedExamDetail[0]?._id,
    };

    if (isSection) payload.section = activeSection;

    dispatch(getQuestionById(payload));
    setActiveQuestion(val);
  };

  const handleActiveSection = (val: any) => {
    setActiveQuestion(1);
    setActiveSection(val.sectionId);
    setSelectedSectionData(val);
    setNumberOfQuestion(val.noOfQuestions);
 if(val?.topicDetails){
 setTopic(val?.topicDetails)
  }
    const payload: any = {
      questionNo: 1,
      questionPaperId: selectedExamDetail[0]?._id,
      section: val.sectionId,
    };
    dispatch(getQuestionById(payload));
  };

  return (
    <div className="min-h-screen bg-[#fff] p-4 sm:p-8 mt-20">
      <div className="w-full">
        {/* Header */}
        <div className="flex  justify-between items-center mb-6 bg-[#fff] p-4 rounded-sm shadow-md">
          {isSection && (
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
          )}

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
        <div className="  gap-6">
          {/* Left Section */}
          <div className=" flex justify-between gap-2 space-y-6">
            <div className="rounded-xl w-full bg-white shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                Question No. {activeQuestion}
              </h2>

              {/* Topic/Subtopic (only if isSection true) */}
              {isSection && (
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
                      {topic.map((t: any) => (
                        <option key={t._id} value={t._id}>
                          {t.topic}
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
                      {subtopicData?.map((sub: any) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subtopic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Question Type */}
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

              {/* Question Editor */}
              <QuestionWithOptionsEditor
                value={questionData}
                onChange={setQuestionData}
              />

              {/* Answer Type */}
              <div className="flex items-center space-x-6 pt-4">
                <span className="text-base font-semibold text-gray-700">
                  Answer:
                </span>
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
                  <Input
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(Number(e.target.value))}
                    type="number"
                    placeholder="Enter Value"
                  />
                </div>
              )}
            </div>
               <div className="lg:col-span-1 space-y-6 w-[40%]">
            {/* Question Navigation */}
            <div className="rounded-xl h-full bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Go to Question No.
              </h3>
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
          
          </div>
          </div>
  <div className="rounded-xl bg-white shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Solution
              </h3>
              <LatexForSoluction value={hintText} onChange={setHintText} />
            </div>
          {/* Sidebar */}
       
        </div>
      </div>
    </div>
  );
};

export default Exam;
