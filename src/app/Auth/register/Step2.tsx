"use client";

import React, { useState } from "react";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Step2({
  nextStep,
  prevStep,
  updateForm,
  formData,
}: any) {
  const [firstName, setFirstName] = useState(formData.firstName || "");
  const [lastName, setLastName] = useState(formData.lastName || "");
  const [username, setUsername] = useState(formData.username || "");
  const [email, setEmail] = useState(formData.email || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [password, setPassword] = useState(formData.password || "");

  const handleNext = () => {
    updateForm({
      firstName,
      lastName,
      username,
      step: "2"
    });
    nextStep();
  };

  return (
    <div>
      <div className="flex  flex-col  text-gray-800">
        {/* Header and main content */}
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
                  <MailIcons />
                </span>
                <h2 className="text-xl font-semibold text-[#1A1D1F]">Register</h2>
              </div>
              <p className="text-sm font-Artegra">
                Please complete your details
              </p>

              <div className="space-y-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                <div className="flex justify-between w-[50%] gap-2  mt-4">
                  <Button onClick={prevStep} variant="default">
                    Back
                  </Button>
                  <Button onClick={handleNext} variant="default">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
      </div>
    </div>
  );
}
