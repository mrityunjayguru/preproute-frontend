"use client";
import React from "react";

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
  onInsertLatex: () => void;
  onInsertImage: () => void;
}

export default function Toolbar({ onCommand, onInsertLatex, onInsertImage }: ToolbarProps) {
  return (
    <div className="bg-white border p-2 rounded-md mb-3 flex flex-wrap gap-2">
      <button onClick={() => onCommand("bold")}>B</button>
      <button onClick={() => onCommand("italic")}>I</button>
      <button onClick={() => onCommand("justifyLeft")}>L</button>
      <button onClick={() => onCommand("justifyCenter")}>C</button>
      <button onClick={() => onCommand("justifyRight")}>R</button>
      <button onClick={() => onCommand("insertOrderedList")}>1.</button>
      <button onClick={() => onCommand("insertUnorderedList")}>•</button>
      <button onClick={onInsertLatex}>∑</button>
      <button onClick={onInsertImage}>🖼</button>
    </div>
  );
}
