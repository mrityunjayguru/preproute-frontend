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
    setTimeout(() => (window as any).MathJax?.typesetPromise?.(), 50);
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

  const insertTable = (rows: number, cols: number) => {
    let tableHtml = '<table class="editor-table"><tbody>';
    for (let i = 0; i < rows; i++) {
      tableHtml += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHtml += "<td>&nbsp;</td>";
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table><p>&nbsp;</p>";
    insertHTML(tableHtml);
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  return (
    <div className="editor-container">
      <Toolbar
        onCommand={execCommand}
        onInsertLatex={() => {
          saveSelection();
          setShowLatexModal(true);
        }}
        onInsertImage={() => {
          const url = prompt("Enter Image URL:");
          if (url) insertHTML(`<img src="${url}" style="max-width:100%; height:auto;" />`);
        }}
        onInsertTable={() => insertTable(3, 3)}
        onInsertLink={handleLink}
      />

      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onInput={() => onChange(editorRef.current?.innerHTML || "")}
        onBlur={() => onChange(editorRef.current?.innerHTML || "")}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{ minHeight: "150px" }}
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
