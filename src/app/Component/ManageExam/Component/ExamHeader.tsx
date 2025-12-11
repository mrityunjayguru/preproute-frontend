"use client";

import React, { useState } from "react";
import CalculatorApp from "@/Common/CalculatorApp";
import { Button } from "@/components/ui/button";
import logo from '../../../../assets/images/logo.svg';
import Image from "next/image";
import DraggableWrapper from "@/Common/dfdf";
import InstructionPopup from "./InstructionPopup";

function ExamHeader() {
  const [isOpen, setIsOpen] = useState(false);
const [calcPosition, setCalcPosition] = useState({ x: 0, y: 0 });
const [openPopup, setOpenPopup] = useState(false);

  const toggleCalculator = (e:any) => {
  const rect = e.target.getBoundingClientRect();

  setCalcPosition({
    x: rect.left + rect.width / 2 - 150, // center the calculator horizontally
    y: rect.bottom + 5, // a little offset so it doesn't overlap the button
  });

  setIsOpen((prev) => !prev);
};


  return (
    <div>
      <InstructionPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
<div className="w-full flex justify-between items-center px-20 ">
      <Image src={logo} alt="Logo" className="h-8 w-auto mt-3" />

  {/* RIGHT: Calculator Button */}
<div className="flex gap-5 cursor-pointer">
    <Button
    className="rounded-md bg-[#FF5635] text-lg font-semibold mt-5"
     onClick={() => setOpenPopup(true)}
  >
  Instruction
  </Button>
  <Button
    className="rounded-md bg-[#FF5635] text-lg font-semibold mt-5"
    onClick={toggleCalculator}
  >
    Calculator
  </Button>
</div>
</div>
{/* <DraggableWrapper> */}

      {isOpen && (
    
          <CalculatorApp onClose={() => setIsOpen(false)} initialPosition={calcPosition} />
   
      )}
      {/* </DraggableWrapper> */}
    </div>
  );
}

export default ExamHeader;
