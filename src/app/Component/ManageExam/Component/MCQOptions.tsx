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
  disabled?: boolean;
  question?: any;
}

export const MCQOptions: React.FC<MCQOptionsProps> = ({
  options,
  selected,
  setSelected,
  disabled = false,
  question,
}) => {
  // Get user’s selected option
  let userAnswer = question?.userAnswer;
  const isSubmitted = question?.userAttempted;

  // For some question formats (like usergiven array)
  if (isSubmitted && question?.usergiven?.[0]?.userAnswer) {
    userAnswer = question.usergiven[0].userAnswer;
  }

  return (
    <div className="space-y-3">
      {options.map((opt, idx) => {
        const isCorrect = !!opt.isCorrect;
        const isUserSelected = userAnswer === opt._id;

        // 🎨 Background Logic
        let bgClass = "border-gray-200 hover:bg-gray-50";

        if (isSubmitted) {
          if (isCorrect) {
            bgClass = "border-green-500 bg-green-100"; // ✅ correct
          } else if (isUserSelected && !isCorrect) {
            bgClass = "border-red-500 bg-red-100"; // ❌ wrong
          } else {
            bgClass = "border-gray-200 bg-white"; // ⚪ neutral
          }
        } else {
          bgClass =
            selected === opt._id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50";
        }

        // 🖱️ Handle click (disabled after submission)
        const handleClick = () => {
          if (!disabled && !isSubmitted) setSelected(opt._id);
        };

        // 🔵 Circle color
        const circleClass = isSubmitted
          ? isCorrect
            ? "border-green-500 text-green-600"
            : isUserSelected && !isCorrect
            ? "border-red-500 text-red-600"
            : "border-gray-300 text-gray-500"
          : selected === opt._id
          ? "border-blue-500 text-blue-600"
          : "border-gray-300 text-gray-500";

        return (
          <div
            key={opt._id}
            onClick={handleClick}
            className={`flex items-center p-3 border rounded-lg transition select-none ${bgClass} ${
              disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {/* Option Label (A, B, C...) */}
            <span
              className={`w-6 h-6 flex items-center justify-center mr-3 border-2 rounded-full font-bold ${circleClass}`}
            >
              {String.fromCharCode(65 + idx)}
            </span>

            {/* Option Text */}
            <span
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: opt.text }}
            />
          </div>
        );
      })}
    </div>
  );
};
