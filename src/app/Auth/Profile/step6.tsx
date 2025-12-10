"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Step6({ nextStep, prevStep, updateForm, formData }: any) {
  const [userType, setUserType] = useState(formData.userType || "");

  const options = [
    { id: "fresher", name: "Fresher" },
    { id: "partial_dropper", name: "Partial Dropper" },
    { id: "full_dropper", name: "Full Dropper" },
  ];

  const handleNext = () => {
    updateForm({ userType });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800">Select User Type</h2>

      <div className="w-full space-y-3">
        {options.map((option) => {
          const selected = userType === option.id;

          return (
            <label
              key={option.id}
              className={`flex items-center justify-between w-full border rounded-xl px-5 py-3 cursor-pointer transition-all duration-200 
              ${
                selected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className=" font-medium">{option.name}</span>

              <input
                type="radio"
                className="w-4 h-4 accent-red-500"
                name="userType"
                value={option.id}
                checked={selected}
                onChange={() => setUserType(option.id)}
              />
            </label>
          );
        })}
      </div>

      <div className="flex justify-between w-full mt-6">
        <Button onClick={prevStep} variant="gray" className="px-6">
          Back
        </Button>

        <Button
          onClick={handleNext}
          variant="orange"
          className="px-6"
          disabled={!userType}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
