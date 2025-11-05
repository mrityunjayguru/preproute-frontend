"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Step6({ nextStep, prevStep, updateForm, formData }: any) {
  // Options shown in your screenshot
  const sourceOptions = [
    { id: "youtube", name: "YouTube" },
    { id: "ads_youtube", name: "Ads (YouTube)" },
    { id: "friend_family", name: "Friend/Family" },
    { id: "instagram", name: "Instagram" },
    { id: "reddit", name: "Reddit" },
    { id: "google", name: "Google" },
    { id: "seniors", name: "Seniors" },
    { id: "others", name: "Others" },
  ];

  const [source, setSource] = useState(formData.source || "");

  const handleNext = () => {
    updateForm({ source });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">How did you hear about us?</h2>

      {/* Two-column responsive grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {sourceOptions.map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 ${
              source === item.id ? "border-red-400 bg-red-50" : ""
            }`}
          >
            <span className="text-gray-700">{item.name}</span>
            <input
              type="radio"
              name="source"
              value={item.id}
              checked={source === item.id}
              onChange={() => setSource(item.id)}
              className="accent-red-500"
            />
          </label>
        ))}
      </div>

      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="orange"
          disabled={!source}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
