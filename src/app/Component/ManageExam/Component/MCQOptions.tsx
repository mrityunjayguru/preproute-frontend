import React from "react";

interface Option {
  _id: string;
  text: string;
  isCorrect?: boolean;
}

interface MCQOptionsProps {
  options: Option[];
  selected: string | null;
  setSelected: (value: string) => void;
  disabled?: boolean; // new prop
}

export const MCQOptions: React.FC<MCQOptionsProps> = ({
  options,
  selected,
  setSelected,
  disabled = false,
}) => (
  <div className="space-y-3">
    {options.map((opt, idx) => {
      const isSelected = selected === opt._id;

      return (
        <div
          key={opt._id}
          onClick={() => !disabled && setSelected(opt._id)} // disable click
          className={`flex items-center p-3 border rounded-lg transition select-none
            ${
              isSelected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:bg-gray-50"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {/* Option Label (A, B, C...) */}
          <span
            className={`w-6 h-6 flex items-center justify-center mr-3 border-2 rounded-full font-bold
              ${
                isSelected
                  ? "border-green-500 text-green-600"
                  : "text-gray-500 border-gray-300"
              }`}
          >
            {String.fromCharCode(65 + idx)}
          </span>

          {/* Option Text */}
          <span className="text-gray-800">{opt.text}</span>
        </div>
      );
    })}
  </div>
);
