"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserResult() {
  const examResult = useSelector((state: any) => state.question?.result);

  if (!examResult) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No result available. Please complete the exam first.
      </div>
    );
  }

  const {
    accuracy,
    attempted,
    correct,
    wrong,
    notAttempted,
    totalMarks,
    totalNegative,
    totalQuestions,
    percentage,
    totalPossibleMarks,
    details = [],
  } = examResult;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl p-6 bg-white">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          Exam Result Summary
        </h1>

        {/* --- Summary Stats --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-center">
          <div className="p-4 border rounded-lg bg-green-50">
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="text-xl font-bold text-green-700">{totalQuestions}</p>
          </div>
           <div className="p-4 border rounded-lg bg-green-50">
            <p className="text-sm text-gray-500">Total Mark</p>
            <p className="text-xl font-bold text-green-700">{totalPossibleMarks}</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-blue-50">
            <p className="text-sm text-gray-500">Attempted</p>
            <p className="text-xl font-bold text-blue-700">{attempted}</p>
          </div>
          <div className="p-4 border rounded-lg bg-yellow-50">
            <p className="text-sm text-gray-500">Correct</p>
            <p className="text-xl font-bold text-yellow-700">{correct}</p>
          </div>
          <div className="p-4 border rounded-lg bg-red-50">
            <p className="text-sm text-gray-500">Wrong</p>
            <p className="text-xl font-bold text-red-700">{wrong}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-100">
            <p className="text-sm text-gray-500">Not Attempted</p>
            <p className="text-xl font-bold text-gray-700">{notAttempted}</p>
          </div>
          <div className="p-4 border rounded-lg bg-indigo-50">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-xl font-bold text-indigo-700">{accuracy}</p>
          </div>
        </div>

        {/* --- Marks Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg text-center bg-green-100">
            <p className="text-sm text-gray-500">Total Marks</p>
            <p className="text-2xl font-bold text-green-700">{totalMarks}</p>
          </div>
          <div className="p-4 border rounded-lg text-center bg-red-100">
            <p className="text-sm text-gray-500">Negative Marks</p>
            <p className="text-2xl font-bold text-red-700">{totalNegative}</p>
          </div>
          <div className="p-4 border rounded-lg text-center bg-blue-100">
            <p className="text-sm text-gray-500">Percentage</p>
            <p className="text-2xl font-bold text-blue-700">{percentage}</p>
          </div>
        </div>

        {/* --- Question-wise Detail --- */}
        {/* <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Question-wise Analysis
        </h2>
        {details.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Question</th>
                  <th className="border p-2 text-center">Your Answer</th>
                  <th className="border p-2 text-center">Correct Answer</th>
                  <th className="border p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="border p-2 font-semibold text-gray-700">
                      {idx + 1}
                    </td>
                    <td
                      className="border p-2 text-gray-800"
                      dangerouslySetInnerHTML={{ __html: item.questionText }}
                    />
                    <td className="border p-2 text-center">
                      {item.userAnswer || "-"}
                    </td>
                    <td className="border p-2 text-center">
                      {item.correctAnswer || "-"}
                    </td>
                    <td
                      className={`border p-2 text-center font-bold ${
                        item.isCorrect
                          ? "text-green-600"
                          : item.userAnswer
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.isCorrect
                        ? "✔ Correct"
                        : item.userAnswer
                        ? "✖ Wrong"
                        : "Not Attempted"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No detailed analysis available.
          </p>
        )}

        <div className="flex justify-center mt-6">
          <Button variant="destructive" onClick={() => window.location.reload()}>
            Reattempt Exam
          </Button>
        </div> */}
      </Card>
    </div>
  );
}
