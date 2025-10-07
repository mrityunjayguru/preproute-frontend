"use client";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./ToolBar";
import LatexModal from "./LatexModal";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedSelectionRef = useRef<Range | { start: number; end: number } | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const [showLatexModal, setShowLatexModal] = useState(false);

  useEffect(() => {
    if (!window.MathJax) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      document.head.appendChild(script);
    } else {
      window.MathJax.typesetPromise?.();
    }
  }, []);

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
    setTimeout(() => window.MathJax?.typesetPromise?.(), 50);
  };

  const insertLatexAtSelection = (latex: string) => {
    const escapeHtml = (t: string) =>
      t.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");

    const cleanLatex = latex.trim();
    if (!cleanLatex) return;

    let html = "";
    if (cleanLatex.startsWith("$$") && cleanLatex.endsWith("$$")) {
      const inner = cleanLatex.slice(2, -2).trim();
      html = `<div class="my-2 text-center" data-tex="${escapeHtml(inner)}">\\[${escapeHtml(inner)}\\]</div>`;
    } else {
      html = `<span data-tex="${escapeHtml(cleanLatex)}">\\(${escapeHtml(cleanLatex)}\\)</span>`;
    }
    alert(html)
    insertHTML(html);
    setShowLatexModal(false);
  };

  return (
    <div className="relative">
      <Toolbar
        onCommand={execCommand}
        onInsertLatex={() => { saveSelection(); setShowLatexModal(true); }}
        onInsertImage={() => {}}
      />
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={() => onChange(editorRef.current?.innerHTML || "")}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="min-h-[200px] border rounded-md p-3 bg-white"
        dir="ltr"
        style={{ textAlign: "left" }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      {showLatexModal && (
        <LatexModal
          onInsert={insertLatexAtSelection}
          onClose={() => setShowLatexModal(false)}
        />
      )}
    </div>
  );
}
