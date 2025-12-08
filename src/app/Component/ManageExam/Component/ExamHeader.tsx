"use client";

import React, { useState } from "react";
import CalculatorApp from "@/Common/CalculatorApp";
import { Button } from "@/components/ui/button";
import logo from '../../../../assets/images/logo.svg';
import Image from "next/image";

function ExamHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalculator = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
<div className="w-full flex justify-between items-center px-20 ">
      <Image src={logo} alt="Logo" className="h-8 w-auto mt-3" />

  {/* RIGHT: Calculator Button */}
  <Button
    className="rounded-md bg-[#FF5635] text-lg font-semibold mt-5"
    onClick={toggleCalculator}
  >
    Calculator
  </Button>
</div>

      {isOpen && (
        <div
          className="fixed top-0 right-4 z-50 bg-white p-2 shadow-lg rounded-lg"
        >
          <CalculatorApp onClose={() => setIsOpen(false)}  />
        </div>
      )}
    </div>
  );
}

export default ExamHeader;
