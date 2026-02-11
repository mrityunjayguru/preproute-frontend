"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { AdminProfileDropdown } from "./_component/admin-dropdown";
import USER from "@/assets/vectors/user.svg"


export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const handleChangeRoute = (page: string) => {
    router.push(`${page}`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`/Auth/signin`);
  };
  // ✅ Helper to check if the current path is active
  const isActive = (path: string) => pathname === `${path}`;

  const navItems = [
    { label: "Dashboard", path: "/dashboard/home", isView: true },
    {
      label: "Setup Exam",
      path: "/dashboard/setupexam",
      isView: userLogin?.role === "Admin",
    },
    { label: "Create Exam", path: "/dashboard/exam", isView: true },
    {
      label: "User Management",
      path: "/dashboard/users",
      isView: userLogin?.role === "Admin",
    },
    {
      label: "Create Plans",
      path: "/dashboard/plan",
      isView: userLogin?.role === "Admin",
    },
     {
      label: "Blogs",
      path: "/dashboard/blogs",
      isView: userLogin?.role === "Admin",
    },
    {
      label: "Coupon",
      path: "/dashboard/coupon",
      isView: userLogin?.role === "Admin",
    },
     {
      label: "Support",
      path: "/dashboard/support",
      isView: userLogin?.role === "Admin",
    },
        {
      label: "Announce",
      path: "/dashboard/Annoucement",
      isView: userLogin?.role === "Admin",
    },
  ];

  return (
    <header
      className={`sticky font-dm-sans top-0 z-20 w-full bg-white font-DM_Sans sm:px-6 md:px-8 lg:px-10 xl:px-12 `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:py-5">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-12">
          <div
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/home")}
          >
            <Image
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-normal text-black lg:flex xl:gap-8">
            {navItems
              .filter((item) => item.isView)
              .map((item) => (
                <a
                  key={item.path}
                  onClick={() => handleChangeRoute(item.path)}
                  className={`cursor-pointer transition-colors hover:text-[#FF5635] ${
                    isActive(item.path) ? "text-[#FF5635] font-medium" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
          </nav>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-3 xl:gap-4">
          <AdminProfileDropdown user={userLogin} onLogout={logOut} />
        </div>
      </div>
    </header>
  );
}
