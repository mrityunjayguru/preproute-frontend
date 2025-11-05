"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Step3({ nextStep, prevStep, updateForm, formData }: any) {
  const [stream, setStream] = useState(formData.stream || "");

  // Updated stream options
  const dummyStreams = [
    { id: "commerce_math", name: "Commerce (Math)" },
    { id: "commerce_nonmath", name: "Commerce (Non-Math)" },
    { id: "pcm", name: "PCM" },
    { id: "pcb", name: "PCB" },
    { id: "pcmb", name: "PCMB" },
    { id: "humanities", name: "Humanities" },
  ];

  const handleNext = () => {
    updateForm({ stream });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Select Your Stream</h2>

      {dummyStreams.map((option) => (
        <label
          key={option.id}
          className={`flex items-center justify-between w-full border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 ${
            stream === option.id ? "border-red-400 bg-red-50" : ""
          }`}
        >
          <span className="text-gray-700">{option.name}</span>
          <input
            type="radio"
            name="stream"
            value={option.id}
            checked={stream === option.id}
            onChange={() => setStream(option.id)}
            className="accent-red-500"
          />
        </label>
      ))}

      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>
        <Button onClick={handleNext} variant="orange" disabled={!stream}>
          Next
        </Button>
      </div>
    </div>
  );
}
