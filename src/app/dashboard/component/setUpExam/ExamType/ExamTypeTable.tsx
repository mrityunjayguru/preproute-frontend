"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CommonTable from "@/Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType, handleUpdateExamType } from "@/api/ExamType";
import { formatDateTime } from "@/Common/ComonDate";

interface ExamType {
  id: number;
  examType: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: any;
}

const ExamTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const examTypeData = useSelector(
    (state: any) => state.examType.examType
  ) || [];

  const [search, setSearch] = useState("");

  // Fetch exam types
  const fetchData = async () => {
    const pauload:any={}
    await dispatch(getExamType(pauload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define columns dynamically
  const columns = [
    { header: "Exam Name", accessor: "examType" },
    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];

  const handleEdit = async (data: any) => {
    await dispatch(handleUpdateExamType(data));
  };

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
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ExamTypeTable;
