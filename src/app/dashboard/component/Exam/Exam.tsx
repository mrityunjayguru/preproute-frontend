"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createQuestion,
  getQuestionById,
  handleUpdateQuestion,
  questionByQuestionPaperId,
} from "@/api/Question";
import { getTopic } from "@/api/Topic";
import { getSubTopicByTopicId } from "@/api/subTopic";
import OptionWithLatex from "./OptionWithLatex";
import QuestionWithOptionsEditor from "./Component/LatexCode";
import LatexForSoluction from "./Component/LatexForSoluction";
import RenderPreview from "@/Common/CommonLatex";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/app/layouts/_component/footer";
import OptionWithEditot from "./Component/OptionWithEditot";
import LatesForpassage from "./Component/LatesForpassage";
import SummaryTable from "./Component/Distirbution";

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
    (state: any) => state?.exam?.selectedExamDetail,
  );
  // const topic = useSelector((state: any) => state?.topic?.topic);
  const [topic, setTopic] = useState<any>([]);
  const subtopicData = useSelector((state: any) => state?.subTopic?.subTopic);
  const singleQuestion = useSelector(
    (state: any) => state.question.singleQuestion,
  );

  // Local state
  const [questionData, setQuestionData] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("Easy");
  const [questionPessage, setQuestionPessage] = useState<string>("Normal");
  const [answerType, setAnswerType] = useState<AnswerType>("MCQ");
  const [hintText, setHintText] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [selectedSectionData, setSelectedSectionData] = useState<any>(null);
  const [numericAnswer, setNumericAnswer] = useState<number>(0);
  const [passage, setPassage] = useState<string>("");
  const [isSection, setIsSection] = useState<boolean>(true);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);
const [sectionsData, setsectionsData] = useState<any[]>([]);

useEffect(() => {
  if (!selectedExamDetail?.[0]) return;

  const exam = selectedExamDetail[0];

  if (exam.examformet === "sectional") {
    const sectionId = exam.sectionId;

    const section =
      exam.examDetail?.sections?.find(
        (val: any) => val.sectionId === sectionId
      );

    setsectionsData(section ? [section] : []);
  } else {
    setsectionsData(exam.examDetail?.sections || []);
  }
}, [selectedExamDetail]);

