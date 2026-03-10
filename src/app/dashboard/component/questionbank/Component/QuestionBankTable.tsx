"use client";

import {
  getQuestionBank,
  getUsedQuestion,
  handleQuestionBankSingleQuestion,
  handleupdateQuestionBank,
} from "@/api/Question";
import RenderPreview from "@/Common/CommonLatex";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsedQuestionPaperModel from "./UsedQuestionPaperModel";

function QuestionBankTable({ groupId, createdBy }: any) {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const questionBank = useSelector(
    (state: any) => state?.question?.questionBank || []
  );

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [usedModalOpen, setUsedModalOpen] = useState(false);

  /* ================= FETCH QUESTION BANK ================= */

  useEffect(() => {

    const payload: any = {};

    if (groupId) payload.groupId = groupId;
    if (createdBy) payload.createdBy = createdBy;

    dispatch(getQuestionBank(payload));

  }, [groupId, createdBy]);

  /* ================= EDIT ================= */

  const handleEditQuestion = async (questionItem: any) => {
    await dispatch(handleQuestionBankSingleQuestion(questionItem));
    router.push("questionbank/create");
  };

  /* ================= STATUS ================= */

  const handleChangeStatus = async (questionItem: any) => {

    if (userLogin?.role !== "Admin") return;

    const payload: any = {
      _id: questionItem._id,
      status: !questionItem.status,
    };

    await dispatch(handleupdateQuestionBank(payload));

    const filter: any = {};
    if (groupId) filter.groupId = groupId;
    if (createdBy) filter.createdBy = createdBy;

    dispatch(getQuestionBank(filter));
  };

  /* ================= FEEDBACK ================= */

  const openFeedbackModal = (questionItem: any) => {
    setSelectedQuestion(questionItem);
    setFeedbackText(questionItem?.feedbackText || "");
    setShowFeedback(true);
  };

  const handleSubmitFeedback = async () => {

    const payload:any = {
      _id: selectedQuestion._id,
      feedbackText,
    };

    await dispatch(handleupdateQuestionBank(payload));

    setShowFeedback(false);
    setSelectedQuestion(null);
    setFeedbackText("");

    const filter: any = {};
    if (groupId) filter.groupId = groupId;
    if (createdBy) filter.createdBy = createdBy;

    dispatch(getQuestionBank(filter));
  };

  /* ================= USED MODAL ================= */

  const openUsedModal = (val: any) => {

    const payload:any = {
      _id: val?._id,
    };

    setUsedModalOpen(true);
    dispatch(getUsedQuestion(payload));
  };

  return (
    <>
      <UsedQuestionPaperModel
        usedModalOpen={usedModalOpen}
        setUsedModalOpen={setUsedModalOpen}
      />

      {/* FEEDBACK MODAL */}

      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Feedback for Question
            </h3>

            <textarea
              className="w-full border rounded-lg p-3"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowFeedback(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              {userLogin?.role === "Admin" && (
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Submit
                </button>
              )}

            </div>
          </div>
        </div>
      )}

      {/* TABLE */}

      <div className="p-6">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Question Bank
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm text-left text-gray-600">

              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Id</th>
                  <th className="px-6 py-3">Exam Type</th>
                  <th className="px-6 py-3">Sub Exam</th>
                  <th className="px-6 py-3">Section</th>
                  <th className="px-6 py-3">Topic</th>
                  <th className="px-6 py-3">Sub Topic</th>
                  <th className="px-6 py-3">Question</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Feedback</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Used</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3">Edit</th>
                </tr>
              </thead>

              <tbody>

                {questionBank.map((item: any) => (

                  <tr key={item._id} className="border-b hover:bg-gray-50">

                    <td className="px-6 py-4">{item?.uniqueId}</td>

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

                    <td className="px-6 py-4 max-w-sm">
                      <RenderPreview content={item?.questionText} />
                    </td>

                    <td
                      onClick={() => handleChangeStatus(item)}
                      className={`px-6 py-4 cursor-pointer ${
                        item?.status ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item?.status ? "Active" : "Inactive"}
                    </td>

                    <td
                      onClick={() => openFeedbackModal(item)}
                      className="px-6 py-4 text-indigo-600 cursor-pointer"
                    >
                      Feedback
                    </td>

                    <td className="px-6 py-4">
                      {item?.createdBy?.username || "Unknown"}
                    </td>

                    <td
                      onClick={() => openUsedModal(item)}
                      className="px-6 py-4 text-indigo-600 cursor-pointer"
                    >
                      {item?.totalCount}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </td>

                    <td
                      onClick={() => handleEditQuestion(item)}
                      className="px-6 py-4 text-blue-600 cursor-pointer"
                    >
                      Edit
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </>
  );
}

export default QuestionBankTable;