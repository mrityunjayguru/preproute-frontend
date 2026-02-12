import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getexam, handlesetUpdateExam } from "@/api/Exam";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";

interface ExamTableProps {
  data: any;
}

const ExamTable: React.FC<ExamTableProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  const getData = async () => {
    const payload: any = {
      examtypeId: data?.id, // Pass the exam type ID to fetch relevant exams
    };
    await dispatch(getexam(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Define columns same as your exam JSON structure
  const columns = [
    { header: "Exam Name", accessor: "examname" },
    {
      header: "Switchable",
      accessor: "switchable",
      // ✅ Custom render: true → Yes, false → No
      cell: (value: any) => (value ? "Yes" : "No"),
    },
    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];
  // Optional: Apply search filter
  const filteredData = exam.filter((item: any) =>
    item.examname?.toLowerCase().includes(search.toLowerCase())
  );
  const handleEdit = (val: any) => {
    dispatch(handlesetUpdateExam(val));
  };
  return (
    <div className="">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">
          Exam Type List
        </h2>
        {/* Search box */}
        <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Input
            type="text"
            placeholder="Search Exam"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 bg-[#ffffff]"
          />
        </div>
      </div>
      {/* CommonTable with JSON-style columns */}
      <CommonTable data={filteredData} columns={columns} onEdit={handleEdit} />
    </div>
  );
};

export default ExamTable;
