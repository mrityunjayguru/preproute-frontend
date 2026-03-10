"use client";

import React from "react";
import { useSelector } from "react-redux";

interface Props {
  usedModalOpen: boolean;
  setUsedModalOpen: (val: boolean) => void;
}

function UsedQuestionPaperModel({ usedModalOpen, setUsedModalOpen }: Props) {
  const usedQuestion = useSelector(
    (state: any) => state?.question?.usedQuestion
  );

  if (!usedModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Used Question Details
          </h3>

          <button
            onClick={() => setUsedModalOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        {usedQuestion?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-4 py-3">Exam Name</th>
                  <th className="px-4 py-3">Question Paper</th>
                  <th className="px-4 py-3">Question No</th>
                </tr>
              </thead>

              <tbody>
                {usedQuestion.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item?.exam?.examname || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {item?.questionpaper?.questionPapername || "-"}
                    </td>

                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {item?.questionNo || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No usage found
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-5">
          <button
            onClick={() => setUsedModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default UsedQuestionPaperModel;