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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import logo from "../assets/images/logo.svg";
import { getCommonExamType, handleSelectedExamType } from "@/api/ExamType";
import { handleLogout } from "@/api/Auth/UserAuth";
import { getCommonexam, handleSetLoder, resetQuestionByExamID } from "@/api/Exam";
import { resetQuestion } from "@/api/Question";
import { ChevronDownIcon, LayoutDashboard, MenuIcon } from "lucide-react";

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const [examMenuOpen, setExamMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const examTypeData = useSelector((state: any) => state.examType.examType) || [];

  useEffect(() => {
    const payload: any = { isDeleted: false, userId: userLogin?._id };
    dispatch(getCommonExamType(payload));
  }, [dispatch, userLogin?._id]);

  const handleExamClick = async (exam: any) => {
    const payload: any = null;
   await dispatch(handleSelectedExamType(exam));
   await dispatch(resetQuestionByExamID(payload));
  await dispatch(resetQuestion(payload));
  const loderPayload:any=true
await dispatch(handleSetLoder(loderPayload));
    const payload2: any = { userId: userLogin?._id, examTypeId: exam?._id };
    await dispatch(getCommonexam(payload2));

    const type = exam.examType.toLowerCase();
    if (type === "topic wise") router.push("/Exam/topicExam");
    else if (type === "sectional") router.push("/Exam/sectionalExam");
    else if (type === "daily practice") router.push("/user-dashboard");
    else if (type === "pyqs") router.push("/Exam/pyqs");
    else router.push("/Exam/Mocks");
  };

  const handleSubExamClick = async (exam: any, sub: any) => {
    const payload2: any = null;
    dispatch(handleSelectedExamType(exam));
    dispatch(resetQuestionByExamID(payload2));
    dispatch(resetQuestion(payload2));
  const loderPayload:any=true
await dispatch(handleSetLoder(loderPayload));
    const payload: any = {
      userId: userLogin?._id,
      examTypeId: exam?._id,
      subExamTypeId: sub?._id,
    };
    await dispatch(getCommonexam(payload));
    if (sub?.subExamType === "CUET") router.push("/Exam/CUET");
    else router.push("/Exam/Mocks");
  };

  const handleLogoutClick = async () => {
    const payload: any = null;
    await dispatch(handleLogout(payload));
    localStorage.removeItem("token");
    router.push("/home");
  };

  const loginWithGoogle = () => router.push("/Auth/signin");

  const preventredirect = () => {
    if (!token || userLogin?.role === "Admin") router.push("/home");
    else if (userLogin?.role === "User") router.push("/user-dashboard");
  };

  const navLinks: any = [
    !token && { label: "Features", href: "/home#features" },
    { label: "Pricing", href: "/PlanandPricing" },
    { label: "Community", href: "/Community" },
    { label: "Blog", href: "/blog" },
  ].filter(Boolean);

  const isActive = (href: string) => (href.includes("#") ? pathname === href.split("#")[0] : pathname.startsWith(href));
  const activeClass = "text-[#FF5635]";
  const inactiveClass = "text-black hover:text-[#FF5635] transition-colors";
  const isPracticeActive = pathname.startsWith("/Exam");

  return (
    <header className="sticky top-0 z-90 w-full bg-white px-2 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-4 lg:py-5">
        <div className="flex items-center gap-12">
          <div className="cursor-pointer" onClick={preventredirect}>
            <Image src={logo} alt="Logo" className="h-8 w-auto" />
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <DropdownMenu open={examMenuOpen} onOpenChange={setExamMenuOpen}>
              <DropdownMenuTrigger className={`flex items-center gap-1 cursor-pointer outline-none ${isPracticeActive ? activeClass : inactiveClass}`}>
                Practice <ChevronDownIcon className="h-4 w-4 text-[#FF5635]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 mt-3">
                {examTypeData.map((exam: any) => (
                  exam.subMenuExists && exam.subMenus?.length ? (
                    <DropdownMenuSub key={exam._id}>
                      <DropdownMenuSubTrigger className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]">{exam.examType}</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-48">
                        {exam.subMenus.map((sub: any) => (
                          <DropdownMenuItem key={sub._id} onClick={() => handleSubExamClick(exam, sub)} className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]">
                            {sub.subExamType}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem key={exam._id} onClick={() => handleExamClick(exam)} className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]">
                      {exam.examType}
                    </DropdownMenuItem>
                  )
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link: any) => (
              <Link key={link.href} href={link.href} className={link.href !== "/home#features" && isActive(link.href) ? activeClass : inactiveClass}>
                {link.label}
              </Link>
            ))}

            {token && (
              <Link href="/analytics" className={isActive("/analytics") ? activeClass : inactiveClass}>
                Analytics
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!token ? (
            <div className="hidden lg:flex items-center gap-3">
              <Button onClick={loginWithGoogle} className="rounded-full bg-[#FF5635] text-white cursor-pointer">Login</Button>
            </div>
          ) : (
            <>
              {(userLogin?.role === "Admin" || userLogin?.role === "Expert") && (
                <Button variant="outline" onClick={() => router.push("/dashboard/home")} className="hidden lg:flex border-[#FF5635] text-[#FF5635] cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Button>
              )}
              <UserProfileDropdown user={userLogin} onLogout={handleLogoutClick} />
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
                <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] z-[1000] sm:w-[320px] p-0 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto pt-10 pb-6 px-2 space-y-6 no-scrollbar">
                <div className="px-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Practice</p>
                  <Accordion type="single" collapsible className="w-full">
                    {examTypeData.map((exam: any) => (
                      exam.subMenuExists && exam.subMenus?.length ? (
                        <AccordionItem value={exam._id} key={exam._id} className="border-none">
                          <AccordionTrigger className="py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:no-underline px-3">{exam.examType}</AccordionTrigger>
                          <AccordionContent className="pl-4 space-y-1">
                            {exam.subMenus.map((sub: any) => (
                              <button
                                key={sub._id}
                                onClick={() => { handleSubExamClick(exam, sub); setMobileOpen(false); }}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#FF5635] rounded-lg"
                              >
                                {sub.subExamType}
                              </button>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <button
                          key={exam._id}
                          onClick={() => { handleExamClick(exam); setMobileOpen(false); }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          {exam.examType}
                        </button>
                      )
                    ))}
                  </Accordion>
                </div>

                <div className="px-4 space-y-1">
                  {navLinks.map((link: any) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm ${isActive(link.href) ? "text-[#FF5635] font-semibold bg-orange-50" : "text-gray-700 hover:text-[#FF5635] hover:bg-orange-50"}`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {token && (
                    <Link
                      href="/analytics"
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive("/analytics")
                        ? "text-[#FF5635] bg-orange-50"
                        : "text-gray-900 hover:text-[#FF5635] hover:bg-orange-50"
                        }`}
                    >
                      Analytics
                    </Link>
                  )}
                </div>

                {/* <div className="px-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Resources</p>
                  <div className="space-y-1 pl-2">
                    {["Resources Home", "Instructions", "Blogs"].map((item, idx) => (
                      <Link
                        key={item}
                        href={["/resources", "/instructions", "/blog"][idx]}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-[#FF5635] hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="p-4 border-t bg-white safe-area-bottom pb-8 sm:pb-6">
                {!token ? (
                  <div className="space-y-2">
                    {/* <Link href="/Auth/register" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2 text-[#FF5635] font-semibold rounded-full border border-[#FF5635] hover:bg-orange-50">
                      Register
                    </Link> */}
                    <Button onClick={() => { loginWithGoogle(); setMobileOpen(false); }} className="w-full rounded-full bg-[#FF5635] text-white px-4 py-2 h-auto text-lg shadow-lg">
                      Login
                    </Button>
                    {/* <Link
                      href="/Auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-4 py-3 text-[#FF5635] font-semibold rounded-full border-2 border-[#FF5635] hover:bg-orange-50 transition-colors"
                    >
                      Create Account
                    </Link> */}
                  </div>
                ) : (
                  (userLogin?.role === "Admin" || userLogin?.role === "Expert") && (
                    <Button onClick={() => { router.push("/dashboard/home"); setMobileOpen(false); }} className="w-full border-[#FF5635] text-[#FF5635] px-4 py-2 h-auto text-lg" variant="outline">
                      <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                    </Button>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};