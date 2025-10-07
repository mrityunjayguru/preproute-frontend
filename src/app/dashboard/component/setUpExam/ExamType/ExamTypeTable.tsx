"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CommonTable from "@/Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";

interface ExamType {
  id: number;
  name: string;
  code?: string;
  description?: string | null;
  examduration?: number | null;
  switchable?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: any;
}

const ExamTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
  const [search, setSearch] = useState("");
  // Fetch exam types
  const fetchData = async () => {
    const payload:any={}
    await dispatch(getExamType(payload));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Define columns dynamically
  const columns = [
    { header: "Exam Name", accessor: "name" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable */}
      <CommonTable
        data={examTypeData}
        columns={columns}
      />
    </div>
  );
};

export default ExamTypeTable;
