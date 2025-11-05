"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getCommonexam, getCommonQuestionBeExamId, getexam, getQuestionBeExamId } from "@/api/Exam";
import { AppDispatch } from "@/store/store";
import { BookIcon } from "lucide-react";
import { CutOffIcons } from "@/Common/svgIcon";

export const ExamHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const examdata = useSelector((state: any) => state?.exam?.exam) || [];
  const selectedExamType = useSelector(
    (state: any) => state.examType?.selectedExamType
  );

  const [selectedExam, setSelectedExam] = useState<any>(null);

  // Fetch exam data
  const getData = async () => {
    try {
      const payload: any = {};
      await dispatch(getCommonexam(payload));
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle select
  const handleSelect = (selectedOption: any) => {
    if (!selectedOption) return;
    const selectedExam = selectedOption.value;
    const payload: any = {
      examid: selectedExam?._id,
      examTypeId: selectedExamType?._id,
      isPublished:true
    };
    dispatch(getCommonQuestionBeExamId(payload));
    setSelectedExam(selectedExam);
  };

  // Convert to react-select options
  const examOptions =
    examdata?.map((exam: any) => ({
      label: exam.examname,
      value: exam,
    })) || [];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4 px-4 md:px-12 ">
      {/* Left: Exam Dropdown */}
      <div className="w-full md:w-1/3 min-w-[250px]">
        <Select
          options={examOptions}
          value={
            selectedExam
              ? { label: selectedExam.examname, value: selectedExam }
              : null
          }
          onChange={handleSelect}
          placeholder="Select Exam"
          className="text-base font-medium"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "0.75rem",
              backgroundColor: "#F7F7F5",
              borderColor: "#e5e7eb",
              boxShadow: "none",
              padding: "4px 6px",
              "&:hover": {
                borderColor: "#FF5635",
              },
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "#FF5635",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#FFEFEA"
                : state.isFocused
                ? "#FFF5F2"
                : "white",
              color: state.isSelected ? "#FF5635" : "#000",
              cursor: "pointer",
            }),
          }}
          isSearchable={true}
        />
      </div>

      {/* Right: Buttons */}
      {/* <div className="flex flex-wrap justify-center md:justify-end gap-3">
        <Button
          size="sm"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF5635] text-white text-sm md:text-base font-medium rounded-lg hover:bg-[#ff4b2b] shadow-md transition-all"
        >
          <BookIcon className="h-4 w-4" />
          <span>Syllabus</span>
        </Button>

        <Button
          size="sm"
          className="flex items-center gap-2 px-4 py-2 bg-[#000] text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-800 shadow-md transition-all"
        >
          <CutOffIcons />
          <span>Cutoff</span>
        </Button>
      </div> */}
    </header>
  );
};
