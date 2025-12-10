"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function Step2({ nextStep, prevStep, updateForm, formData }: any) {
  const [uniQueName, setuniQueName] = useState(formData.uniQueName || "");
  const [mobile, setMobile] = useState(formData.mobile || "");
  const loginUser=useSelector((state:any)=>state?.Auth?.loginUser);
  const handleNext = () => {
    updateForm({ uniQueName, mobile });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <h2 className="text-xl font-semibold">Enter Your Details</h2>
      {/* uniQueName */}
      <div className="w-full">
        <label className="block text-gray-700 mb-1">User Name</label>
        <input
          type="text"
          value={uniQueName}
          placeholder="Enter User Name"
          onChange={(e) => setuniQueName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Mobile Number */}
      {!loginUser?.phone?( <div className="w-full">
        <label className="block text-gray-700 mb-1">Mobile Number</label>
        <input
          type="tel"
          maxLength={10}
          value={mobile}
          placeholder="Enter 10-digit mobile number"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // only numbers
            setMobile(value);
          }}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>):(null)}
     

      {/* Button Actions */}
      <div className="flex justify-between w-full mt-4">
        <Button onClick={prevStep} variant="gray">
          Back
        </Button>

        <Button
          onClick={handleNext}
          variant="orange"
          disabled={!uniQueName}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
