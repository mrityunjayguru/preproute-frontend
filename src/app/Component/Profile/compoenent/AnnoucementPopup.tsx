"use client";

import React from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function AnnoucementPopup({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-xl shadow-xl relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-[#1570EF]">
            Announcement Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Title</h3>
            <p className="text-md font-semibold text-gray-800">
              {data.title}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Message</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {data.message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-3">
          <button
            onClick={onClose}
            className="bg-[#FF5635] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnnoucementPopup;
