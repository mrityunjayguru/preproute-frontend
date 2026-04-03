import { Button } from "@/components/ui/button";
import React from "react";

interface PopupProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string; difficulty: string }) => void;
}

export default function StatusPopup({
  title,
  isOpen,
  onClose,
  onSubmit,
}: PopupProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!difficulty) {
      alert("Please select mistake type");
      return;
    }

    onSubmit({
      message: inputValue,
      difficulty,
    });

    // reset
    setInputValue("");
    setDifficulty("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      
      {/* MODAL */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-in fade-in zoom-in">

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          {title || "Report Question"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* INPUT */}
          <input
            type="text"
            placeholder="Write your issue (optional)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Select Mistake Type
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select</option>
              <option value="Silly mistakes">Silly mistakes</option>
              <option value="Concept Gap">Concept Gap</option>
              <option value="Time Pressure">Time Pressure</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!difficulty}
              className="w-1/2 bg-[#FF5635] hover:bg-[#e34d2e] text-white"
            >
              Submit
            </Button>
          </div>
        </form>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}