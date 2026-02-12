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
           In IPMAT Indore, you cannot move to the next section until the timer ends. {" "}
            <span className="text-gray-900 font-medium">
              <br/> 
         On our platform, you can proceed earlier by clicking Save & Next after attempting the last question of the section.
            </span>
          </p>
          {/* <p className="font-medium">
            <span className="text-[#FF5635] font-medium">
            Good news:
            </span>
<br />
            <span className="text-gray-900">
You can submit the mock test once you reach the final section, 
even before the timer runs out.
            </span>
          </p> */}
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
