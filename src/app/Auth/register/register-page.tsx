"use client";

import React, { useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Image from "next/image";
import LOGO from "@/assets/logo.svg";
import { Footer as UserFooter } from "@/Layout/Footer";
import { useRouter } from "next/navigation";



import { motion, AnimatePresence } from "framer-motion";

// Define the form data type
export interface RegisterFormData {
  // Step 1 fields
  firstName?: string;
  lastName?: string;
  email?: string;
  nickname?: string;
  phone?: string;
  parentPhone?: string;

  // Step 2 fields
  stream?: string;

  // Meta
  currentStep?: number;
}

const Register = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    currentStep: 1,
  });

  // Function to update form data
  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
      currentStep: currentStep,
    }));
  };

  // Function to go to next step
  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Function to go to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Render the current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Centered form */}
      <div className="flex-1 flex items-center justify-center flex-col gap-5 py-10">
        {/* Logo + Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center w-full"
        >
          <div
            className="cursor-pointer mb-6"
            onClick={() => router.push("/home")}
          >
            <Image
              src={LOGO}
              alt="Logo"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-[500px] px-4 mb-4">
            <div className="w-full bg-[#EDEDED] h-[12px] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 2) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="bg-[#FF5635] h-full"
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <UserFooter />
    </section>
  );
}

export default Register;
