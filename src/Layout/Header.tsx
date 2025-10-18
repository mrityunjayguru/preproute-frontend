"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import {
  getExamType,
  getExamBeExamTypeId,
  handleSelectedExamType,
} from "@/api/ExamType";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState("Practice");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

const token=localStorage.getItem("token")
  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];

  // ✅ Fetch exam types once
  const fetchData = async () => {
    const payload:any={}
    await dispatch(getExamType(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".exam-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Handle exam selection
  const handleExamClick = (exam: any) => {
    let route:any=exam.examType
    if(exam.examType=="Past Year"){
      route="pastyear"
    }
    setData(exam.examType);
    dispatch(handleSelectedExamType(exam));
    setIsDropdownOpen(false);
    router.push(`/Exam/${route}`);
  };
  const removeLogin=()=>{
    localStorage.removeItem("token")
    router.push(`/home`);
    window.location.reload()

  }

  return (
    <div className="container mx-auto ">
      <header className="bg-white md:px-26 border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-4 py-4 flex justify-between items-center">
          {/* 🧭 Logo Section */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <span className="text-3xl font-bold tracking-tight text-black">
              the<span className="text-orange-500">prep</span>route
            </span>
          </div>

          {/* 🌐 Navigation Section (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Practice Dropdown */}
            <div className="relative exam-dropdown">
              <button
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                {data}
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

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-10 animate-fadeIn">
                  {examTypeData.length > 0 ? (
                    examTypeData.map((exam: any) => (
                      <div
                        key={exam._id}
                        onClick={() => handleExamClick(exam)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors duration-150"
                      >
                        {exam.examType}
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

            {/* Regular Nav Links */}
            {/* <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              Features
            </a> */}
            <a
              href="#"
              onClick={()=>router.push("/PlanandPricing")}
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              Pricing / Plans
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              Community
            </a>
          {token?(  <a
              onClick={()=>router.push("/analytices")}

              href="#"
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              analytices
            </a>):(null)}
          </nav>

          {/* 👤 Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {token?(<Button onClick={removeLogin} variant="orange" >
              logout
            </Button>):(<>
             {/* <button   onClick={() => router.push("/Auth/register")}    className="cursor-pointer text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200">
              Register
            </button> */}
            <button
              onClick={() => router.push("/Auth/signin")}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 shadow-md"
            >
              Login
            </button></>)}
           
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <line x1="18" y1="6" x2="6" y2="18" />
                ) : (
                  <>
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 📱 Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-md">
            <div className="flex flex-col items-start px-6 py-4 space-y-3">
              <div className="w-full exam-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-gray-700 font-medium"
                >
                  {data}
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
                  <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-md w-full">
                    {examTypeData.map((exam: any) => (
                      <div
                        key={exam._id}
                        onClick={() => handleExamClick(exam)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                      >
                        {exam.examType}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* <a href="#" className="text-gray-700 hover:text-orange-600">
                Features
              </a> */}
              <a href="#" className="text-gray-700 hover:text-orange-600">
                Pricing / Plans
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600">
                Community
              </a>
              <button className="text-gray-700 hover:text-orange-600">
                Register
              </button>
              <button
                onClick={() => router.push("/Auth/signin")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full shadow-md"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
