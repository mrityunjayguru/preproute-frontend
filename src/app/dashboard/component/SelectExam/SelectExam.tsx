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

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [yearOrSet, setYearOrSet] = useState("");

  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  // Fetch all exam types and exams
  useEffect(() => {
    const payload:any={}
    dispatch(getExamType(payload));
    dispatch(getexam(payload));
  }, [dispatch]);

  // Generate last 10 years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

 // Generate mock sets from 1 to 50
const mockSets = Array.from({ length: 50 }, (_, i) => `Mocks ${i + 1}`);

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
      examid:examName,
      examTypeId:examType,
      questionPapername: yearOrSet, // can be year or set name
    };
   let responce:any= await dispatch(createQuestionPaper(payload))
    // await dispatch(handlesetSelectedExam(payload));
    if(responce.payload==true){
  await dispatch(handleSelectedExamDetail(payload))
    router.push("manageExam");
    }
  
  };

  // Get selected exam type name (to decide dropdown)
  const selectedExamTypeName =
    examTypeData.find((t: any) => t._id === examType)?.examType || "";

  return (
    <div className="flex items-center min-h-screen justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Choose an Exam
        </h2>

        {/* Exam Type Dropdown */}
        <select
          value={examType}
          onChange={handleExamTypeChange}
          className="w-full mb-4 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
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
          className="w-full mb-4 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
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
            className="w-full mb-6 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
          >
            <option value="">Select Mock Set</option>
            {mockSets.map((set) => (
              <option key={set} value={set}>
                {set}
              </option>
            ))}
          </select>
        ) : selectedExamTypeName.toLowerCase() === "past year" ? (
          <select
            value={yearOrSet}
            onChange={(e) => setYearOrSet(e.target.value)}
            className="w-full mb-6 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
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
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectExamForm;
