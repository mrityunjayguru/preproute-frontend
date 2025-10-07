"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useSelector } from "react-redux";

export const ExamHeader = () => {
  const examDetail=useSelector((state:any)=>state?.examType?.examDetail)

  const [open, setOpen] = useState(false);
const [exam,setExam]=useState<string>("")
  const handleSelect = (exam: string) => {
    setExam(exam)
    setOpen(false);
  };

  return (
    <header className="relative flex justify-between items-center py-4 px-6 md:px-12 border-b border-gray-100 bg-white">
      {/* Left: Institute Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center text-lg font-semibold text-gray-700 focus:outline-none"
        >
          {exam}
          <ChevronDownIcon
            className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
            {examDetail && examDetail.length>0 && examDetail?.map((exam:any) => (
              <div
                key={exam}
                onClick={() => handleSelect(exam)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {exam}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="orange"
          size="sm"
          className="shadow-lg hover:shadow-xl"
        >
          Syllabus
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
        >
          Cutoff
        </Button>
      </div>
    </header>
  );
};
