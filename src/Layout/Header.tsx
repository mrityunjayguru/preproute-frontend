"use client";

import { getExamBeExamTypeId, getExamType, handleSelectedExamType } from "@/api/ExamType";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const examTypeData = useSelector((state: any) => state.examType.examType) || [];

  // Fetch exam types
  const fetchData = async () => {
    const payload: any = {};
    await dispatch(getExamType(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExamClick = (exam: any) => {
    const payload:any={
      id:exam.id
    }
      dispatch(handleSelectedExamType(exam))
      dispatch(getExamBeExamTypeId(payload))
    setIsDropdownOpen(false);
    // You can navigate to a specific exam page if needed:
    // router.push(`/exam/${exam._id}`)
  };

  return (
    <div className="container mx-auto">
      <header className="bg-white">
        <div className="w-full mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <span className="text-3xl font-bold tracking-tight text-black">
              the<span className="text-orange-500">prep</span>route
            </span>
          </div>

          {/* Navigation Section (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Practice Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Practice
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10">
                  {examTypeData.length > 0 ? (
                    examTypeData.map((exam: any) => (
                      <div
                        key={exam._id}
                        onClick={() => handleExamClick(exam)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {exam.name || exam.examName || "Unnamed Exam"}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No exams available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Regular Navigation Links */}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Pricing / Plans
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Community
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Register
            </button>
            <button
              onClick={() => router.push("/Auth/signin")}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 shadow-md"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
