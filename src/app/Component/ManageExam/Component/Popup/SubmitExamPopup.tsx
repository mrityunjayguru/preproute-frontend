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
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl ">
        {/* Title */}
        <h2 className="text-xl font-medium text-[#FF5635] font-poppins">Submit the exam?</h2>

        {/* Subtitle */}
        <p className="mt-2 text-gray-700 text-md font-dm-sans">
          This will submit <span className="font-normal text-black">All</span>{" "}
          sections of the mock.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-center w-full gap-4">
          {/* No Button */}
          <button
            onClick={onClose}
            className="bg-black w-full cursor-pointer text-white px-6 py-3 rounded-[10px] text-md font-medium hover:bg-gray-900 transition"
          >
            No
          </button>

          {/* Yes Button */}
          <button
            onClick={onConfirm}
            className="bg-[#FF5635] w-full cursor-pointer text-white px-6 py-3 rounded-[10px] text-md font-medium hover:bg-[#e84a2f] transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
