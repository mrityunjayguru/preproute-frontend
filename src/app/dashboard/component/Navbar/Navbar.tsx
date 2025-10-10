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

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route

  const handleChangeRoute = (page: string) => {
    router.push(`${page}`);
  };

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
          { label: "Dashboard", path: "home" },
          { label: "Setup Exam", path: "setupexam" },
          { label: "Create Question", path: "exam" },
          { label: "Create Account", path: "createaccount" },
          { label: "Analytics", path: "analytics" },
        ].map((item) => (
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
        <span className="text-sm">Operator One</span>
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
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
