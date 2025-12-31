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
    <div className="toolbar">
      <div className="toolbar-group">
        <div className="select-wrapper">
          <select
            onChange={(e) => onCommand("fontSize", e.target.value)}
            defaultValue="3"
            title="Font Size"
          >
            <option value="1">10</option>
            <option value="2">12</option>
            <option value="3">14</option>
            <option value="4">16</option>
            <option value="5">18</option>
            <option value="6">20</option>
            <option value="7">24</option>
          </select>
          <ChevronDown size={14} className="select-arrow" />
        </div>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={() => onCommand("fontName", "Arial")} title="Font Family">
          <Type size={18} />
        </button>
        <div className="color-picker-wrapper">
          <input
            type="color"
            onChange={(e) => onCommand("foreColor", e.target.value)}
            title="Text Color"
            className="color-input"
          />
          <div className="color-circle" />
        </div>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={() => onCommand("bold")} title="Bold"><Bold size={18} /></button>
        <button onClick={() => onCommand("italic")} title="Italic"><Italic size={18} /></button>
        <button onClick={() => onCommand("underline")} title="Underline"><Underline size={18} /></button>
        <button onClick={() => onCommand("strikeThrough")} title="Strikethrough"><Strikethrough size={18} /></button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={() => onCommand("justifyLeft")} title="Align Left"><AlignLeft size={18} /></button>
        <button onClick={() => onCommand("justifyCenter")} title="Align Center"><AlignCenter size={18} /></button>
        <button onClick={() => onCommand("justifyRight")} title="Align Right"><AlignRight size={18} /></button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={() => onCommand("insertOrderedList")} title="Ordered List"><ListOrdered size={18} /></button>
        <button onClick={() => onCommand("insertUnorderedList")} title="Bullet List"><List size={18} /></button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={onInsertImage} title="Insert Image"><ImageIcon size={18} /></button>
        <button onClick={onInsertLink} title="Insert Link"><LinkIcon size={18} /></button>
        <button onClick={onInsertTable} title="Insert Table"><TableIcon size={18} /></button>
        <button onClick={onInsertLatex} title="Insert LaTeX"><Sigma size={18} /></button>
      </div>
    </div>
  );
}
