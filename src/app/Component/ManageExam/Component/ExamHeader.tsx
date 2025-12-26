"use client";

import React, { useState } from "react";
import CalculatorApp from "@/Common/CalculatorApp";
import { Button } from "@/components/ui/button";
import logo from "@/assets/vectors/perticulerExam/logo.svg";
import Image from "next/image";
import DraggableWrapper from "@/Common/dfdf";
import InstructionPopup from "./InstructionPopup";

function ExamHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [calcPosition, setCalcPosition] = useState({ x: 0, y: 0 });
  const [openPopup, setOpenPopup] = useState(false);

  const toggleCalculator = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    setCalcPosition({
      x: rect.left + rect.width / 2 - 150, // center the calculator horizontally
      y: rect.bottom + 5, // a little offset so it doesn't overlap the button
    });

    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <InstructionPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
      <div className="w-full bg-black flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-28 py-2">
        <Image src={logo} alt="Logo" className="w-auto " />
        {/* RIGHT: Calculator Button */}
        <div className="flex font-poppins gap-5 cursor-pointer">
          <button
            className="cursor-pointer font-normal text-white"
            onClick={() => setOpenPopup(true)}
          >
            View Questions
          </button>
          <button
            className=" cursor-pointer font-normal text-white hover:"
            onClick={() => setOpenPopup(true)}
          >
            Instruction
          </button>
          <button
            className="cursor-pointer font-normal text-white"
            onClick={toggleCalculator}
          >
            Calculator
          </button>
        </div>
      </div>
      {/* <DraggableWrapper> */}

      {isOpen && (
        <CalculatorApp
          onClose={() => setIsOpen(false)}
          initialPosition={calcPosition}
        />
      )}
      {/* </DraggableWrapper> */}
    </div>
  );
}

export default ExamHeader;
