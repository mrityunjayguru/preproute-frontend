"use client";
import React, { useRef, useState } from "react";
import LatexModal from "./Component/LatexModal";

interface OptionWithLatexProps {
  choice: string;
  value: string;
  isCorrect: boolean;
  onChange: (val: string) => void;
  onCheckToggle: () => void;
}

export default function OptionWithLatex({ choice, value, isCorrect, onChange, onCheckToggle }: OptionWithLatexProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [showLatexModal, setShowLatexModal] = useState(false);
  const savedSelectionRef = useRef<Range | null>(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedSelectionRef.current = sel.getRangeAt(0);
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  const insertLatex = (latex: string) => {
    restoreSelection();
    const cleanLatex = latex.trim();
    if (!cleanLatex) return;
    const escapeHtml = (t: string) =>
      t.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");

    const html = `<span data-tex="${escapeHtml(cleanLatex)}">\\(${escapeHtml(cleanLatex)}\\)</span>`;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const temp = document.createElement("span");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    while (temp.firstChild) frag.appendChild(temp.firstChild);
    range.deleteContents();
    range.insertNode(frag);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || "");
    setTimeout(() => window.MathJax?.typesetPromise?.(), 50);
    setShowLatexModal(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className="flex-1 border rounded p-2 min-h-[40px] bg-white"
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML || "")}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <button
        className={`px-2 py-1 rounded ${isCorrect ? "bg-green-500 text-white" : "bg-gray-200"}`}
        onClick={onCheckToggle}
      >
        {isCorrect ? "✓" : "Mark"}
      </button>
    

      {showLatexModal && (
        <LatexModal onInsert={insertLatex} onClose={() => setShowLatexModal(false)} />
      )}
    </div>
  );
}
