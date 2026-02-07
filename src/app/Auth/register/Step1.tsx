"use client";

import { handleRegister } from "@/api/Auth/UserAuth";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Step1({ nextStep, updateForm, formData }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [name, setName] = useState(formData?.name || "");
  const [email, setEmail] = useState(formData?.email || "");
  const [phone, setPhone] = useState(formData?.phone || "");
  const [password, setPassword] = useState(formData?.password || "");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    try {
      if (!name || !email || !phone || !password) {
        // alert("कृपया सभी फ़ील्ड भरें!");
        return;
      }

      setLoading(true);

      const payload: any = {
        username: name,
        password: password,
        email: email,
        phone: phone,
      };

      const response: any = await dispatch(handleRegister(payload));

      // check if API call was successful
      if (response?.payload === true || response?.payload?.success === true) {
        updateForm({ name, email, phone, step: "1" });
        nextStep();
      } else {
        alert("Registration failed. Please try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-gray-800">
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Left & Right Illustration */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 lg:left-32 hidden md:block">
          <LeftLoginIcon />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 lg:right-32 hidden md:block">
          <RightLoginIcon />
        </div>

        {/* Register Card */}
        <div className="w-full max-w-sm mx-auto z-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <span className="p-2 bg-orange-100 rounded-full mr-3">
                <MailIcons />
              </span>
              <h2 className="text-xl font-semibold text-[#1A1D1F]">Register</h2>
            </div>
            <p className="text-sm font-Artegra font-medium my-2 text-[#1A1D1F]">
              Sign up, dive in, and ace it with mock exams & past papers!
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleNext}
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {loading ? "Submitting..." : "Register"}
              </Button>
            </div>

            {/* Already Registered */}
            {/* <div className="text-center text-sm text-gray-500 mt-6">
              Already Signed Up?{" "}
              <a
                onClick={() => router.push("/Auth/signin")}
                className="text-[#FF5635] hover:underline cursor-pointer font-medium"
              >
                Login
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
