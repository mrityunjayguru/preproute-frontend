"use client";
import React, { useEffect, useRef } from "react";
import Toolbar from "../../Exam/Component/ToolBar";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function Blogeditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const lastValueRef = useRef<string>("");

  /* ------------------ LOAD MATHJAX ------------------ */
  useEffect(() => {
    if (!(window as any).MathJax) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  /* ------------------ INITIAL VALUE ------------------ */
  useEffect(() => {
    if (editorRef.current && value !== lastValueRef.current) {
      editorRef.current.innerHTML = value || "";
      lastValueRef.current = value || "";
      setTimeout(() => (window as any).MathJax?.typesetPromise?.(), 50);
    }
  }, [value]);

  /* ------------------ SELECTION ------------------ */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  /* ------------------ EMIT CHANGE ------------------ */
  const emitChange = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastValueRef.current = html;
    onChange(html);
  };

  /* ------------------ EXEC COMMAND ------------------ */
  const execCommand = (cmd: string, val: string | null = null) => {
    restoreSelection();
    document.execCommand(cmd, false, val);
    emitChange();
  };

  /* ------------------ INSERT HTML ------------------ */
  const insertHTML = (html: string) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const frag = document.createDocumentFragment();
    while (temp.firstChild) frag.appendChild(temp.firstChild);

    range.insertNode(frag);
    range.collapse(false);

    sel.removeAllRanges();
    sel.addRange(range);

    emitChange();
  };

  /* ------------------ BACKGROUND COLOR ------------------ */
  const setBackgroundColor = (color: string) => {
    restoreSelection();
    document.execCommand("hiliteColor", false, color);
    emitChange();
  };

  /* ------------------ REMOVE BACKGROUND COLOR ------------------ */
  const removeBackgroundColor = () => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    const contents = range.cloneContents();

    const walker = document.createTreeWalker(
      contents,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    let node: HTMLElement | null;
    while ((node = walker.nextNode() as HTMLElement)) {
      if (node.style?.backgroundColor) {
        node.style.backgroundColor = "";
      }
    }

    range.deleteContents();
    range.insertNode(contents);
    emitChange();
  };

  /* ------------------ TABLE ------------------ */
  const insertTable = (rows = 3, cols = 3) => {
    let html = "<table border='1'><tbody>";
    for (let i = 0; i < rows; i++) {
      html += "<tr>";
      for (let j = 0; j < cols; j++) {
        html += "<td>&nbsp;</td>";
      }
      html += "</tr>";
    }
    html += "</tbody></table><p>&nbsp;</p>";
    insertHTML(html);
  };

  /* ------------------ IMAGE ------------------ */
  const handleImage = () => {
    const url = prompt("Enter Image URL");
    if (url) {
      insertHTML(`<img src="${url}" style="max-width:100%" />`);
    }
  };

  /* ------------------ LINK ------------------ */
  const handleLink = () => {
    const url = prompt("Enter URL");
    if (url) execCommand("createLink", url);
  };

  return (
    <div className="editor-container">
      {/* TOOLBAR */}
      <div className="flex items-center gap-2 mb-2">
        <Toolbar
          onCommand={(cmd, val) => {
            saveSelection();
            execCommand(cmd, val);
          }}
          onInsertLatex={() => {}}
          onInsertImage={handleImage}
          onInsertTable={() => insertTable()}
          onInsertLink={handleLink}
        />

        {/* BACKGROUND COLOR PICKER */}
        <input
          type="color"
          onChange={(e) => {
            saveSelection();
            setBackgroundColor(e.target.value);
          }}
        />

        {/* REMOVE BACKGROUND */}
        <button
          type="button"
          className="border px-2 py-1 rounded text-sm"
          onClick={() => {
            saveSelection();
            removeBackgroundColor();
          }}
        >
          Remove BG
        </button>
      </div>

      {/* EDITOR */}
      <div
        ref={editorRef}
        className="editor border rounded p-2"
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        // style={{ maxHeight: 450 }}
      />
    </div>
  );
}
