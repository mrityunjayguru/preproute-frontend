"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "../register-page";
import { ClipboardEdit } from "lucide-react";
import { MailIcons } from "@/Common/svgIcon";

interface Step3Props {
    formData: RegisterFormData;
    updateFormData: (data: Partial<RegisterFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const YEARS = [
    "2026",
    "2027",
    "2028",
    "2029",
    // "2030",
    // "2031",
];

const Step3: React.FC<Step3Props> = ({
    formData,
    updateFormData,
    nextStep,
    prevStep
}) => {
    const [selectedYear, setSelectedYear] = useState<string | null>(
        formData.examYear || null
    );

    useEffect(() => {
        if (formData.examYear) {
            setSelectedYear(formData.examYear);
        }
    }, [formData]);

    const handleNext = () => {
        if (!selectedYear) return;

        updateFormData({
            examYear: selectedYear,
            currentStep: 3,
        });

        // Normally here you'd call nextStep or handle form submission
        // Since it's the last step for now, maybe it goes to a success page
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
                        Exam Attempt Year
                    </h2>
                </div>

                <p className="text-sm text-[#6F767E] mb-6 font-dm-sans">
                    Choose the year you intend to appear for the examination.
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {YEARS.map((year) => {
                        const isSelected = selectedYear === year;

                        return (
                            <div
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`flex items-center justify-between px-4 h-[47px] border rounded-[2px] cursor-pointer transition-all duration-200
                                  ${isSelected
                                        ? "border-[#FF5635] bg-[#FFF4F1] shadow-sm"
                                        : "border-[#E6E6E6] bg-white hover:border-[#FF5635] hover:bg-gray-50/50"
                                    }
                                `}
                            >
                                <span className={`text-sm font-dm-sans ${isSelected ? "text-[#FF5635] font-medium" : "text-[#1A1D1F]"}`}>
                                    {year}
                                </span>

                                <div
                                    className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors
                                    ${isSelected
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

                {/* Button */}
                <div className="mt-8 flex items-center justify-center">
                     <Button  onClick={prevStep} className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer mr-4">
                                                  Back
                      </Button>
                    <Button
                        disabled={!selectedYear}
                        onClick={handleNext}
                        className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Step3;
