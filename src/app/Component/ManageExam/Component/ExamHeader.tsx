"use client";

import React, { useState } from "react";
import CalculatorApp from "@/Common/CalculatorApp";
import { Button } from "@/components/ui/button";
import logo from '../../../../assets/images/logo.svg';
import Image from "next/image";

function ExamHeader() {
  const [isOpen, setIsOpen] = useState(false);
const [calcPosition, setCalcPosition] = useState({ x: 0, y: 0 });


  const toggleCalculator = (e) => {
  const rect = e.target.getBoundingClientRect();

  setCalcPosition({
    x: rect.left + rect.width / 2 - 150, // center the calculator horizontally
    y: rect.bottom + 5, // a little offset so it doesn't overlap the button
  });

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
    
          <CalculatorApp onClose={() => setIsOpen(false)} initialPosition={calcPosition} />
   
      )}
    </div>
  );
}

export default ExamHeader;
