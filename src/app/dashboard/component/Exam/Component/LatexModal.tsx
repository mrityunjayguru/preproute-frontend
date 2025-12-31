"use client";
import React, { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { XIcon } from "lucide-react";

interface LatexModalProps {
  onInsert: (latex: string) => void;
  onClose: () => void;
}

export default function LatexModal({ onInsert, onClose }: LatexModalProps) {
  const [latexInput, setLatexInput] = useState("");

  const cleanLatex = (input: string) =>
    input.replace(/^\$\$?/, "").replace(/\$\$?$/, "");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 font-poppins">
      <div className="bg-white rounded-lg shadow-lg w-96 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Insert Math Formula</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <label className="text-md font-poppins font-medium mb-1 block">LaTeX Formula</label>
        <textarea
          value={latexInput}
          onChange={(e) => setLatexInput(e.target.value)}
          placeholder="Enter LaTeX here (use $...$ or $$...$$)"
          className="border rounded p-2 w-full h-24 mb-3 resize-none focus:outline-none focus:ring focus:border-blue-300"
        />

        <label className="text-md font-poppins font-medium mb-1 block">Preview</label>
        <div className="border rounded p-2 min-h-[60px] mb-4 bg-gray-50">
          {latexInput ? (
            <BlockMath math={cleanLatex(latexInput)} />
          ) : (
            <span className="text-md font-poppins font-medium text-gray-400">Enter a formula to see the preview</span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full rounded-[8px] bg-gray-200 hover:bg-gray-300 font-poppins text-md font-poppins font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onInsert(cleanLatex(latexInput))}
            className="px-4 py-2 w-full rounded-[8px] bg-[#ff6600] text-white hover:bg-[#e65c00] cursor-pointer font-poppins text-md font-poppins font-medium"
          >
            Insert Formula
          </button>
        </div>
      </div>
    </div>
  );
}
