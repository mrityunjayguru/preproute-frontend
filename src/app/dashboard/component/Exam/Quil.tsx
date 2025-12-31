"use client";

import React, { useEffect, useRef, useState } from "react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedSelectionRef = useRef<Range | { start: number; end: number } | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);

  const [showLatexModal, setShowLatexModal] = useState(false);
  const [latexInput, setLatexInput] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    // Load MathJax
    if (!window.MathJax) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Save & restore selection
  const saveSelection = () => {
    const sel = window.getSelection();
    const activeEl = document.activeElement as HTMLElement;
    focusedElementRef.current = activeEl;

    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      savedSelectionRef.current = {
        start: (activeEl as HTMLInputElement).selectionStart || 0,
        end: (activeEl as HTMLInputElement).selectionEnd || 0,
      };
    } else if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    const el = focusedElementRef.current;

    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
      const input = el as HTMLInputElement;
      const range = savedSelectionRef.current as { start: number; end: number };
      input.focus();
      input.setSelectionRange(range.start, range.end);
    } else if (sel && savedSelectionRef.current instanceof Range) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHTML = (html: string) => {
    restoreSelection();
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
  };

  // ---------- LaTeX ----------
  const insertLatexAtSelection = (latex: string) => {
    const escapeHtml = (t: string) =>
      t.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");

    const cleanLatex = latex.trim();
    if (!cleanLatex) return;

    if (focusedElementRef.current?.tagName === "INPUT" || focusedElementRef.current?.tagName === "TEXTAREA") {
      const input = focusedElementRef.current as HTMLInputElement;
      const range = savedSelectionRef.current as { start: number; end: number };
      const before = input.value.slice(0, range.start);
      const after = input.value.slice(range.end);
      input.value = before + cleanLatex + after;
      input.focus();
      const cursorPos = range.start + cleanLatex.length;
      input.setSelectionRange(cursorPos, cursorPos);
    } else {
      let html = "";
      if (cleanLatex.startsWith("$$") && cleanLatex.endsWith("$$")) {
        const inner = cleanLatex.slice(2, -2).trim();
        html = `<div class="my-2 text-center" data-tex="${escapeHtml(inner)}">\\[${escapeHtml(inner)}\\]</div>`;
      } else {
        html = `<span data-tex="${escapeHtml(cleanLatex)}">\\(${escapeHtml(cleanLatex)}\\)</span>`;
      }
      insertHTML(html);
      setTimeout(() => window.MathJax?.typesetPromise?.(), 50);
    }
    setShowLatexModal(false);
  };

  const handleInsertLatex = () => {
    saveSelection();
    setLatexInput("");
    setShowLatexModal(true);
  };

  // ---------- Image ----------
  const handleInsertImage = () => {
    saveSelection();
    setShowImageModal(true);
  };

  const insertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src === "string" && editorRef.current) {
        const img = document.createElement("img");
        img.src = src;
        img.className = "max-w-full rounded-lg shadow-sm my-2";
        editorRef.current.appendChild(img);
        const p = document.createElement("p");
        p.innerHTML = "&nbsp;";
        editorRef.current.appendChild(p);
      }
      onChange(editorRef.current?.innerHTML || "");
      setShowImageModal(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="bg-white border p-2 rounded-md mb-3 flex flex-wrap gap-2">
        <button onClick={() => execCommand("bold")}>B</button>
        <button onClick={() => execCommand("italic")}>I</button>
        <button onClick={() => execCommand("justifyLeft")}>L</button>
        <button onClick={() => execCommand("justifyCenter")}>C</button>
        <button onClick={() => execCommand("justifyRight")}>R</button>
        <button onClick={() => execCommand("insertOrderedList")}>1.</button>
        <button onClick={() => execCommand("insertUnorderedList")}>•</button>
        {/* Font Size */}
        <select
          onChange={(e) => execCommand("fontSize", e.target.value)}
          defaultValue="3"
          className="border rounded px-1 h-8"
          title="Font Size"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>

        {/* Text Color */}
        <div className="flex items-center">
          <input
            type="color"
            onChange={(e) => execCommand("foreColor", e.target.value)}
            className="w-8 h-8 p-0 border-0 cursor-pointer"
            title="Text Color"
          />
        </div>

        <button onClick={handleInsertLatex}>∑</button>
        <button onClick={handleInsertImage}>🖼</button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML || "")}
        onPaste={handlePaste}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="min-h-[200px] border rounded-md p-3 bg-white"
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* LaTeX Modal */}
      {showLatexModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <textarea
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              className="border w-full p-2 mb-3"
              placeholder="Enter LaTeX..."
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowLatexModal(false)}>Cancel</button>
              <button onClick={() => insertLatexAtSelection(latexInput)}>Insert</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowImageModal(false)}>Cancel</button>
              <button
                onClick={() => imageFile && insertImage(imageFile)}
                disabled={!imageFile}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
