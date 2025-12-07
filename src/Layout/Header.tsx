import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";

import logo from "../assets/images/logo.svg";
import {
  getCommonExamType,
  handleSelectedExamType,
} from "@/api/ExamType";
import { handleLogout } from "@/api/Auth/SchoolAuth";
import { resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";

// Local Font
const artegra = localFont({
  src: "../assets/fonts/artegra-soft-medium.woff",
});

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("Select Exam");

  const token = localStorage.getItem("token");
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examTypeData = useSelector(
    (state: any) => state.examType.examType
  ) || [];

  useEffect(() => {
    const payload: any = {
      userId:userLogin?._id
    }
    ;
    dispatch(getCommonExamType(payload));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".exam-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleExamClick = (exam: any) => {
    // setSelectedExam(exam.examType);
    dispatch(handleSelectedExamType(exam));
    setIsDropdownOpen(false);
        const payload: any = null;
        dispatch(resetQuestionByExamID(payload));
        dispatch(resetQuestion(payload));
    router.push("/Exam/Mocks");
  };

  const handleLogoutClick = async () => {
    const payload:any=null
    await  dispatch(handleLogout(payload));
    localStorage.removeItem("token");
    router.push("/home");
    window.location.reload();
  };

  // Navigation links
  const navLinks = [
    { label: "Pricing / Plans", href: "/PlanandPricing" },
    { label: "Community", href: "/Community" },
  ];

  return (
 <header className={ `sticky top-0 bg-white z-10 w-full py-8 px-4 lg:px-30 bg-[#F8F7F3] flex justify-between items-center ${artegra.className}`}>

      {/* Logo + Desktop Nav */}
      <div className="flex items-center gap-20">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Image
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-black">
          {/* Exam Dropdown */}
          <div className="relative exam-dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#FF5635] transition-colors duration-200"
            >
              {selectedExam}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
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
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-10">
                {examTypeData.length > 0 ? (
                  examTypeData.map((exam: any) => (
                    <div
                      key={exam._id}
                      onClick={() => handleExamClick(exam)}
                      className="px-4 py-2 text-sm text-black hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
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

          {/* Static Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-orange-600 transition-colors duration-200 font-semibold"
            >
              {link.label}
            </Link>
          ))}

          {token && (
            <Link
              href="/analytices"
              className="hover:text-orange-600 transition-colors duration-200"
            >
              Analytics
            </Link>
          )}

           {token && (
            <Link
              href="/resources"
              className="hover:text-orange-600 transition-colors duration-200"
            >
              Resources
            </Link>
          )}
        </nav>
      </div>

      {/* Auth Buttons */}
      <div className="hidden lg:flex items-center gap-3">
        {(userLogin?.role === "Admin" || userLogin?.role === "Expert") &&
          token && (
            <Button
              variant="orange"
              onClick={() => router.push("/dashboard/home")}
            >
              Dashboard
            </Button>
          )}

          {token ? (
            <>
              <Button
                variant="outline"
                onClick={() => router.push("/Profile")}
                className="border-[#FF5635] text-[#FF5635] hover:bg-[#FFF1EC] text-[14px] px-5 py-3 rounded-[4px] font-semibold"
              >
                Profile
              </Button>

              <Button
                onClick={handleLogoutClick}
                className="bg-[#FF5635] hover:bg-[#FF5635] text-white text-[14px] px-5 py-3 rounded-[4px] shadow-md"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/Auth/signin")}
              className="bg-[#FF5635] hover:bg-[#FF5635] text-white text-[14px] px-5 py-6 rounded-[4px] shadow-md"
            >
              Login
            </Button>
          )}

      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black hover:text-orange-600"
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
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t border-gray-100 shadow-md mt-2">
          <div className="flex flex-col items-start px-6 py-4 space-y-3 font-medium text-black">
            {/* Exam Dropdown */}
            <div className="relative exam-dropdown w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full"
              >
                {selectedExam}
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
                <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md">
                  {examTypeData.map((exam: any) => (
                    <div
                      key={exam._id}
                      onClick={() => handleExamClick(exam)}
                      className="px-4 py-2 text-sm text-black hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                    >
                      {exam.examType}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-orange-600 w-full"
              >
                {link.label}
              </Link>
            ))}

            {token && (
              <button
                onClick={() => router.push("/Profile")}
                className="hover:text-orange-600 w-full text-left"
              >
                Profile
              </button>
            )}

            {token ? (
              <button
                onClick={handleLogoutClick}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-half w-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/Auth/signin")}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-half w-full"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
