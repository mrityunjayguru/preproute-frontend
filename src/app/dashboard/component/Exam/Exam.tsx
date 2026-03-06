"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  createQuestion,
  getQuestionById,
  handleUpdateQuestion,
  questionByQuestionPaperId,
} from "@/api/Question";
import { getTopic } from "@/api/Topic";
import { getSubTopicByTopicId } from "@/api/subTopic";

// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/app/layouts/_component/footer";
import RenderPreview from "@/Common/CommonLatex";

// Internal Components
import OptionWithEditot from "./Component/OptionWithEditot";
import QuestionWithOptionsEditor from "./Component/LatexCode";
import LatexForSoluction from "./Component/LatexForSoluction";
import LatesForpassage from "./Component/LatesForpassage";
import SummaryTable from "./Component/Distirbution";
import QuestionBankPopup from "./Component/QuestionBankPopup";

type AnswerType = "Numeric" | "MCQ";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  label: string;
}

const Exam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // --- Redux Selectors ---
  const selectedExamDetail = useSelector(
    (state: any) => state?.exam?.selectedExamDetail?.[0],
  );
  const subtopicData = useSelector((state: any) => state?.subTopic?.subTopic);
  const singleQuestion = useSelector(
    (state: any) => state.question.singleQuestion?.[0],
  );

  // --- Local State ---
  const [sectionsData, setSectionsData] = useState<any[]>([]);
  const [topic, setTopic] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("Easy");
  const [questionPessage, setQuestionPessage] = useState<string>("Normal");
  const [answerType, setAnswerType] = useState<AnswerType>("MCQ");
  const [questionData, setQuestionData] = useState<string>("");
  const [hintText, setHintText] = useState<string>("");
  const [numericAnswer, setNumericAnswer] = useState<number>(0);
  const [passage, setPassage] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [isSection, setIsSection] = useState<boolean>(true);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);

  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: true, label: "1st" },
    { id: 2, text: "", isCorrect: false, label: "2nd" },
    { id: 3, text: "", isCorrect: false, label: "3rd" },
    { id: 4, text: "", isCorrect: false, label: "4th" },
  ]);

  // --- Helper Functions ---
  const getOrdinalSuffix = (n: number) =>
    ["th", "st", "nd", "rd"][
      (n % 100 > 10 && n % 100 < 20) || n % 10 > 3 ? 0 : n % 10
    ] || "th";

  const resetQuestionFields = useCallback(() => {
    setQuestionData("");
    setHintText("");
    setSelectedTopic("");
    setSelectedSubtopic("");
    setNumericAnswer(0);
    setPassage("");
    setOptions([
      { id: 1, text: "", isCorrect: true, label: "1st" },
      { id: 2, text: "", isCorrect: false, label: "2nd" },
      { id: 3, text: "", isCorrect: false, label: "3rd" },
      { id: 4, text: "", isCorrect: false, label: "4th" },
    ]);
  }, []);

  // --- Effects ---

  // Initialization: Setup sections and fetch initial topics
  useEffect(() => {
    if (!selectedExamDetail) return;

    const { examformet, sectionId, examDetail } = selectedExamDetail;
    setIsSection(examDetail?.isSection ?? true);

    // Determine Sections Data
    if (
      examformet === "sectional" ||
      examformet === "topic wise" ||
      examformet === "daily practice"
    ) {
      const section = examDetail?.sections?.find(
        (val: any) => val.sectionId === sectionId,
      );
      setSectionsData(section ? [section] : []);
    } else {
      setSectionsData(examDetail?.sections || []);
    }

    if (!examDetail?.isSection) {
      setNumberOfQuestion(examDetail?.noOfQuestions || 0);
    }

    dispatch(getTopic({}));
  }, [selectedExamDetail, dispatch]);

  // Fetch subtopics when topic changes
  useEffect(() => {
    if (selectedTopic) {
      dispatch(getSubTopicByTopicId({ topicId: selectedTopic }));
    }
  }, [selectedTopic, dispatch]);

  // Sync state when a single question is loaded from DB
  useEffect(() => {
    if (singleQuestion) {
      console.log(singleQuestion,"zzzzzzzzzzzzz")
      setAnswerType(singleQuestion.answerType || "MCQ");
      setQuestionType(singleQuestion.questionType || "Easy");
      setActiveSection(singleQuestion.section || "");
      setQuestionData(singleQuestion.questionText || "");
      setHintText(singleQuestion.hint || "");
      setSelectedTopic(singleQuestion.topicId || "");
      setSelectedSubtopic(singleQuestion.subtopicId || "");
      setNumericAnswer(singleQuestion.numericAnswer || 0);
      setQuestionPessage(singleQuestion.questionPessage || "Normal");
      setPassage(singleQuestion.passage || "");

      if (
        singleQuestion.answerType === "MCQ" &&
        Array.isArray(singleQuestion.options)
      ) {
        setOptions(
          singleQuestion.options.map((opt: any, i: number) => ({
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
  }, [singleQuestion, resetQuestionFields]);

  // --- Handlers ---

  const handleActiveSection = (section: any) => {
    setActiveQuestion(1);
    setActiveSection(section.sectionId);
    setNumberOfQuestion(section.noOfQuestions);
    if (section?.topicDetails) setTopic(section.topicDetails);

    dispatch(
      getQuestionById({
        questionNo: 1,
        questionPaperId: selectedExamDetail?._id,
        section: section.sectionId,
      }),
    );
  };

  const handleActiveQuestion = (qNo: number) => {
    const currentSectionData = sectionsData.find(
      (s) => s.sectionId === activeSection,
    );

    // Navigation logic: Move to next section if out of bounds
    if (currentSectionData && qNo > currentSectionData.noOfQuestions) {
      const currentIndex = sectionsData.findIndex(
        (s) => s.sectionId === activeSection,
      );
      const nextSection = sectionsData[currentIndex + 1];
      if (nextSection) return handleActiveSection(nextSection);
      return; // End of exam
    }

    setActiveQuestion(qNo);
    dispatch(
      getQuestionById({
        questionNo: qNo,
        questionPaperId: selectedExamDetail?._id,
        section: isSection ? activeSection : undefined,
      }),
    );
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const payload: any = {
        questionPaperId: selectedExamDetail?._id,
        section: isSection ? activeSection : null,
        topicId: selectedTopic || null,
        subtopicId: selectedSubtopic || null,
        questionNo: activeQuestion,
        questionText: questionData,
        questionType,
        answerType,
        questionPessage,
        numericAnswer,
        passage,
        hint: hintText,
        options:
          answerType === "MCQ"
            ? options.map(({ text, isCorrect }) => ({ text, isCorrect }))
            : [],
        correctAnswer:
          answerType === "Numeric"
            ? numericAnswer
            : options.find((o) => o.isCorrect)?.text || "",
        createdBy: "6710fbc3f2b9b9e...", // Replace with dynamic user ID
      };

      if (singleQuestion?._id) {
        payload._id = singleQuestion._id;
        await dispatch(handleUpdateQuestion(payload));
      } else {
        await dispatch(createQuestion(payload));
      }
      setAnswerType("MCQ");
      setQuestionType("Easy");
      // setActiveSection("");
      setQuestionData("");
      setHintText("");
      setSelectedTopic("");
      setSelectedSubtopic("");
      setNumericAnswer(0);
      setQuestionPessage("Normal");
      setPassage("");
      handleActiveQuestion(activeQuestion + 1);
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setLoader(false);
    }
  };

  const questionNumbers = useMemo(
    () => Array.from({ length: numberOfQuestion }, (_, i) => i + 1),
    [numberOfQuestion],
  );
const [openQB, setOpenQB] = useState(false);
const handleOpenQuestionBank=()=>{
   setOpenQB(true);
}
const addQuestionBankItem=(questionItem:any)=>{
  let singleQuestion:any=questionItem
   if (singleQuestion) {
      setAnswerType(singleQuestion.answerType || "MCQ");
      setQuestionType(singleQuestion.questionType || "Easy");
      // setActiveSection(singleQuestion.section || "");
      setQuestionData(singleQuestion.questionText || "");
      setHintText(singleQuestion.hint || "");
      setSelectedTopic(singleQuestion.topicId || "");
      setSelectedSubtopic(singleQuestion.subtopicId || "");
      setNumericAnswer(singleQuestion.numericAnswer || 0);
      setQuestionPessage(singleQuestion.questionPessage || "Normal");
      setPassage(singleQuestion.passage || "");
      if (
        singleQuestion.answerType === "MCQ" &&
        Array.isArray(singleQuestion.options)
      ) {
        setOptions(
          singleQuestion.options.map((opt: any, i: number) => ({
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
// console.log(questionItem,"questionItemquestionItem")

}
  return (
    <>
      <SummaryTable open={openSummary} onClose={() => setOpenSummary(false)} />
<QuestionBankPopup
  isOpen={openQB}
  onClose={() => setOpenQB(false)}
  questionBankItem={addQuestionBankItem}
  activeSection={activeSection}
/>
      <div className="min-h-screen bg-white">
        <div className="w-full mx-auto px-4 md:px-10 mb-8">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#F0F9FF] rounded-lg px-8 py-6 mt-4">
            <h1 className="text-[#FF5635] text-2xl font-poppins font-medium">
              Exam Setup{" "}
              <span className="text-black text-lg">
                {" "}
                | <span className="text-[#005EB6]">Create Operator</span>
              </span>
            </h1>
            <div className="font-semibold text-gray-900 text-lg font-poppins">
              {selectedExamDetail?.examDetail?.examname}{" "}
              {selectedExamDetail?.examDetail?.subjectName}
              <span className="text-[#FF4D4F] ml-2">
                {selectedExamDetail?.questionPapername}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4">
            <div className="flex flex-wrap gap-4">
              {isSection &&
                sectionsData.map((sec) => (
                  <button
                    key={sec.sectionId}
                    onClick={() => handleActiveSection(sec)}
                    className={`px-6 py-2 rounded-lg text-sm transition-colors ${
                      sec.sectionId === activeSection
                        ? "bg-[#005EB6] text-white"
                        : "bg-[#5A9BD5] text-white hover:bg-[#4a8ac0]"
                    }`}
                  >
                    {sec?.sectionDetail?.section}
                  </button>
                ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleOpenQuestionBank}
                disabled={loader}
                className="px-10 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e44d30] disabled:opacity-50"
              >
                Question Bank
              </button>
              <button
                onClick={() => {
                  dispatch(
                    questionByQuestionPaperId({
                      questionPaperId: selectedExamDetail?._id,
                    }),
                  );
                  setOpenSummary(true);
                }}
                className="px-6 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e44d30] transition-all"
              >
                Question Distribution
              </button>
              <button
                onClick={handleSubmit}
                disabled={loader}
                className="px-10 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e44d30] disabled:opacity-50"
              >
                {loader ? "Processing..." : "Save & Next"}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 space-y-6">
              {/* Topic Selectors */}
              {(isSection ||
                selectedExamDetail?.examDetail?.examname === "CUET") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium">Select Topic</Label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => {
                        setSelectedTopic(e.target.value);
                        setSelectedSubtopic("");
                      }}
                      className="w-full border rounded p-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">-- Choose Topic --</option>
                      {(isSection
                        ? topic
                        : selectedExamDetail?.topicDetail || []
                      ).map((t: any) => (
                        <option key={t._id} value={t._id}>
                          {t.topic}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Select Sub Topic</Label>
                    <select
                      value={selectedSubtopic}
                      onChange={(e) => setSelectedSubtopic(e.target.value)}
                      className="w-full border rounded p-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">-- Choose Sub Topic --</option>
                      {subtopicData?.map((sub: any) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subtopic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Difficulty & Format */}
              <div className="">
                <Label className="font-medium">Question Properties</Label>
                <div className="flex flex-wrap gap-6 p-4 border rounded-md bg-gray-50">
                  {["Easy", "Medium", "Hard", "Normal", "Pass"].map((type) => {
                    const isDifficulty = ["Easy", "Medium", "Hard"].includes(
                      type,
                    );
                    const isSelected = isDifficulty
                      ? questionType === type
                      : questionPessage === type;
                    return (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#FF4D4F]" : "border-gray-300"}`}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-[#FF4D4F]" />
                          )}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={isSelected}
                          onChange={() =>
                            isDifficulty
                              ? setQuestionType(type)
                              : setQuestionPessage(type)
                          }
                        />
                        <span className="text-sm font-poppins">{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Editors */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div
                    className={
                      questionPessage === "Pass" ? "md:w-2/3" : "w-full"
                    }
                  >
                    <Label className="mb-2 block">Question Content</Label>
                    <QuestionWithOptionsEditor
                      value={questionData}
                      onChange={setQuestionData}
                      QuestionType="HideInternalPreview"
                    />
                  </div>
                  {questionPessage === "Pass" && (
                    <div className="md:w-1/3">
                      <Label className="mb-2 block">Passage Content</Label>
                      <LatesForpassage value={passage} onChange={setPassage} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">Question Preview</Label>
                  <div className="border border-gray-200 rounded p-4 min-h-[100px] bg-white shadow-sm">
                    <RenderPreview content={questionData} />
                  </div>
                </div>
              </div>

              {/* MCQ Options / Numeric */}
              <div className="space-y-4">
                <Label>Answer Configuration</Label>
                <div className="flex gap-6 mb-4">
                  {["MCQ", "Numeric"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="ansType"
                        checked={answerType === t}
                        onChange={() => setAnswerType(t as AnswerType)}
                        className="accent-[#FF4D4F]"
                      />
                      <span className="text-sm">{t}</span>
                    </label>
                  ))}
                </div>

                {answerType === "MCQ" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((opt) => (
                      <OptionWithEditot
                        key={opt.id}
                        choice={opt.label}
                        value={opt.text}
                        isCorrect={opt.isCorrect}
                        onChange={(val) =>
                          setOptions((prev) =>
                            prev.map((o) =>
                              o.id === opt.id ? { ...o, text: val } : o,
                            ),
                          )
                        }
                        onCheckToggle={() =>
                          setOptions((prev) =>
                            prev.map((o) => ({
                              ...o,
                              isCorrect: o.id === opt.id,
                            })),
                          )
                        }
                        QuestionType={questionPessage}
                      />
                    ))}
                  </div>
                ) : (
                  <Input
                    type="number"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(Number(e.target.value))}
                    onWheel={(e) => e.currentTarget.blur()}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter correct numerical value"
                    className="max-w-xs"
                  />
                )}
              </div>

              {/* Solution Section */}
              <div className="space-y-4 pt-4 border-t">
                <Label>Explanation / Solution</Label>
                <LatexForSoluction value={hintText} onChange={setHintText} />
                <div className="border border-dashed border-gray-300 rounded p-4 bg-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Solution Preview
                  </span>
                  <RenderPreview content={hintText} />
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="w-full lg:w-[320px] sticky top-4">
              <div className="bg-[#F9FAFC] border border-[#d6e4ff] rounded-lg overflow-hidden shadow-sm">
                <div className="bg-[#0056b3] text-white p-4 font-medium">
                  {sectionsData.find((s) => s.sectionId === activeSection)
                    ?.sectionDetail?.section || "Questions"}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-bold">
                    Question Palette
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {questionNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => handleActiveQuestion(num)}
                        className={`h-10 w-10 flex items-center justify-center rounded-md text-sm font-semibold transition-all border ${
                          num === activeQuestion
                            ? "bg-gradient-to-b from-[#C8DCFE] to-[#005EB6] text-white border-[#005EB6]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#005EB6]"
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
