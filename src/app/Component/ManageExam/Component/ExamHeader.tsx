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
 const [openPopup, setOpenPopup] = useState(false);
  const toggleCalculator = () => {
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
        <div
          className="fixed top-0 right-4 z-50 bg-white p-2 shadow-lg rounded-lg"
        >
          <CalculatorApp onClose={() => setIsOpen(false)}  />
        </div>
      )}
      {/* </DraggableWrapper> */}
    </div>
  );
}

export default ExamHeader;
