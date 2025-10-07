"use client";

import React, { useState } from "react";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function Step3({
  nextStep,
  prevStep,
  updateForm,
  formData,
}: any) {
  const [stream, setStream] = useState(formData.stream || "");
const subject=useSelector((state:any)=>state?.Auth.subject)

  const handleNext = () => {
    updateForm({ stream,step:"5" });
    nextStep();
  };

  return (
    <div>
      <div className="flex  flex-col text-gray-800">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Illustrations */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
            <LeftLoginIcon />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
            <RightLoginIcon />
          </div>

          {/* Card */}
          <div className="w-full max-w-sm mx-auto z-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <span className="p-2  rounded-full mr-3">
                   <MailIcons/>
                 
                </span>
                <h2 className="text-xl font-semibold text-[#1A1D1F]">Stream</h2>
              </div>

              <div className="space-y-3">
                {subject?.map((option:any, idx:any) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium">{option.name}</span>
                    <input
                      type="radio"
                      name="stream"
                      value={option.id}
                      checked={stream === option.id}
                      onChange={() => setStream(option.id)}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-between w-[50%] gap-2  mt-4">
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
    </div>
  );
}
