"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormData } from "../register-page";
import { MailIcons } from "@/Common/svgIcon";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDirModules } from "next/dist/build/webpack/loaders/next-app-loader";
import { AppDispatch } from "@/store/store";
import { CheckUserExists } from "@/api/Auth/UserAuth";

interface Step1Props {
  formData: RegisterFormData;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const router = useRouter();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const dispatch=useDispatch<AppDispatch>()
  // Local state for form fields
  const [firstName, setFirstName] = useState(formData.firstName || "");
  const [lastName, setLastName] = useState(formData.lastName || "");
  const [email, setEmail] = useState(formData.email || "");
  const [nickname, setNickname] = useState(formData.nickname || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [parentPhone, setParentPhone] = useState(formData.parentPhone || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Update local state when formData changes (e.g., when navigating back)
  useEffect(() => {
    setFirstName(formData.firstName || "");
    setLastName(formData.lastName || "");
    setEmail(formData.email || "");
    setNickname(formData.nickname || "");
    setPhone(formData.phone || "");
    setParentPhone(formData.parentPhone || "");
  }, [formData]);

  // Validation function
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }
      if (password!==confirmPassword){ 
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next button click
  const handleNext = async () => {
  try{

    if (validate()) {
      // Update form data with current values
      const step1Data:any = {
        firstName,
        lastName,
        email,
        nickname,
        phone,
        parentPhone: parentPhone || undefined, // Only include if provided
        currentStep: 1,
        password
      };
      updateFormData(step1Data);
      let usereesponce=await dispatch(CheckUserExists(step1Data))
      if(usereesponce.payload===true){
      nextStep();
      }
  }
    }catch(error:any){
      console.log(error)
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-md border border-[#F0F0F0] px-6 sm:px-10 py-8">
        {/* Header */}
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-full">
            <MailIcons />
          </div>
          <h2 className="text-xl sm:text-2xl font-poppins font-medium text-[#1A1D1F]">
            {userLogin?.isGoogle === true ? "Update Profile" : "Register"}
          </h2>
        </div>

        <p className="text-sm text-[#6F767E] mb-6 font-dm-sans">
          Sign up, dive in, and ace it with mock exams &amp; past papers!
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* First Name */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              First Name<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Last Name<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.lastName}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Email<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Enter your email"
              value={email}
              disabled={userLogin?.isGoogle === true}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email}</span>
            )}
          </div>
          {/* Password */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Password<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Enter your Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email}</span>
            )}
          </div>
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Confirm Password<span className="text-[#FF5635]">*</span>
            </Label>

            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-[43px] pr-10 font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635]
            ${errors?.confirmPassword ? "border-red-500" : ""}`}
              />

              {/* 👁 View Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors?.confirmPassword && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Nickname */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Nickname<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Enter Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.nickname ? "border-red-500" : ""}`}
            />
            {errors.nickname && (
              <span className="text-xs text-red-500 mt-1">
                {errors.nickname}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Phone<span className="text-[#FF5635]">*</span>
            </Label>
            <Input
              placeholder="Student Mobile No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all
                ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <span className="text-xs text-red-500 mt-1">{errors.phone}</span>
            )}
          </div>

          {/* Parent Phone */}
          <div>
            <Label className="text-sm font-normal font-poppins text-[#1A1D1F]">
              Parent Phone{" "}
              <span className="text-xs text-[#FF5635]">(Optional)</span>
            </Label>
            <Input
              placeholder="Parent Mobile No."
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="mt-1 h-[43px] font-dm-sans rounded-[2px] border-[#E6E6E6] focus:border-[#FF5635] transition-all"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Button
            disabled={!firstName || !lastName || !email || !nickname || !phone}
            onClick={handleNext}
            className="h-[43px] w-full max-w-xs bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-poppins rounded-[2px] shadow-sm transform transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>

        {/* Login */}
        <p className="text-center text-sm text-[#6F767E] mt-6 font-dm-sans">
          Already Signed Up?{" "}
          <span
            onClick={() => router.push("/Auth/signin")}
            className="text-[#FF5635] font-medium cursor-pointer hover:underline transition-all"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Step1;
