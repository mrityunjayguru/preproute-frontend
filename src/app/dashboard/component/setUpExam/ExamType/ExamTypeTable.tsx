"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CommonTable from "@/Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType, handleUpdateExamType } from "@/api/ExamType";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";

interface ExamType {
  id: number;
  examType: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: any;
}

const ExamTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];

  const [search, setSearch] = useState("");

  // Fetch exam types
  const fetchData = async () => {
    const pauload: any = {};
    await dispatch(getExamType(pauload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define columns dynamically
  const columns = [
    { header: "Exam Type", accessor: "examType" },
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
    <div className="">
      <div className="flex justify-between items-center pb-3">
      <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">Exam Type List</h2>
      {/* Search box */}
      <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search Exam Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>
      </div>
      {/* CommonTable */}
      <CommonTable data={examTypeData} columns={columns} onEdit={handleEdit} />
    </div>
  );
};

export default ExamTypeTable;
