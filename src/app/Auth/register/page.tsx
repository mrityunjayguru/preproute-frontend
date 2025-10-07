"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamMaster, SubjectData, YearMaster } from "@/api/Auth/SchoolAuth";
import Step6 from "./step6";
import Step7 from "./Step7";
import { Progress } from "@/components/ui/progress"

export default function RegisterPage() {
  const dispatch=useDispatch<AppDispatch>()
  const totalSteps = 7; // total steps
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (fields: Partial<typeof formData>) => {
    setFormData({ ...formData, ...fields });
  };
const getData=async()=>{
  try{
const payload:any={}
 await dispatch(SubjectData(payload));  
 await dispatch(YearMaster(payload)); 
 await dispatch(getExamMaster(payload)); 

  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
getData()
},[])
  const progressValue = Math.round((step / totalSteps) * 100);
  return (
    <div className="">
      <div className="">
        {/* Right Form */}
        <div className="w-full ">
          <h1 className="text-2xl font-bold text-center mb-6">
            the<span className="text-orange-500">prep</span>route
          </h1>
          <div className="w-[350px] mx-auto ">
            <Progress value={progressValue} />
          </div>
          {step === 1 && <Step1 nextStep={nextStep} updateForm={updateForm} formData={formData} />}
          {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />}
          {step === 3 && <Step6 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />}
          {step === 4 && <Step7 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />}
          {step === 5 && <Step3 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData} />}
          {step === 6 && <Step4 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData}  />}
          {step === 7 && <Step5 nextStep={nextStep} prevStep={prevStep} updateForm={updateForm} formData={formData}  />}

        </div>
      </div>
    </div>
  );
}
