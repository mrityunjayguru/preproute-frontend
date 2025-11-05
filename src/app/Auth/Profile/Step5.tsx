"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getCommonexam } from "@/api/Exam";
import { AppDispatch } from "@/store/store";

export default function Step5({ nextStep, prevStep, updateForm, formData }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const examdata = useSelector((state: any) => state?.exam?.exam) || [];

  const [selectedExams, setSelectedExams] = useState<string[]>(formData.exams || []);

  // 🔹 Fetch exams on mount
  useEffect(() => {
    const getData = async () => {
      try {
        const payload:any={}
        await dispatch(getCommonexam(payload));
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };
    getData();
  }, [dispatch]);

  // 🔹 Toggle selected exams by _id
  const toggleExam = (id: string) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 🔹 On Next
  const handleNext = () => {
    updateForm({ exams: selectedExams });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Select Your Exam Type</h2>

      {/* 🔹 Dynamically generated exam options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {examdata.length > 0 ? (
          examdata.map((exam: any) => (
            <label
              key={exam._id}
              className={`flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                selectedExams.includes(exam._id)
                  ? "border-red-400 bg-red-50"
                  : ""
              }`}
            >
              <span className="text-gray-700">{exam.examname}</span>
              <input
                type="checkbox"
                checked={selectedExams.includes(exam._id)}
                onChange={() => toggleExam(exam._id)}
                className="accent-red-500"
              />
            </label>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            Loading exams...
          </p>
        )}
      </div>

      {/* 🔹 Navigation buttons */}
      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="orange"
          disabled={selectedExams.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
