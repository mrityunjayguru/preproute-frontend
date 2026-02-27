"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createQuestionBank,
  handleQuestionBankSingleQuestion,
  handleupdateQuestionBank,
} from "@/api/Question";

// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/app/layouts/_component/footer";
import RenderPreview from "@/Common/CommonLatex";
import SummaryTable from "../../Exam/Component/Distirbution";
import LatesForpassage from "../../Exam/Component/LatesForpassage";
import OptionWithEditot from "../../Exam/Component/OptionWithEditot";
import LatexForSoluction from "../../Exam/Component/LatexForSoluction";
import QuestionBankHeader from "./QuestionBankHeader";
import QuestionWithOptionsEditor from "../../Exam/Component/LatexCode";

type AnswerType = "Numeric" | "MCQ";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  label: string;
}

const QuestioBankExam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // --- Redux Selectors ---
  const singleQuestion = useSelector(
    (state: any) => state.question.questionBankSingleQuestion
  );
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  // --- Local State for Header Selections ---
  const [selectedExamType, setSelectedExamType] = useState<any>(null);
  const [selectedSubExam, setSelectedSubExam] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>(null);

  // --- Local State for Question Content ---
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [questionType, setQuestionType] = useState<string>("Easy");
  const [questionPessage, setQuestionPessage] = useState<string>("Normal");
  const [answerType, setAnswerType] = useState<AnswerType>("MCQ");
  const [questionData, setQuestionData] = useState<string>("");
  const [hintText, setHintText] = useState<string>("");
  const [numericAnswer, setNumericAnswer] = useState<number>(0);
  const [passage, setPassage] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: true, label: "1st" },
    { id: 2, text: "", isCorrect: false, label: "2nd" },
    { id: 3, text: "", isCorrect: false, label: "3rd" },
    { id: 4, text: "", isCorrect: false, label: "4th" },
  ]);

  // --- Helper Functions ---
  const getOrdinalSuffix = (n: number) =>
    ["th", "st", "nd", "rd"][(n % 100 > 10 && n % 100 < 20) || n % 10 > 3 ? 0 : n % 10] || "th";

  const resetQuestionFields = useCallback(() => {
    setQuestionData("");
    setHintText("");
    setNumericAnswer(0);
    setPassage("");
    setOptions([
      { id: 1, text: "", isCorrect: true, label: "1st" },
      { id: 2, text: "", isCorrect: false, label: "2nd" },
      { id: 3, text: "", isCorrect: false, label: "3rd" },
      { id: 4, text: "", isCorrect: false, label: "4th" },
    ]);
  }, []);

  // --- Effect: Sync SingleQuestion Data to Form ---
  useEffect(() => {
    if (singleQuestion) {
      // 1. Map Question Content
      setAnswerType(singleQuestion.answerType || "MCQ");
      setQuestionType(singleQuestion.questionType || "Easy");
      setQuestionData(singleQuestion.questionText || "");
      setHintText(singleQuestion.hint || "");
      setNumericAnswer(singleQuestion.numericAnswer || 0);
      setQuestionPessage(singleQuestion.questionPessage || "Normal");
      setPassage(singleQuestion.passage || "");
      setActiveQuestion(singleQuestion.questionNo || 1);

      // 2. Map Options
      if (singleQuestion.answerType === "MCQ" && Array.isArray(singleQuestion.options)) {
        setOptions(
          singleQuestion.options.map((opt: any, i: number) => ({
            id: i + 1,
            text: opt.text || "",
            isCorrect: opt.isCorrect || false,
            label: `${i + 1}${getOrdinalSuffix(i + 1)}`,
          }))
        );
      }

      // 3. Map Header/Dropdown Selections (Mapping backend objects to dropdown values)
      if (singleQuestion.examType) {
        setSelectedExamType({ 
          label: singleQuestion.examType.examType, 
          value: singleQuestion.examType._id 
        });
      }
      if (singleQuestion.subExamType) {
        setSelectedSubExam({ 
          label: singleQuestion.subExamType.subExamType, 
          value: singleQuestion.subExamType._id 
        });
      }
      if (singleQuestion.section) {
        setSelectedSection({ 
          label: singleQuestion.section.section, 
          value: singleQuestion.section._id 
        });
      }
      if (singleQuestion.topic) {
        setSelectedTopic({ 
          label: singleQuestion.topic.topic, 
          value: singleQuestion.topic._id 
        });
      }
      if (singleQuestion.subtopic) {
        setSelectedSubTopic({ 
          label: singleQuestion.subtopic.subtopic, 
          value: singleQuestion.subtopic._id 
        });
      }
    } else {
      resetQuestionFields();
    }
  }, [singleQuestion, resetQuestionFields]);

  // --- Handlers ---
  const handleSubmit = async () => {
    try {
      setLoader(true);
      
      const payload: any = {
        // IDs from states (handling both object and primitive types)
        examType: selectedExamType?.value || selectedExamType?._id,
        subExamType: selectedSubExam?.value || selectedSubExam?._id,
        section: selectedSection?.value || selectedSection?._id,
        topicId: selectedTopic?.value || selectedTopic?._id,
        subtopicId: selectedSubTopic?.value || selectedSubTopic?._id,

        questionNo: activeQuestion,
        questionType,
        questionPessage,
        answerType,
        questionText: questionData,
        passage: questionPessage === "Pass" ? passage : "",
        hint: hintText,
        
        numericAnswer: answerType === "Numeric" ? numericAnswer : null,
        options: answerType === "MCQ" 
          ? options.map(({ text, isCorrect }) => ({ text, isCorrect })) 
          : [],
        correctAnswer: answerType === "Numeric" 
          ? numericAnswer.toString() 
          : options.find((o) => o.isCorrect)?.text || "",
          
        createdBy: userLogin?._id,
      };

      if (singleQuestion?._id) {
        payload._id = singleQuestion._id;
        await dispatch(handleupdateQuestionBank(payload));
      } else {
        await dispatch(createQuestionBank(payload));
      }
      
      // Post-submit reset or navigation logic
      if (!singleQuestion?._id) resetQuestionFields();
      
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setLoader(false);
    }
  };
