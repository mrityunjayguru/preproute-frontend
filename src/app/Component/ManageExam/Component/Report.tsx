import { Button } from "@/components/ui/button";
import React from "react";

interface PopupProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  question?: any;
}

export default function Popup({ title, isOpen, onClose, onSubmit }: PopupProps) {
  const [inputValue, setInputValue] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="relative bg-white/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-6 w-96 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          {title || "Enter Details"}
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
            className="w-full border border-[#e34d2e] rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#e34d2e] bg-white/60 placeholder-gray-500"
          />

          <div className="flex w-full justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-1/2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </Button>
            <Button
              type="submit"
               className=" w-1/2 bg-[#FF5635] hover:bg-[#e34d2e] text-white "

            >
              Submit
            </Button>
          </div>
        </form>

        {/* Close button (optional small cross) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
