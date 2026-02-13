"use client";

import React from "react";
import CULT from "@/assets/vectors/pricing/CULT.svg";
import Image from "next/image";

export default function CUPT() {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl max-w-4xl mx-auto border border-dashed border-gray-200">
      <Image
        src={CULT}
        alt="Soon"
        width={100}
        height={100}
        className="grayscale opacity-30 mb-2"
      />
      <h3 className="text-lg font-bold text-gray-300 uppercase">
        CUET Coming Soon
      </h3>
    </div>
  );
}