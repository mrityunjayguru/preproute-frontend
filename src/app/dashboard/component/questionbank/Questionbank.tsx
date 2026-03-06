"use client";

import React from "react";
import QuestionBankTable from "./Component/QuestionBankTable";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

function Questionbank() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Question Bank
        </h1>

        <button
          onClick={() => router.push("questionbank/create")}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          Create Question
        </button>
      </div>

      {/* Table */}
      <QuestionBankTable />
    </div>
  );
}

export default Questionbank;