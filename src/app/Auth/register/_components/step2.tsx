"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "../register-page";
import { BookOpen } from "lucide-react";
import { MailIcons } from "@/Common/svgIcon";

interface Step2Props {
  formData: RegisterFormData;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const STREAMS = [
  "Commerce (Maths)",
  "Commerce (Non Maths)",
  "Physics + Chemistry + Maths",
  "Physics + Chemistry + Biology",
  "Physics + Chemistry + Maths + Bio",
  "Humanities",
  "Other",
];

const Step2: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [selectedStream, setSelectedStream] = useState<string | null>(
    formData.stream || null,
  );
  const [otherStream, setOtherStream] = useState<string>(
    formData.otherStream || "",
  );
  useEffect(() => {
    if (formData.stream) {
      setSelectedStream(formData.stream);
    }
  }, [formData]);

  const handleNext = () => {
    if (!selectedStream) return;

    updateFormData({
      stream: selectedStream,
      otherStream: selectedStream === "Other" ? otherStream : undefined,
      currentStep: 2,
    });

    nextStep();
  };
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-md border border-[#F0F0F0] px-6 sm:px-10 py-8">
        {/* Header */}
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-full text-[#FF5635]">
            <MailIcons />
          </div>
          <h2 className="text-xl sm:text-2xl font-poppins font-medium text-[#1A1D1F]">
            Stream
          </h2>
        </div>

        <p className="text-sm text-[#6F767E] mb-6 font-dm-sans">
          Which stream are you pursuing in your education?
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STREAMS.map((stream) => {
            const isSelected = selectedStream === stream;

            return (
              <div
                key={stream}
                onClick={() => setSelectedStream(stream)}
                className={`flex items-center justify-between px-4 h-[47px] border rounded-[2px] cursor-pointer transition-all duration-200
                                  ${
                                    isSelected
                                      ? "border-[#FF5635] bg-[#FFF4F1] shadow-sm"
                                      : "border-[#E6E6E6] bg-white hover:border-[#FF5635] hover:bg-gray-50/50"
                                  }
                                `}
              >
                <span
                  className={`text-sm font-dm-sans ${isSelected ? "text-[#FF5635] font-medium" : "text-[#1A1D1F]"}`}
                >
                  {stream}
                </span>

                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors
                                    ${
                                      isSelected
                                        ? "border-[#FF5635]"
                                        : "border-[#C7C7C7]"
                                    }
                                  `}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5635]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Other Stream Input */}
        {selectedStream === "Other" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Please specify your stream"
              value={otherStream}
              onChange={(e) => setOtherStream(e.target.value)}
              className="w-full h-[43px] px-3 border border-[#E6E6E6] rounded-[2px] focus:border-[#FF5635] focus:ring-[#FF5635] transition-all"
            />
          </div>
        )}
        {/* Button */}
   <div className="mt-8 flex flex-col sm:flex-row gap-5 justify-center">
          <Button
            onClick={prevStep}
            className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer mr-4"
          >
            Back
          </Button>
          <Button
            disabled={
              !selectedStream ||
              (selectedStream === "Other" && !otherStream.trim())
            }
            onClick={handleNext}
            className="h-[43px] w-full  max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
