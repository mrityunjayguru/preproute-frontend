"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Step4({ nextStep, prevStep, updateForm, formData }: any) {
  const currentYear = new Date().getFullYear();

  // Generate next 5 years dynamically
  const dummyYears = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear + i;
    return { id: year.toString(), year: year.toString() };
  });

  const [year, setYear] = useState(formData.year || "");

  const handleNext = () => {
    updateForm({ year });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Select Your Exam Year</h2>

      {dummyYears.map((yr) => (
        <label
          key={yr.id}
          className={`flex items-center justify-between w-full border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 ${
            year === yr.id ? "border-red-400 bg-red-50" : ""
          }`}
        >
          <span className="text-gray-700">{yr.year}</span>
          <input
            type="radio"
            name="year"
            value={yr.id}
            checked={year === yr.id}
            onChange={() => setYear(yr.id)}
            className="accent-red-500"
          />
        </label>
      ))}

      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="orange"
          disabled={!year}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
