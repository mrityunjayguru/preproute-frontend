"use client";

import React from "react";

interface Props {
  onClose: () => void;
  examname?: string;
}

export default function SectionRestrictionPopup({ onClose, examname }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center ">
        <div className=" rounded-lg p-4 text-left space-y-2 font-dm-sans text-lg">
          <p className="text-[#FF5635] font-medium">
            {examname} doesn’t let you jump sections{" "}
            <span className="text-gray-900 font-medium">
              or submit early— and neither do we.
              
              <br/> 
              Think of it as your mental
              gym. Stick to the rules here, and you’ll be truly exam-ready.
            </span>
          </p>
          <p className="font-medium">
            <span className="text-[#FF5635] font-medium">
              Good news though:
            </span>
<br />
            <span className="text-gray-900">
              You can submit the mock when you reach the final section— before
              the timer hits zero.
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-fit py-3 px-14 bg-[#050914] text-white rounded-[10px] text-lg font-medium hover:bg-[#ff5b43] cursor-pointer transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
