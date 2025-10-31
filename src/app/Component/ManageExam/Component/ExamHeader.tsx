"use client";

import React, { useState } from "react";
import CalculatorApp from "@/Common/CalculatorApp";
import { Button } from "@/components/ui/button";

function ExamHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalculator = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
<div className="w-full flex justify-end px-20">
      <Button className="flex place-content-end" variant="orange" onClick={toggleCalculator}>Cal</Button>

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
