"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getexam, handleSelectedExamDetail, handlesetSelectedExam } from "@/api/Exam";
import { getExamBeExamTypeId, getExamType } from "@/api/ExamType";

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");

  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
  const examDetail = useSelector((state: any) => state?.examType?.examDetail) || [];

  // Fetch exam types
  useEffect(() => {
    const payload:any={}
    dispatch(getExamType(payload));
  }, [dispatch]);

  // Fetch exam details by examType ID
  useEffect(() => {
    if (examType) {
      const payload:any={
        id: examType 
      }
      dispatch(getExamBeExamTypeId(payload));
    }
  }, [dispatch, examType]);

  // Generate last 10 years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target,"vvvvvvvvvvv")
    setExamType(e.target.value);
    setExamName("");
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExamName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examType || !examName || !year) return alert("Please select all fields.");

    const payload:any = {
      examName,
      examType,
      year,
    };
    await dispatch(handlesetSelectedExam(payload));
    await dispatch(handleSelectedExamDetail(payload))
    router.push("manageExam");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
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
            <option key={type.id} value={type.id}>
              {type.name}
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
          {examDetail.length > 0 &&
            examDetail.map((ex: any, index: number) => (
              <option key={index} value={ex}>
                {ex}
              </option>
            ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
        >
          <option value="">Which Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

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
