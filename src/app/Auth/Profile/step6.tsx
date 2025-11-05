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
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Select User Type</h2>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center justify-between w-full border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50"
        >
          <span>{option.name}</span>
          <input
            type="radio"
            name="userType"
            value={option.id}
            checked={userType === option.id}
            onChange={() => setUserType(option.id)}
          />
        </label>
      ))}

      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>
        <Button onClick={handleNext} variant="orange">
          Next
        </Button>
      </div>
    </div>
  );
}
