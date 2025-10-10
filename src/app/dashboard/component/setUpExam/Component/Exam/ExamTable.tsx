import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getexam } from '@/api/Exam';
import CommonTable from '@/Common/CommonTable';

const ExamTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  const getData = async () => {
    const payload: any = {};
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
      cell: (value: any) => (value ? "Yes" : "No") 
    },
    { header: "Created At", accessor: "createdAt" },
  ];

  // Optional: Apply search filter
  const filteredData = exam.filter((item: any) =>
    item.examname?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search Exam"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable with JSON-style columns */}
      <CommonTable
        data={filteredData}
        columns={columns}
      />
    </div>
  );
};

export default ExamTable;
