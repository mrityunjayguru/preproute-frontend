"use client";

import React from "react";
import Image from "next/image";
import comingImg from "../../assets/images/comming.jpg"; // replace with your image

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      
      {/* Top text */}
      <p className="text-red-500 text-lg md:text-xl font-medium mb-4 text-center">
        Our team is currently building this page. Will be live soon.
      </p>

      {/* Center Image */}
      <div className="w-full flex justify-center">
        <Image
          src={comingImg}
          alt="Coming Soon"
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
}
