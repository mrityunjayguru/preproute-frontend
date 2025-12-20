"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RegisterFormData } from "../register-page";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Step2Props {
    formData: RegisterFormData;
    updateFormData: (data: Partial<RegisterFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const STREAMS = [
    "Commerce (Maths)",
    "Commerce (Non Maths)",
    "Physics + Chemistry + Maths",
    "Physics + Chemistry + Biology",
    "Physics + Chemistry + Maths + Bio",
    "Humanities",
];

const Step2: React.FC<Step2Props> = ({
    formData,
    updateFormData,
    nextStep,
    prevStep,
}) => {
    const [selectedStream, setSelectedStream] = useState<string | null>(
        formData.stream || null
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
            currentStep: 2,
        });

        nextStep();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-md border border-[#F0F0F0] px-6 sm:px-10 py-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center mb-2"
                >
                    <div className="p-2 rounded-full text-[#FF5635]">
                        <BookOpen size={22} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-poppins font-medium text-[#1A1D1F]">
                        Stream
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-[#6F767E] mb-6 font-dm-sans"
                >
                    Which stream are you pursuing in your education?
                </motion.p>

                {/* Options */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {STREAMS.map((stream) => {
                        const isSelected = selectedStream === stream;

                        return (
                            <motion.div
                                key={stream}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedStream(stream)}
                                className={`flex items-center justify-between px-4 h-12 border rounded-md cursor-pointer transition-all duration-200
                                  ${isSelected
                                        ? "border-[#FF5635] bg-[#FFF4F1] shadow-sm"
                                        : "border-[#E6E6E6] bg-white hover:border-[#FF5635] hover:bg-gray-50/50"
                                    }
                                `}
                            >
                                <span className={`text-sm font-dm-sans ${isSelected ? "text-[#FF5635] font-medium" : "text-[#1A1D1F]"}`}>
                                    {stream}
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
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="h-2.5 w-2.5 rounded-full bg-[#FF5635]"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center justify-center gap-4"
                >
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        asChild
                        className="h-11 w-full max-w-[140px] border-[#E6E6E6] text-[#6F767E] font-poppins rounded-[2px] hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <motion.button
                            whileHover={{ backgroundColor: "#F9FAFB" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Back
                        </motion.button>
                    </Button>
                    <Button
                        disabled={!selectedStream}
                        onClick={handleNext}
                        asChild
                        className="h-11 w-full max-w-[140px] bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm shadow-[#FF5635]/20 transition-all active:scale-95"
                    >
                        <motion.button
                            whileHover={selectedStream ? { scale: 1.02 } : {}}
                            whileTap={selectedStream ? { scale: 0.98 } : {}}
                        >
                            Next
                        </motion.button>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default Step2;
