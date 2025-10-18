"use client";

import { handleRegister, userRegister } from "@/api/Auth/SchoolAuth";
import { LeftLoginIcon, MailIcons, RightLoginIcon } from "@/Common/svgIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function pagq() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, phone, password } = formData;

    if (!name || !email || !phone || !password) {
      alert("कृपया सभी फ़ील्ड भरें!");
      return;
    }

    try {
      setLoading(true);

      const payload:any = {
        username: name,
        email,
        phone,
        password,
      };

      const response: any = await dispatch(userRegister(payload));

      if (response?.payload === true || response?.payload?.success === true) {
        // alert("Registration successful!");
        router.push("/Auth/signin");
      } 
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-gray-800 min-h-screen flex items-center justify-center bg-neutral-50">
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

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {loading ? "Submitting..." : "Register"}
            </Button>
          </div>

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
  );
}
