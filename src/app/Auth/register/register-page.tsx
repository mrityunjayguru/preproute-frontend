"use client";

import React, { useState } from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";
import Step4 from "./_components/step4";
import Step5 from "./_components/step5";
import Step6 from "./_components/step6";




import Image from "next/image";
import LOGO from "@/assets/logo.svg";
import { Footer as UserFooter } from "@/Layout/Footer";
import { useRouter } from "next/navigation";

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

  // Step 3 fields
  examYear?: string;

  // Step 4 fields
  targetExams?: string[];

  // Step 5 fields
  studentStatus?: string;

  // Step 6 fields
  heardFrom?: string[];

  // Meta
  currentStep?: number;
}

const Register = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    currentStep: 1,
  });

  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
      currentStep: currentStep,
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 6:
        return (
          <Step6
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
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
      <div className="flex-1 flex items-center justify-center flex-col gap-5 py-10">
        <div className="flex flex-col items-center w-full">
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
          <div className="w-full max-w-[500px] px-4 mb-4">
            <div className="w-full bg-[#EDEDED] h-[12px] rounded-full overflow-hidden">
              <div
                className="bg-[#FF5635] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          {renderStep()}
        </div>
      </div>
      <UserFooter />
    </section>
  );
}

export default Register;
