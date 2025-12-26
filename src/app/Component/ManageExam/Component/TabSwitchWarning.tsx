"use client";

import React from "react";

interface Props {
  onClose: () => void;
  image?: string;
}
import Image from "next/image";
import Bandar from "../../../../assets/images/Bandar.png";

const TabSwitchWarning: React.FC<Props> = ({
  onClose,
}) => {
  return (
    <div className="fixed font-poppins inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-fit text-center">

        {/* Image */}
        <Image
          src={Bandar}
          alt="warning"
          className="w-40 mx-auto mb-4"
        />

        {/* Title */}
        <h2 className="text-[#FF5B45] text-xl font-medium mb-2">
          Heroes don’t switch 
          
          tabs mid-battle.
        </h2>

        {/* Subtitle */}
        <p className="text-gray-800 mb-6 text-sm">
          The answer lies in your knowledge,<br /> not in another tab.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#ff5b45] text-white rounded-[8px] text-lg font-medium hover:bg-[#ff5b43] cursor-pointer transition"
        >
          OK
        </button>

      </div>
    </div>
  );
};

export default TabSwitchWarning;
