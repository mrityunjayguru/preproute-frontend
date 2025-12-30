"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../assets/images/logo.svg";
import { getCommonExamType, handleSelectedExamType } from "@/api/ExamType";
import { handleLogout } from "@/api/Auth/UserAuth";
import { resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";
import { ChevronDownIcon, LayoutDashboard, LogOut, MenuIcon, User, UserRound } from "lucide-react";

// const artegra = localFont({
//   src: "../assets/fonts/artegra-soft-medium.woff",
// });

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examMenuOpen, setExamMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("Practice");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];

  useEffect(() => {
    const payload: any = { userId: userLogin?._id };
    dispatch(getCommonExamType(payload));
  }, [dispatch, userLogin?._id]);

  const handleExamClick = (exam: any) => {
    dispatch(handleSelectedExamType(exam));
    setSelectedExam(exam.examType);
    setExamMenuOpen(false);
    const payload: any = null;
    dispatch(resetQuestionByExamID(payload));
    dispatch(resetQuestion(payload));
    router.push("/Exam/Mocks");
  };

  const handleLogoutClick = async () => {
    const payload: any = null;
    await dispatch(handleLogout(payload));
    localStorage.removeItem("token");
    router.push("/home");
    window.location.reload();
  };

  const navLinks = [
    { label: "Features", href: "/home#features" },
    { label: "Pricing", href: "/PlanandPricing" },
    { label: "Community", href: "/Community" },
  ];

  return (
    <header className={`sticky font-dm-sans  top-0 z-20 w-full bg-white font-DM_Sans sm:px-6 md:px-8 lg:px-10 xl:px-12`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4  py-4 lg:py-5">
        {/* Left: Logo */}
        <div className="flex items-center gap-12">
          <div className="cursor-pointer" onClick={() => router.push("/home")}>
            <Image
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>
          {/* Center: Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-normal text-black lg:flex xl:gap-8">
            {/* Practice dropdown (exams) */}
            <DropdownMenu open={examMenuOpen} onOpenChange={setExamMenuOpen}>
              <DropdownMenuTrigger
                onMouseEnter={() => setExamMenuOpen(true)}
                onMouseLeave={() => setExamMenuOpen(false)}
                className="flex items-center gap-1 cursor-pointer outline-none transition-colors hover:text-[#FF5635]"
              >
                Practice
                <span
                  className={`transition-transform ${
                    examMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDownIcon className="size-4 text-[#FF5635]" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56"
                onMouseEnter={() => setExamMenuOpen(true)}
                onMouseLeave={() => setExamMenuOpen(false)}
              >
                {examTypeData.length > 0 ? (
                  <>
                    {examTypeData.map((exam: any) => (
                      <DropdownMenuItem
                        key={exam._id}
                        onSelect={(e) => {
                          e.preventDefault();
                          handleExamClick(exam);
                        }}
                        className="cursor-pointer transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                      >
                        {exam.examType}
                      </DropdownMenuItem>
                    ))}

                    {/* Static coming soon item */}
                    <DropdownMenuItem
                      disabled
                      className="mt-1 border-t border-gray-100 cursor-default text-xs text-gray-400 hover:bg-transparent hover:text-gray-400"
                    >
                      Coming soon
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem disabled>
                    No exams available
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#FF5635]"
              >
                {link.label}
              </Link>
            ))}

            {/* Resources dropdown - matching Practice dropdown */}
            <DropdownMenu
              open={resourcesMenuOpen}
              onOpenChange={setResourcesMenuOpen}
            >
              <DropdownMenuTrigger
                onMouseEnter={() => setResourcesMenuOpen(true)}
                onMouseLeave={() => setResourcesMenuOpen(false)}
                className="flex items-center gap-1 cursor-pointer outline-none transition-colors hover:text-[#FF5635]"
              >
                Resources
                <span
                  className={`transition-transform ${
                    resourcesMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDownIcon className="size-4 text-[#FF5635]" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48"
                onMouseEnter={() => setResourcesMenuOpen(true)}
                onMouseLeave={() => setResourcesMenuOpen(false)}
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                >
                  <Link href="/resources">Resources Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                >
                  <Link href="/instructions">Instructions</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        {/* Right: Auth */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          {!token && (
            <Link
              href="/Auth/register"
              className="text-sm font-normal text-[#FF5635] transition-colors cursor-pointer hover:text-[#e44c2f]"
            >
              Register
            </Link>
          )}

          {token ? (
            <>
              {(userLogin?.role === "Admin" ||
                userLogin?.role === "Expert") && (
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/home")}
                  className="border-[#FF5635] text-[#FF5635] cursor-pointer hover:bg-[#FFF1EC] px-4"
                >
                  <LayoutDashboard/>
                  Dashboard
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => router.push("/Profile")}
                className="border-[#FF5635] rounded-full text-[#FF5635] cursor-pointer hover:text-[#e44c2f] px-4"
              >
                <UserRound/>
                Profile
              </Button>
              <Button
                onClick={handleLogoutClick}
                className="bg-[#FF5635] rounded-full hover:bg-[#e44c2f] cursor-pointer px-5 py-2 text-white"
              >
                <LogOut/>
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/Auth/signin")}
              className="rounded-full bg-[#FF5635] px-6 py-2 cursor-pointer text-white shadow-sm transition hover:bg-[#e44c2f]"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile: Sheet Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] overflow-y-auto"
          >
            <div className="flex flex-col gap-6 py-6">
              {/* Navigation Section */}
              <div className="space-y-3">
                {/* Practice Exams */}
                {examTypeData.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-black px-2">
                      Practice Exams
                    </div>
                    <div className="space-y-1">
                      {examTypeData.map((exam: any) => (
                        <button
                          key={exam._id}
                          onClick={() => {
                            handleExamClick(exam);
                            setMobileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                        >
                          {exam.examType}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Resources */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-black px-2">
                    Resources
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/resources"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                    >
                      Resources Home
                    </Link>
                    <Link
                      href="/instructions"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                    >
                      Instructions
                    </Link>
                  </div>
                </div>
              </div>

              {/* Auth Section */}
              <div className="flex space-y-3 pt-4 border-t">
                {!token && (
                  <Link
                    href="/Auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-[#FF5635] rounded-lg transition-colors hover:bg-orange-50"
                  >
                    Register
                  </Link>
                )}

                {token ? (
                  <div className="flex space-y-2">
                    {(userLogin?.role === "Admin" ||
                      userLogin?.role === "Expert") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          router.push("/dashboard/home");
                          setMobileOpen(false);
                        }}
                        className="w-full border-[#FF5635] text-[#FF5635] hover:bg-[#FFF1EC]"
                      >
                        <LayoutDashboard/>
                        Dashboard
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push("/Profile");
                        setMobileOpen(false);
                      }}
                      className="w-full border-[#FF5635] text-[#FF5635] hover:bg-[#FFF1EC]"
                    >
                      <UserRound/>
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        handleLogoutClick();
                        setMobileOpen(false);
                      }}
                      className="w-full bg-[#FF5635] hover:bg-[#e44c2f] text-white"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/Auth/signin");
                      setMobileOpen(false);
                    }}
                    className="w-fit rounded-full bg-[#FF5635] text-white shadow-sm transition hover:bg-[#e44c2f]"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
