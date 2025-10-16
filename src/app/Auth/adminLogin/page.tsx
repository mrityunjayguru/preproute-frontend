"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { handleRegister } from "@/api/Auth/SchoolAuth";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // 👈 for password toggle icon

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = async () => {
    try {
      const payload: any = {
        email,
        password,
      };

      const response: any = await dispatch(handleRegister(payload));
      if (response.payload === true) {
        // Example: redirect after success
        router.push("/dashboard/home");
      }
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="flex flex-col text-gray-800">
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
              <span className="p-2 bg-orange-100 rounded-full mr-3">
                <MailIcons />
              </span>
              <h2 className="text-xl font-semibold text-[#1A1D1F]">
                Register
              </h2>
            </div>

            <p className="text-sm font-Artegra font-medium my-2 text-[#1A1D1F]">
              Sign up, dive in, and ace it with mock exams & past papers!
            </p>

            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>

              {/* Password with eye toggle */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[#EBEBEB] text-[#585859] text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button onClick={handleNext} variant="orange" className="w-full">
                Next
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-6">
              Already Signed Up?{" "}
              <a
                onClick={() => router.push("/Auth/signin")}
                className="text-[#FF5635] hover:underline cursor-pointer font-medium"
              >
                Login
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
