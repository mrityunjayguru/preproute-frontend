"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import USER from "@/assets/vectors/user.svg";

interface UserProfileDropdownProps {
  user: any;
  onLogout: () => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onLogout,
}) => {
  const [open, setOpen] = React.useState(false);

  // Construct image URL
  const imageUrl = user?.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}`
    : undefined;

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="outline-none rounded-full pr-2 group flex items-center gap-1 bg-[#F0F9FF] cursor-pointer"
      >
        <Avatar className="h-9 w-9 border border-gray-200">
          <AvatarImage src={imageUrl} alt={user?.username || "User"} />
          <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
          <Image
           src={imageUrl }
           alt={user?.username || "User"}
           width={40}
           height={40}
           />
          </AvatarFallback>
        </Avatar>
        <ChevronDown
          className={`h-4 w-4 text-[#FF5635] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64  rounded-[8px]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="px-3 ">
          <p className="font-normal text-gray-400 text-lg font-dm-sans truncate">
            {user?.username || "User"}
          </p>
          <p className="text-[#FF5635] text-xs font-normal truncate font-dm-sans">
            {user?.nickname || user?.email || ""}
          </p>
        </div>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem asChild className="cursor-pointer  px-3 py-1 rounded-md text-sm font-dm-sans">
          <Link href="/Profile" className="w-full">
             Profile & Subscription
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer  px-3 py-1 rounded-md text-sm font-dm-sans">
          <Link href="/support" className="w-full">
             Support
          </Link>
        </DropdownMenuItem>
        
        <div className="p-2">
            <Button 
                onClick={onLogout}
                className="w-fit bg-[#FF5635] hover:bg-[#e44c2f] text-white rounded-full h-9 text-sm font-medium px-4 font-dm-sans cursor-pointer"
            >
                Logout
            </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
