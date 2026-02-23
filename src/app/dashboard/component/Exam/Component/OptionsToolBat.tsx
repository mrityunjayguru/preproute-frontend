"use client";
import React from "react";
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Image as ImageIcon, 
  Link as LinkIcon, Type, ChevronDown, 
  Table as TableIcon, Sigma
} from "lucide-react";

interface ToolbarProps {
  onCommand: (command: string, value?: any) => void;
  onInsertLatex: () => void;
  onInsertImage: () => void;
  onInsertTable?: () => void;
  onInsertLink?: () => void;
}

export default function Toolbar({ onCommand, onInsertLatex, onInsertImage, onInsertTable, onInsertLink }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 bg-gray-50 p-2 border-b rounded-t-lg">
      <div className="flex items-center bg-white border rounded px-1">
        <select
          className="text-xs outline-none bg-transparent py-1"
          onChange={(e) => onCommand("fontSize", e.target.value)}
          defaultValue="3"
        >
          {[10, 12, 14, 16, 18, 20, 24].map((size, i) => (
            <option key={size} value={i + 1}>{size}</option>
          ))}
        </select>
        <ChevronDown size={12} className="text-gray-400" />
      </div>

      <div className="w-[1px] h-6 bg-gray-300 mx-1" />

      <div className="flex items-center gap-1">
        <input
          type="color"
          onChange={(e) => onCommand("foreColor", e.target.value)}
          className="w-6 h-6 p-0 border-none cursor-pointer bg-transparent"
          title="Text Color"
        />
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("bold")}><Bold size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("italic")}><Italic size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("underline")}><Underline size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("strikeThrough")}><Strikethrough size={16} /></button>
      </div>

      <div className="w-[1px] h-6 bg-gray-300 mx-1" />

      <div className="flex items-center gap-1">
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("justifyLeft")}><AlignLeft size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("justifyCenter")}><AlignCenter size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onCommand("justifyRight")}><AlignRight size={16} /></button>
      </div>

      <div className="w-[1px] h-6 bg-gray-300 mx-1" />

      <div className="flex items-center gap-1">
        <button className="p-1 hover:bg-gray-200 rounded" onClick={onInsertImage}><ImageIcon size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={onInsertTable}><TableIcon size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={onInsertLatex}><Sigma size={16} /></button>
      </div>
    </div>
  );
}