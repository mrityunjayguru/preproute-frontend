"use client";
import React, { useRef } from "react";

interface OptionProps {
  choice: string;
  value: string;
  isCorrect: boolean;
  onChange: (val: string) => void;
  onCheckToggle: () => void;
}

export default function OptionWithLatex({
  choice,
  value,
  isCorrect,
  onChange,
  onCheckToggle,
}: OptionProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex items-center space-x-2">
      {/* Editable Option Box */}
      <div
        className="flex-1 border rounded p-2 min-h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerText || "")}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Mark Correct Button */}
      <button
        className={`px-3 py-1 rounded font-medium transition ${
          isCorrect
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={onCheckToggle}
      >
        {isCorrect ? "✓ Correct" : "Mark"}
      </button>
    </div>
  );
}