// 👇 correct place to log updated state
useEffect(() => {
  console.log(sectionsData, "UPDATED sectionsData");
}, [sectionsData]);

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
      const payload: any = {};
      await dispatch(getTopic(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      const payload: any = { topicId: selectedTopic };
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
      setQuestionPessage(q.questionPessage || "Normal");
      setPassage(q?.passage || "");
      if (q.answerType === "MCQ" && Array.isArray(q.options)) {
        console.log(q.options, "q.optionsq.options");
        setOptions(
          q.options.map((opt: any, i: number) => ({
            id: i + 1,
            text: opt.text || "",
            isCorrect: opt.isCorrect || false,
            label: `${i + 1}${getOrdinalSuffix(i + 1)}`,
          })),
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
    setSelectedTopic("");
    setSelectedSubtopic("");
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
      opts.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt)),
    );
  };

  const handleCorrectToggle = (id: number) => {
    setOptions((opts) =>
      opts.map((opt) => ({ ...opt, isCorrect: opt.id === id })),
    );
  };
  const [loader, setLoder] = useState(false);

  // 🧠 Dynamic total questions
  const totalQuestions = isSection
    ? selectedSectionData?.noOfQuestions || 0
    : numberOfQuestion || 0;
  const questionNumbers = Array.from(
    { length: totalQuestions },
    (_, i) => i + 1,
  );

  const handleSubmit = async () => {
    try {
      setLoder(true);
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
        questionPessage,
        numericAnswer,
        passage: passage,
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
        createdBy: "6710fbc3f2b9b9e...",
      };

      if (singleQuestion && singleQuestion.length > 0) {
        payload._id = singleQuestion[0]._id;
        await dispatch(handleUpdateQuestion(payload));
      } else {
        await dispatch(createQuestion(payload));
        resetQuestionFields();
      }
      setActiveQuestion(activeQuestion + 1);
      handleActiveQuestion(activeQuestion + 1);
      setLoder(false);
    } catch (err) {
      setLoder(false);
      console.error("Error creating question:", err);
    }
  };
  console.log(passage, "passagepassagepassage");
  const handleActiveQuestion = (val: number) => {
    let currentIndex = sectionsData.findIndex(
      (sec: any) => sec.sectionId === activeSection,
    );

    let currentSection = sectionsData[currentIndex];

    // If question exceeds current section limit → move to next section
    if (currentSection?.noOfQuestions < val) {
      const nextSection = sectionsData[currentIndex + 1];

      // If next section exists → move to next section
      if (nextSection) {
        return handleActiveSection(nextSection); // <-- PASS FULL DATA
      }

      // If NO next section → stop (end of all sections)
      return;
    }

    // Load question inside current section
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
    if (val?.topicDetails) {
      setTopic(val?.topicDetails);
    }
    const payload: any = {
      questionNo: 1,
      questionPaperId: selectedExamDetail[0]?._id,
      section: val.sectionId,
    };
    dispatch(getQuestionById(payload));
  };
  const [open, setOpen] = useState(false);
  const handleToggledistribution = async () => {
    const payload: any = {
      questionPaperId: selectedExamDetail[0]?._id,
    };
    await dispatch(questionByQuestionPaperId(payload));
    setOpen(true);
  };
  return (
    <>
      <SummaryTable open={open} onClose={() => setOpen(false)} />

      <div className="min-h-screen ">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
            <h1 className="text-[#FF5635] text-2xl  font-poppins">
              Exam Setup{" "}
              <span className="text-black text-lg">
                <span className="text-[#005EB6]"> | </span>
                Create Oprator
              </span>
            </h1>
            <div className="font-semibold text-gray-900 text-lg font-poppins">
              {selectedExamDetail[0]?.examDetail?.examname}{" "}
              <span className="text-[#FF4D4F]">
                {selectedExamDetail[0]?.questionPapername}
              </span>
            </div>
          </div>

          {/* Section Tabs and Save Button Row */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {isSection &&
                sectionsData.map((section: any) => (
                  <button
                    key={section.sectionId}
                    onClick={() => handleActiveSection(section)}
                    className={`px-6 py-2 rounded-[8px] text-sm font-normal font-dm-sans cursor-pointer ${
                      section.sectionId === activeSection
                        ? "bg-[#005EB6] text-white"
                        : "bg-[#5A9BD5] text-white hover:bg-[#4a8ac0]"
                    }`}
                  >
                    {section?.sectionDetail?.section}
                  </button>
                ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggledistribution}
                className="px-10 py-2 w-fit bg-[#FF5635] text-white font-medium rounded-md font-dm-sans hover:bg-[#FF5632] disabled:opacity-50 cursor-pointer"
              >
                Question Distribution
              </button>

              <button
                onClick={handleSubmit}
                disabled={loader}
                className="px-10 py-2 w-fit bg-[#FF5635] text-white font-medium rounded-md font-dm-sans hover:bg-[#FF5632] disabled:opacity-50 cursor-pointer"
              >
                {loader ? "Processing..." : "Save & Process"}
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Form */}
            <div className="flex-1 w-full space-y-8">
              {/* Topic & Subtopic */}
              {isSection && (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <Label className="font-dm-sans text-md font-medium">
                      Select Topic
                    </Label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => {
                        setSelectedTopic(e.target.value);
                        setSelectedSubtopic("");
                      }}
                      className="w-full border border-gray-300 rounded-[2px] cursor-pointer p-2 text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      <option value="">Select Topic</option>
                      {topic.map((t: any) => (
                        <option
                          key={t._id}
                          value={t._id}
                          className="text-gray-900"
                        >
                          {t.topic}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <Label className="font-dm-sans text-md font-medium">
                      Select Sub Topic
                    </Label>
                    <select
                      value={selectedSubtopic}
                      onChange={(e) => setSelectedSubtopic(e.target.value)}
                      className="w-full border border-gray-300 rounded-[2px] cursor-pointer p-2 text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      <option value="">Select Sub Topic</option>
                      {subtopicData?.map((sub: any) => (
                        <option
                          key={sub._id}
                          value={sub._id}
                          className="text-gray-900"
                        >
                          {sub.subtopic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Question Difficulty (Type) */}
              <div>
                <Label className="font-dm-sans text-md font-medium mb-2">
                  Question Type
                </Label>
                <div className="flex flex-wrap gap-6 items-center">
                  {/* Difficulty Group */}
                  {["Easy", "Medium", "Hard"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          questionType === type
                            ? "border-[#FF4D4F]"
                            : "border-gray-300"
                        }`}
                      >
                        {questionType === type && (
                          <div className="w-3 h-3 rounded-full bg-[#FF4D4F]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="questionType"
                        value={type}
                        checked={questionType === type}
                        onChange={() => setQuestionType(type)}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}

                  {/* Passage/Normal Group */}
                  {["Normal", "Pass"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          questionPessage === type
                            ? "border-[#FF4D4F]"
                            : "border-gray-300"
                        }`}
                      >
                        {questionPessage === type && (
                          <div className="w-3 h-3 rounded-[8px] bg-[#FF4D4F]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="questionPessage"
                        value={type}
                        checked={questionPessage === type}
                        onChange={() => setQuestionPessage(type)}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question Editor */}
              <div className="space-y-4">
                <div
                  className={`  ${
                    questionPessage === "Pass" ? "flex gap-4" : ""
                  }`}
                >
                  <div
                    className={questionPessage === "Pass" ? "w-2/3" : "w-full"}
                  >
                    <QuestionWithOptionsEditor
                      value={questionData}
                      onChange={setQuestionData}
                      QuestionType={"HideInternalPreview"}
                    />
                  </div>
                  {questionPessage === "Pass" && (
                    <div className="w-1/3 text-md font-medium font-poppins">
                      <LatesForpassage value={passage} onChange={setPassage} />
                      {/* <textarea
                      placeholder="Enter Passage"
                      value={passage}
                      onChange={(e) => setPassage(e.target.value)}
                      className="w-full h-full min-h-[200px] p-2 border rounded-md"
                    /> */}
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-md font-medium font-poppins text-gray-700 mb-2">
                    Preview
                  </h3>
                  <div className="border border-gray-200 text-md font-normal font-poppins rounded-[2px] p-4 min-h-[100px] bg-white ">
                    <RenderPreview content={questionData} />
                  </div>
                </div>
              </div>

              {/* Answer Type */}
              <div>
                <Label className="font-dm-sans text-md font-medium mb-2">
                  Question Type
                </Label>
                <div className="flex gap-6 font-poppins">
                  {["Numeric", "MCQ"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          answerType === type
                            ? "border-[#FF4D4F]"
                            : "border-gray-300"
                        }`}
                      >
                        {answerType === type && (
                          <div className="w-3 h-3 rounded-full bg-[#FF4D4F]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="answerType"
                        value={type}
                        checked={answerType === type}
                        onChange={() => setAnswerType(type as AnswerType)}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Options */}
              {answerType === "MCQ" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {options.map((opt) => (
                    <OptionWithEditot
                      key={opt.id}
                      choice={opt.label}
                      value={opt.text}
                      isCorrect={opt.isCorrect}
                      onChange={(html) => handleOptionTextChange(opt.id, html)}
                      onCheckToggle={() => handleCorrectToggle(opt.id)}
                      QuestionType={questionPessage}
                    />
                    // <OptionWithLatex
                    //   key={opt.id}
                    //   choice={opt.label}
                    //   value={opt.text}
                    //   isCorrect={opt.isCorrect}
                    //   onChange={(html) => handleOptionTextChange(opt.id, html)}
                    //   onCheckToggle={() => handleCorrectToggle(opt.id)}
                    //   QuestionType={questionPessage}
                    // />
                  ))}
                </div>
              )}

              {/* Numeric Answer */}
              {answerType === "Numeric" && (
                <div className="pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter Numeric Answer
                  </label>
                  <input
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(Number(e.target.value))}
                    type="number"
                    placeholder="Enter Value"
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                  />
                </div>
              )}

              {/* Solution */}
              <div>
                <h3 className="text-md font-medium font-poppins text-gray-700 mb-2">
                  Solution
                </h3>
                <div className=" rounded-lg p-1">
                  <LatexForSoluction value={hintText} onChange={setHintText} />
                </div>
                {/* Solution Preview */}
                <div className="mt-4">
                  <h3 className="text-md font-medium font-poppins text-gray-700 mb-2">
                    Preview
                  </h3>
                  <div className="border border-gray-200 rounded-[2px] p-4 min-h-[100px] bg-white">
                    <RenderPreview content={hintText} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="w-full lg:w-[350px] shrink-0 pl-10">
              <div className="bg-[#F9FAFC] border border-[#d6e4ff] rounded-lg overflow-hidden">
                <div className="bg-[#0056b3] text-white p-3 font-normal text-md font-dm-sans">
                  {sectionsData.find((s: any) => s.sectionId === activeSection)
                    ?.sectionDetail?.section || "Questions"}
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium font-poppins text-gray-600 mb-3">
                    Choose an option
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {questionNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => handleActiveQuestion(num)}
                        className={`h-10 w-10 flex items-center justify-center rounded-md text-sm font-semibold transition-all border ${
                          num === activeQuestion
                            ? "bg-gradient-to-t from-[#005EB6] to-[#C8DCFE] text-white border border-[#E6F4FF]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Exam;
