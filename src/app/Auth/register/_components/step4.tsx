"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "../register-page";
import { ClipboardEdit, Check } from "lucide-react";
import { MailIcons } from "@/Common/svgIcon";
import { useSelector } from "react-redux";
import { getCommonexam } from "@/api/Exam";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

interface Step4Props {
    formData: RegisterFormData;
    updateFormData: (data: Partial<RegisterFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}


const Step4: React.FC<Step4Props> = ({
    formData,
    updateFormData,
    nextStep,
    prevStep
}) => {
    const dispatch=useDispatch<AppDispatch>()
    const [selectedExams, setSelectedExams] = useState<string[]>(
        formData.targetExams || []
    );
  const examdata = useSelector((state: any) => state?.exam?.exam) || [];

    useEffect(() => {
        if (formData.targetExams) {
            setSelectedExams(formData.targetExams);
        }
    }, [formData]);

    const toggleExam = (exam: string) => {
        setSelectedExams((prev) =>
            prev.includes(exam)
                ? prev.filter((e) => e !== exam)
                : [...prev, exam]
        );
    };

    const handleNext = () => {
        if (selectedExams.length === 0) return;

        updateFormData({
            targetExams: selectedExams,
            currentStep: 4,
        });

        nextStep();
    };
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
    return (
        <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-md border border-[#F0F0F0] px-6 sm:px-10 py-8">

                {/* Header */}
                <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full text-[#FF5635]">
                        <MailIcons />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-poppins font-medium text-[#1A1D1F]">
                        Your Target Exam
                    </h2>
                </div>

                <p className="text-sm text-[#6F767E] mb-6 font-dm-sans">
                    Please choose the examination you intend to appear for.
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {examdata.map((exam:any) => {
                        const isSelected = selectedExams.includes(exam._id);
                        return (
                            <div
                                key={exam}
                                onClick={() => toggleExam(exam._id)}
                                className={`flex items-center justify-between px-4 h-[47px] border rounded-[2px] cursor-pointer transition-all duration-200
                                  ${isSelected
                                        ? "border-[#FF5635] bg-[#FFF4F1] shadow-sm"
                                        : "border-[#E6E6E6] bg-white hover:border-[#FF5635] hover:bg-gray-50/50"
                                    }
                                `}
                            >
                                <span className={`text-sm font-dm-sans ${isSelected ? "text-[#FF5635] font-medium" : "text-[#1A1D1F]"}`}>
                                    {exam.examname}
                                </span>

                                <div
                                    className={`h-5 w-5 rounded-sm border flex items-center justify-center transition-colors
                                    ${isSelected
                                            ? "border-[#FF5635] bg-[#FF5635]"
                                            : "border-[#E6E6E6] bg-white"
                                        }
                                  `}
                                >
                                    {isSelected && (
                                        <Check size={14} className="text-white" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Button */}
                <div className="mt-8 flex justify-center">
                     <Button  onClick={prevStep} className="h-[43px] w-full max-w-[320px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95 cursor-pointer mr-4">
                    Back
                      </Button>
                    <Button
                        disabled={selectedExams.length === 0}
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

export default Step4;
