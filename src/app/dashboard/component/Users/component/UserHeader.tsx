"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UserHeader: React.FC = () => {
  const router = useRouter();

  const handleCreateClick = () => {
    router.push("users/create");
  };

  return (
    <div className="flex items-center justify-between bg-[#F7F7F5] px-6 py-4 rounded-md shadow-md mb-6">
      <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
      <Button
        variant="orange"
        onClick={handleCreateClick}
        className="px-6 py-2 font-medium"
      >
        + Create User
      </Button>
    </div>
  );
};

export default UserHeader;
