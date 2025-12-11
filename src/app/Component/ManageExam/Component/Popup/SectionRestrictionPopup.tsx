"use client";

import React from "react";

interface Props {
  onClose: () => void;
  examname?: string;
}

export default function SectionRestrictionPopup({ onClose, examname }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
        
        <div className="border-2 border-[#2EA8FF] rounded-lg p-4 text-left space-y-2">
          
          <p className="text-[#FF5635] font-semibold">
            {examname} doesn’t let you jump sections or submit early—
            and neither do we.
          </p>

          <p className="text-gray-800">
            Think of it as your mental gym. Stick to the rules here, and you’ll
            be truly exam-ready.
          </p>

          <p className="text-[#FF5635] font-semibold">Good news though:</p>

          <p className="text-gray-800">
            You can submit the mock when you reach the final section—
            before the timer hits zero.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-[#FF5635] text-white w-32 mx-auto py-2.5 rounded-xl text-lg font-medium hover:bg-[#e64d2e] transition"
        >
          OK
        </button>

      </div>
    </div>
  );
}
