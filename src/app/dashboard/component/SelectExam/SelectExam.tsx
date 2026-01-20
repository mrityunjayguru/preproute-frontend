"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  getexam,
  handleSelectedExamDetail,
  handlesetSelectedExam,
} from "@/api/Exam";
import { getExamType } from "@/api/ExamType";
import { createQuestionPaper } from "@/api/QuestionPaper";
import Footer from "@/app/layouts/_component/footer";

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [yearOrSet, setYearOrSet] = useState("");

  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  // Fetch all exam types and exams
  useEffect(() => {
    const payload: any = {};
    dispatch(getExamType(payload));
    dispatch(getexam(payload));
  }, [dispatch]);

  // Generate last 10 years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  // Generate mock sets from 1 to 50
  const mockSets = Array.from({ length: 50 }, (_, i) => `Mock ${i + 1}`);

  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExamType(e.target.value);
    setExamName("");
    setYearOrSet("");
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExamName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examType || !examName || !yearOrSet) {
      alert("Please select all fields.");
      return;
    }
    const payload: any = {
      examid: examName,
      examTypeId: examType,
      questionPapername: yearOrSet, // can be year or set name
    };
    let responce: any = await dispatch(createQuestionPaper(payload));
    // await dispatch(handlesetSelectedExam(payload));
    if (responce.payload == true) {
      await dispatch(handleSelectedExamDetail(payload));
      router.push("manageExam");
    }
  };

  // Get selected exam type name (to decide dropdown)
  const selectedExamTypeName =
    examTypeData.find((t: any) => t._id === examType)?.examType || "";
// alert(selectedExamTypeName)
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
          <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
            <h1 className="text-[#FF5635] text-2xl f font-poppins">
              Create Exam
            </h1>
          </div>
        </div>
        <div className="mx-auto flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-[8px] p-6"
          >
            {/* Exam Type Dropdown */}
            <select
              value={examType}
              onChange={handleExamTypeChange}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
            >
              <option value="">Choose Exam Type</option>
              {examTypeData.map((type: any) => (
                <option key={type._id} value={type._id}>
                  {type.examType}
                </option>
              ))}
            </select>

            {/* Exam Dropdown */}
            <select
              value={examName}
              onChange={handleExamChange}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
            >
              <option value="">Choose Exam</option>
              {exam.length > 0 &&
                exam.map((ex: any) => (
                  <option key={ex._id} value={ex._id}>
                    {ex.examname}
                  </option>
                ))}
            </select>

            {/* Conditional Dropdown */}
            {selectedExamTypeName.toLowerCase() === "mocks" ? (
              <select
                value={yearOrSet}
                onChange={(e) => setYearOrSet(e.target.value)}
                className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
              >
                <option value="">Select Mock Set</option>
                {mockSets.map((set: any) => (
                  <option key={set} value={set}>
                    {set}
                  </option>
                ))}
              </select>
            ) : selectedExamTypeName.toLowerCase() === "pyqs" ? (
              <select
                value={yearOrSet}
                onChange={(e) => setYearOrSet(e.target.value)}
                className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
              >
                <option value="">Select Year</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            ) : null}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#FF5635] text-white rounded-[8px] hover:bg-[#FF5635]/90 transition font-poppins "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectExamForm;
