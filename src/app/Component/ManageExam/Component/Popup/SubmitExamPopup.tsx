"use client";

import React from "react";

interface SubmitExamPopupProps {
  onClose: () => void;
  onConfirm: any;
}

export default function SubmitExamPopup({
  onClose,
  onConfirm,
}: SubmitExamPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl font-poppins">
        {/* Title */}
        <h2 className="text-xl font-medium text-[#FF5635]">Submit the exam?</h2>

        {/* Subtitle */}
        <p className="mt-2 text-gray-700 text-sm">
          This will submit <span className="font-normal text-black">All</span>{" "}
          sections of the mock.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* No Button */}
          <button
            onClick={onClose}
            className="bg-black cursor-pointer text-white px-6 py-2 rounded-[2px] text-md font-medium hover:bg-gray-900 transition"
          >
            No
          </button>

          {/* Yes Button */}
          <button
            onClick={onConfirm}
            className="bg-[#FF5635] cursor-pointer text-white px-6 py-2 rounded-[2px] text-md font-medium hover:bg-[#e84a2f] transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
