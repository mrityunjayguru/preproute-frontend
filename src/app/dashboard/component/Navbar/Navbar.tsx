"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useSelector } from "react-redux";

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const userLogin=useSelector((state:any)=>state?.Auth?.loginUser)
  const handleChangeRoute = (page: string) => {
    router.push(`${page}`);
  };

  const logOut=()=>{
    localStorage.removeItem("token")
    router.push(`/Auth/signin`);

  }
  // ✅ Helper to check if the current path is active
  const isActive = (path: string) => pathname === `${path}`;
  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-6 shadow-md">
      {/* Logo */}
      <span className="text-xl font-bold cursor-pointer">
        the<span className="text-orange-500">prep</span>route
      </span>

      {/* Navigation Links */}
 <div className="flex gap-x-8 text-sm text-black">
  {[
    { label: "Dashboard", path: "/dashboard/home", isView: true },
    { label: "Setup Exam", path: "/dashboard/setupexam",isView: userLogin?.role === "Admin" },
    { label: "Create Question", path: "/dashboard/exam", isView: true},
    { label: "Create Account", path: "/dashboard/users", isView: userLogin?.role === "Admin" },
    { label: "Analytics", path: "/dashboard/analytics", isView: userLogin?.role === "Admin" },
  ]
    .filter(item => item.isView) // ✅ only show items where isView is true
    .map(item => (
      <a
        key={item.path}
        onClick={() => handleChangeRoute(item.path)}
        className={`cursor-pointer relative transition-colors duration-200 ${
          isActive(item.path)
            ? "text-orange-500 font-semibold"
            : "hover:text-orange-400"
        }`}
      >
        {item.label}
        {isActive(item.path) && (
          <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
        )}
      </a>
    ))}
</div>


      {/* User Profile */}
      <div className="flex items-center gap-x-2 text-black">

        <span className="text-sm">{userLogin?.username}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/path/to/your/image.png" alt="Operator One" />
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut} >Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
