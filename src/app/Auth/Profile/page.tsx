"use client";
import React, { useState } from "react";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step7 from "./Step7";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateUserInfo, updateUserProfile } from "@/api/Users";
import { useRouter } from "next/navigation";
import Step6 from "./step6";
import Step2 from "./Step2";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  // ✅ Central form data state
  const [formData, setFormData] = useState({
    stream: "",
    year: "",
    exam: "",
    userType: "",
    source: "",
  });

  // ✅ Form update handler
  const updateForm = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // ✅ Submit final step
  const handleClick = async () => {
    if (!userLogin?._id) {
      console.error("No user ID found — user must be logged in");
      return;
    }

    const payload:any = {
      _id: userLogin._id,
      profile: formData,
      isProfile:true
    };

    try {
      const response: any = await dispatch(updateUserInfo(payload));
      if (response?.payload === true) {
console.log(response,"responseresponse")

        router.push("/home");
        await dispatch(updateUserProfile)
      } else {
        alert("Profile update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // ✅ Define steps
  const steps = [
     <Step2
      key="step2"
      nextStep={() => setCurrentStep((s) => s + 1)}
      updateForm={updateForm}
      formData={formData}
    />,
    <Step3
      key="step3"
      nextStep={() => setCurrentStep((s) => s + 1)}
      updateForm={updateForm}
      prevStep={() => setCurrentStep((s) => s - 1)}
      formData={formData}
    />,
    <Step4
      key="step4"
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
      updateForm={updateForm}
      formData={formData}
    />,
    <Step5
      key="step5"
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
      updateForm={updateForm}
      formData={formData}
    />,
    <Step6
      key="step6"
      nextStep={() => setCurrentStep((s) => s + 1)}
      prevStep={() => setCurrentStep((s) => s - 1)}
      updateForm={updateForm}
      formData={formData}
    />,
    <Step7
      key="step7"
      nextStep={handleClick}
      prevStep={() => setCurrentStep((s) => s - 1)}
      updateForm={updateForm}
      formData={formData}
    />,
  ];

  return (
    <div className="flex flex-col justify-center min-h-screen items-center p-6 space-y-4">
      {/* Step Content */}
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md transition-all duration-300">
        {steps[currentStep]}
      </div>

      {/* Step Indicators */}
      <div className="flex space-x-2 mt-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i === currentStep ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