const handleSubmitCancel=async()=>{
  const payload:any=null;
let res:any=await dispatch(handleQuestionBankSingleQuestion(payload))
}
  return (
    <>
      <QuestionBankHeader
        selectedExamType={selectedExamType}
        setSelectedExamType={setSelectedExamType}
        selectedSubExam={selectedSubExam}
        setSelectedSubExam={setSelectedSubExam}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedSubTopic={selectedSubTopic}
        setSelectedSubTopic={setSelectedSubTopic}
      />
    
      <SummaryTable open={openSummary} onClose={() => setOpenSummary(false)} />

      <div className="min-h-screen bg-white font-poppins">
        <div className="w-full mx-auto px-4 md:px-10 mb-8">
          
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4 border-b pb-4">
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-gray-500">Editing Question:</span>
               <span className="bg-[#005EB6] text-white px-3 py-1 rounded-full text-sm font-bold">
                 {activeQuestion}
               </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loader || !questionData}
                className="px-10 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e44d30] disabled:opacity-50 shadow-lg transition-all font-medium"
              >
                {loader ? "Saving..." : singleQuestion?._id ? "Update Question" : "Save & Next"}
              </button>
               <button
                onClick={handleSubmitCancel}
                className="px-10 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e44d30] disabled:opacity-50 shadow-lg transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              
              {/* Question Properties */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <Label className="font-bold text-gray-700 mb-4 block">Question Properties</Label>
                <div className="flex flex-wrap gap-8">
                  <div className="flex gap-4 items-center border-r pr-8">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Difficulty:</span>
                    {["Easy", "Medium", "Hard"].map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          className="w-4 h-4 accent-[#FF4D4F]"
                          checked={questionType === type}
                          onChange={() => setQuestionType(type)}
                        />
                        <span className={`text-sm ${questionType === type ? "text-[#FF4D4F] font-bold" : "text-gray-600"}`}>{type}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type:</span>
                    {["Normal", "Pass"].map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          className="w-4 h-4 accent-[#005EB6]"
                          checked={questionPessage === type}
                          onChange={() => setQuestionPessage(type)}
                        />
                        <span className={`text-sm ${questionPessage === type ? "text-[#005EB6] font-bold" : "text-gray-600"}`}>
                          {type === "Pass" ? "Passage Based" : "Standard"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Editors */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={questionPessage === "Pass" ? "md:w-2/3" : "w-full"}>
                    <Label className="mb-2 block font-semibold">Question Text (LaTeX)</Label>
                    <QuestionWithOptionsEditor
                                         value={questionData}
                                         onChange={setQuestionData}
                                         QuestionType="HideInternalPreview"
                                       />
                  </div>
                  {questionPessage === "Pass" && (
                    <div className="md:w-1/3">
                      <Label className="mb-2 block font-semibold text-[#005EB6]">Passage Text</Label>
                      <LatesForpassage value={passage} onChange={setPassage} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500 text-xs font-bold uppercase">Live Preview</Label>
                  <div className="border border-gray-200 rounded-lg p-6 min-h-[120px] bg-white shadow-inner">
                    <RenderPreview content={questionData} />
                  </div>
                </div>
              </div>

              {/* Answer Config */}
              <div className="bg-white border rounded-xl p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4">
                  <Label className="font-bold text-lg">Answer Configuration</Label>
                  <div className="flex gap-4 bg-gray-100 p-1 rounded-lg">
                    {["MCQ", "Numeric"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setAnswerType(t as AnswerType)}
                        className={`px-4 py-1.5 rounded-md text-sm transition-all ${answerType === t ? "bg-white shadow-sm text-[#FF4D4F] font-bold" : "text-gray-500"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {answerType === "MCQ" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {options.map((opt) => (
                      <OptionWithEditot
                        key={opt.id}
                        choice={opt.label}
                        value={opt.text}
                        isCorrect={opt.isCorrect}
                        onChange={(val) =>
                          setOptions((prev) =>
                            prev.map((o) => (o.id === opt.id ? { ...o, text: val } : o))
                          )
                        }
                        onCheckToggle={() =>
                          setOptions((prev) =>
                            prev.map((o) => ({
                              ...o,
                              isCorrect: o.id === opt.id,
                            }))
                          )
                        }
                        QuestionType={questionPessage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="max-w-md">
                    <Label className="text-sm mb-2 block">Correct numerical answer</Label>
                    <Input
                      type="number"
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(Number(e.target.value))}
                      className="text-lg border-2 focus:border-[#FF4D4F]"
                    />
                  </div>
                )}
              </div>

              {/* Solution */}
              <div className="space-y-4 pt-6 border-t">
                <Label className="font-bold text-gray-700">Detailed Explanation</Label>
                <LatexForSoluction value={hintText} onChange={setHintText} />
                <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  <RenderPreview content={hintText} />
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

export default QuestioBankExam;