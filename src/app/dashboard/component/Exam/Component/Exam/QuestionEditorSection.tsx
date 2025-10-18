"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import OptionWithLatex from "../../OptionWithLatex";

interface Props {
  isSection: boolean;
  sectionsData: any[];
  activeSection: string;
  selectedTopic: string;
  setSelectedTopic: (val: string) => void;
  selectedSubtopic: string;
  setSelectedSubtopic: (val: string) => void;
  topic: any[];
  subtopicData: any[];
  questionType: string;
  setQuestionType: (val: string) => void;
  answerType: "Numeric" | "MCQ";
  setAnswerType: (val: "Numeric" | "MCQ") => void;
  questionData: string;
  setQuestionData: (val: string) => void;
  options: any[];
  setOptions: (val: any[]) => void;
  numericAnswer: number;
  setNumericAnswer: (val: number) => void;
  hintText: string;
  setHintText: (val: string) => void;
  activeQuestion: number;
}

const QuestionEditorSection: React.FC<Props> = ({
  isSection,
  selectedTopic,
  setSelectedTopic,
  selectedSubtopic,
  setSelectedSubtopic,
  topic,
  subtopicData,
  questionType,
  setQuestionType,
  answerType,
  setAnswerType,
  questionData,
  setQuestionData,
  options,
  setOptions,
  numericAnswer,
  setNumericAnswer,
  hintText,
  setHintText,
}) => {
  const handleOptionTextChange = (id: number, newText: string) => {
    setOptions((opts) => opts.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt)));
  };

  const handleCorrectToggle = (id: number) => {
    setOptions((opts) => opts.map((opt) => ({ ...opt, isCorrect: opt.id === id })));
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="rounded-xl bg-white shadow-lg p-6 space-y-6">
        {/* Topic/Subtopic */}
        {isSection && (
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => { setSelectedTopic(e.target.value); setSelectedSubtopic(""); }}
                className="w-full mt-1 border border-gray-200 rounded-lg p-2"
              >
                <option value="">-- Select Topic --</option>
                {topic.map((t) => <option key={t._id} value={t._id}>{t.topic}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700">Subtopic</label>
              <select
                value={selectedSubtopic}
                onChange={(e) => setSelectedSubtopic(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg p-2"
              >
                <option value="">-- Select Subtopic --</option>
                {subtopicData.map((sub) => <option key={sub._id} value={sub._id}>{sub.subtopic}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Question Type */}
        <div className="flex flex-col pt-4">
          <span className="text-sm font-semibold text-gray-700 mb-2">Question Type</span>
          <div className="flex items-center space-x-6">
            {["Easy", "Medium", "Hard"].map((type) => (
              <label key={type} className="flex items-center space-x-1">
                <input type="radio" name="questionType" value={type} checked={questionType===type} onChange={() => setQuestionType(type)} className="accent-red-500"/>
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
            {["Numeric","MCQ"].map((type) => (
              <label key={type} className="flex items-center space-x-1">
                <input type="radio" name="answerType" value={type} checked={answerType===type as any} onChange={() => setAnswerType(type as any)}/>
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
            <Input value={numericAnswer} onChange={(e) => setNumericAnswer(Number(e.target.value))} type="number" placeholder="Enter Value"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEditorSection;
