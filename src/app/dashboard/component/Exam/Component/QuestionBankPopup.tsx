"use client";

import {
  getQuestionBank,
  handleQuestionBankSingleQuestion,
  handleSetSingleQuestion,
  handleupdateQuestionBank,
} from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBankHeader from "../../questionbank/Component/QuestionBankHeader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questionBankItem: (item: any) => void;
  activeSection:any
}

function QuestionBankPopup({ isOpen, onClose, questionBankItem,activeSection }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
console.log(activeSection,"activeSectionactiveSection")
  const questionBank = useSelector(
    (state: any) => state?.question?.questionBank || [],
  );

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedExamType, setSelectedExamType] = useState<any>(null);
  const [selectedSubExam, setSelectedSubExam] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>(null);
  /* ================= FETCH QUESTION BANK ================= */
  useEffect(() => {
    if (isOpen) {
      dispatch(getQuestionBank({}));
    }
  }, [dispatch, isOpen]);

  /* ================= EDIT QUESTION ================= */
  const handleEditQuestion = async (questionItem: any) => {
    await dispatch(handleQuestionBankSingleQuestion(questionItem));
    router.push("questionbank/create");
    onClose();
  };

  /* ================= CHANGE STATUS ================= */
  const handleChangeStatus = async (questionItem: any) => {
    if (userLogin?.role !== "Admin") return;

    const payload = {
      _id: questionItem._id,
      status: !questionItem.status,
    };

    await dispatch(handleupdateQuestionBank(payload));
    dispatch(getQuestionBank({}));
  };

  /* ================= FEEDBACK ================= */
  const openFeedbackModal = (questionItem: any) => {
    setSelectedQuestion(questionItem);
    setFeedbackText(questionItem?.feedbackText || "");
    setShowFeedback(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedQuestion) return;

    const payload = {
      _id: selectedQuestion._id,
      feedbackText,
    };

    await dispatch(handleupdateQuestionBank(payload));

    setShowFeedback(false);
    setFeedbackText("");
    setSelectedQuestion(null);

    dispatch(getQuestionBank({}));
  };

  if (!isOpen) return null;
const handleAddQuestion = (questionItem: any) => {  
questionBankItem(questionItem);
let payload:any=[]
payload=[]
payload.push(questionItem)
// dispatch(handleSetSingleQuestion(payload))
}
  return (
    <>
  
      {/* ================= MAIN POPUP ================= */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white w-[95%] max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-700">
              Question Bank
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
          </div>
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
          {/* Table */}
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
                <tr>
                  <th className="px-6 py-3">Exam Type</th>
                  <th className="px-6 py-3">Sub Exam</th>
                  <th className="px-6 py-3">Section</th>
                  <th className="px-6 py-3">Topic</th>
                  <th className="px-6 py-3">Sub Topic</th>
                  <th className="px-6 py-3">Question</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Add</th>
                </tr>
              </thead>

              <tbody>
                {questionBank.length > 0 ? (
                  questionBank.map((item: any) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        {item?.examType?.examType || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.subExamType?.subExamType || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.section?.section || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.topic?.topic || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.subtopic?.subtopic || "-"}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800 max-w-sm">
                        <RenderPreview content={item?.questionText} />
                      </td>


                      <td className="px-6 py-4">
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </td>

                      <td
                        onClick={() => handleAddQuestion(item)}
                        className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                      >
                        Add
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-6 text-gray-400">
                      No Questions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= FEEDBACK MODAL ================= */}
      {showFeedback && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Feedback for Question
            </h3>

            <div className="mb-3 text-sm text-gray-600 line-clamp-2">
              <RenderPreview content={selectedQuestion?.questionText} />
            </div>

            <textarea
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackText("");
                  setSelectedQuestion(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              {userLogin?.role === "Admin" && (
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionBankPopup;