"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../assets/images/logo.svg";
import { getCommonExamType, handleSelectedExamType } from "@/api/ExamType";
import { handleLogout } from "@/api/Auth/UserAuth";
import { resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";
import {
  ChevronDownIcon,
  LayoutDashboard,
  MenuIcon,
} from "lucide-react";

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const [examMenuOpen, setExamMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    dispatch(resetQuestionByExamID(null));
    dispatch(resetQuestion(null));
    router.push("/Exam/Mocks");
  };

  const handleLogoutClick = async () => {
    await dispatch(handleLogout(null));
    localStorage.removeItem("token");
    router.push("/home");
    window.location.reload();
  };

  const navLinks = [
    { label: "Features", href: "/home#features" },
    { label: "Pricing", href: "/PlanandPricing" },
    { label: "Community", href: "/Community" },
  ];

  /* ---------- Active Helpers ---------- */
  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === href.split("#")[0];
    return pathname.startsWith(href);
  };

  const activeClass = "text-[#FF5635]";
  const inactiveClass = "text-black hover:text-[#FF5635] transition-colors";

  const isPracticeActive = pathname.startsWith("/Exam");
  const isResourcesActive =
    pathname.startsWith("/resources") ||
    pathname.startsWith("/instructions") ||
    pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-20 w-full bg-white sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:py-5">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <div
            className="cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <Image src={logo} alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {/* Practice */}
            <DropdownMenu open={examMenuOpen} onOpenChange={setExamMenuOpen}>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 cursor-pointer outline-none ${isPracticeActive ? activeClass : inactiveClass
                  }`}
              >
                Practice
                <ChevronDownIcon className="h-4 w-4 text-[#FF5635]" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-56"
              >
                {examTypeData.map((exam: any) => (
                  <DropdownMenuItem
                    key={exam._id}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleExamClick(exam);
                      setExamMenuOpen(false);
                    }}
                    className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]"
                  >
                    {exam.examType}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Main Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? activeClass : inactiveClass}
              >
                {link.label}
              </Link>
            ))}

            {/* Resources */}
            <DropdownMenu
              open={resourcesMenuOpen}
              onOpenChange={setResourcesMenuOpen}
            >
              <DropdownMenuTrigger
                onMouseEnter={() => setResourcesMenuOpen(true)}
                className={`flex items-center gap-1 cursor-pointer outline-none ${
                  isResourcesActive ? activeClass : inactiveClass
                }`}
              >
                Resources
                <ChevronDownIcon className="h-4 w-4 text-[#FF5635]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48" onMouseLeave={() => setResourcesMenuOpen(false)} >
                <DropdownMenuItem asChild>
                  <Link href="/resources" onClick={() => setResourcesMenuOpen(false)}>Resources Home</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  asChild
                  className="cursor-pointer transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                >
                  <Link href="/instructions">Instructions</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer transition-colors hover:bg-orange-50 hover:text-[#FF5635]"
                >
                  <Link href="/blog">Blogs</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

             <Link href="/analytics" className={isActive("/analytics") ? activeClass : inactiveClass}>
                Analytics
              </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {!token ? (
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/Auth/register" className="text-[#FF5635]">
                Register
              </Link>
              <Button
                onClick={() => router.push("/Auth/signin")}
                className="rounded-full bg-[#FF5635] text-white"
              >
                Login
              </Button>
            </div>
          ) : (
            <>
              {(userLogin?.role === "Admin" ||
                userLogin?.role === "Expert") && (
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/home")}
                    className="hidden lg:flex border-[#FF5635] text-[#FF5635]"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                )}
              <UserProfileDropdown
                user={userLogin}
                onLogout={handleLogoutClick}
              />
            </>
          )}

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px]">
              <div className="space-y-3 pt-6">
                {/* Practice Menu - Mobile */}
                <div className="px-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Practice</p>
                  <div className="space-y-1 pl-2">
                    {examTypeData.map((exam: any) => (
                      <button
                        key={exam._id}
                        onClick={() => {
                          handleExamClick(exam);
                          setMobileOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        {exam.examType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2 rounded-lg ${isActive(link.href)
                      ? "text-[#FF5635] font-semibold"
                      : "text-gray-700 hover:text-[#FF5635]"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Resources Menu - Mobile */}
                <div className="px-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Resources</p>
                  <div className="space-y-1 pl-2">
                    <Link
                      href="/resources"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Resources Home
                    </Link>
                    <Link
                      href="/instructions"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Instructions
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Blogs
                    </Link>
                  </div>
                </div>

                {/* Auth Buttons - Mobile */}
                {!token && (
                  <div className="px-4 pt-4 space-y-2 border-t">
                    <Link
                      href="/Auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-4 py-2 text-[#FF5635] font-semibold rounded-lg border border-[#FF5635]"
                    >
                      Register
                    </Link>
                    <Button
                      onClick={() => {
                        router.push("/Auth/signin");
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-full bg-[#FF5635] text-white"
                    >
                      Login
                    </Button>
                  </div>
                )}

                {/* Dashboard Button - Mobile */}
                {token && (userLogin?.role === "Admin" || userLogin?.role === "Expert") && (
                  <div className="px-4 pt-4 border-t">
                    <Button
                      onClick={() => {
                        router.push("/dashboard/home");
                        setMobileOpen(false);
                      }}
                      className="w-full border-[#FF5635] text-[#FF5635]"
                      variant="outline"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
