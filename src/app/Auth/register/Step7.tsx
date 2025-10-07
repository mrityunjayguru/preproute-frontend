"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeftLoginIcon, RightLoginIcon } from "@/Common/svgIcon";

export default function Step7({ nextStep, prevStep, updateForm, formData }: any) {
  const [source, setSource] = useState(formData.source || "");

  const options = [
    { id: "youtube", name: "YouTube" },
    { id: "facebook", name: "Facebook" },
    { id: "instagram", name: "Instagram" },
    { id: "twitter", name: "Twitter" },
    { id: "friend", name: "Friend" },
    { id: "other", name: "Other" },
  ];

  const handleNext = () => {
    updateForm({ source, step: "4" });
    nextStep();
  };

  return (
    <div className="flex flex-col text-gray-800">
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Card */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
                  <LeftLoginIcon />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
                  <RightLoginIcon />
                </div>
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1A1D1F] mb-4 text-center">
              Where did you hear about us?
            </h2>

            <div className="space-y-3">
              {options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">{option.name}</span>
                  <input
                    type="radio"
                    name="source"
                    value={option.id}
                    checked={source === option.id}
                    onChange={() => setSource(option.id)}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-between w-[50%] gap-2 mt-4 ">
              <Button onClick={prevStep} variant="gray">
                Back
              </Button>
              <Button onClick={handleNext} variant="orange">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
