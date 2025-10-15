"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getexam, getQuestionBeExamId } from "@/api/Exam";
import { AppDispatch } from "@/store/store";

export const ExamHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const examdata = useSelector((state: any) => state?.exam?.exam) || [];
  
  const selectedExamType=useSelector((state:any)=>state.examType?.selectedExamType)
  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  // Fetch exam data
  const getData = async () => {
    try {
      const payload: any = {};
      await dispatch(getexam(payload));
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle dropdown select
  const handleSelect = (exam: any) => {
    const payload:any={
      examid:exam?._id,
      examTypeId:selectedExamType?._id
    }
    dispatch(getQuestionBeExamId(payload))
    setSelectedExam(exam);
    setOpen(false);
  };

  return (
    <header className="relative flex justify-between items-center py-4 px-6 md:px-12 border-b border-gray-100 bg-white">
      {/* Left: Exam Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center text-lg font-semibold text-gray-700 focus:outline-none"
        >
          {selectedExam?.examname || "Select Exam"}
          <ChevronDownIcon
            className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
            {examdata?.length > 0 ? (
              examdata.map((exam: any) => (
                <div
                  key={exam._id || exam.examname}
                  onClick={() => handleSelect(exam)}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    selectedExam?._id === exam._id
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {exam.examname}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No exams found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex space-x-3">
        <Button
          size="sm"
          className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
        >
          Syllabus
        </Button>
        <Button
          size="sm"
          className="bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
        >
          Cutoff
        </Button>
      </div>
    </header>
  );
};
