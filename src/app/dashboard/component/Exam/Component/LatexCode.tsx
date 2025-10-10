"use client";
import React, { useRef, useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface QuestionEditorProps {
  value?: string; // optional initial value
  onChange: (content: string) => void;
}

interface TableToolbarPos {
  top: number;
  left: number;
}

export default function QuestionEditor({ onChange,value }: QuestionEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [content, setContent] = useState<string>("");
  const [showLatexModal, setShowLatexModal] = useState<boolean>(false);
  const [latexInput, setLatexInput] = useState<string>("");
  const [showTableToolbar, setShowTableToolbar] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tableToolbarPos, setTableToolbarPos] = useState<TableToolbarPos>({ top: 0, left: 0 });
  const [selectedOption, setSelectedOption] = useState<HTMLOptionElement | null>(null);
useEffect(() => {
  if (editorRef.current) {
    if (value && value.trim() !== "") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        setContent(value);
      }
    } else {
      editorRef.current.innerHTML = ""; // ✅ show blank if no data
      setContent("");
    }
  }
}, [value]);

const updateContent = () => {
  if (editorRef.current) {
    setContent(editorRef.current.innerHTML);
  }
};


  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  // ------------------- Save/Restore selection -------------------
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0);
  };

  const restoreSelection = () => {
    const range = savedRangeRef.current;
    if (!range) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  // ------------------- LaTeX insertion -------------------
  const insertLatex = (latex: string) => {
    const cleanLatex = latex.trim();
    if (!cleanLatex) return;

    if (selectedOption) {
      selectedOption.textContent = cleanLatex;
      setSelectedOption(null);
      updateContent();
      setShowLatexModal(false);
      setLatexInput("");
      return;
    }

    restoreSelection();
    const html = `<span class="latex-span" data-tex="${cleanLatex}">$$${cleanLatex}$$</span>`;
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
    updateContent();
    setShowLatexModal(false);
    setLatexInput("");
  };

  // ------------------- Table functions -------------------
const insertTable = (rows = 3, cols = 3) => {
  const table = document.createElement("table");
  table.className = "data-table";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";
  table.style.border = "1px solid #aaa";

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const td = document.createElement("td");
      td.contentEditable = "true";
      td.innerHTML = "&nbsp;";
      td.style.border = "1px solid #aaa";
      td.style.padding = "6px";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  insertNode(table);
  updateContent();
};


  const handleAddRow = () => {
    if (!selectedTable) return;
    const row = selectedTable.insertRow(-1);
    for (let i = 0; i < selectedTable.rows[0].cells.length; i++) {
      const cell = row.insertCell(i);
      cell.contentEditable = "true";
      cell.innerHTML = "&nbsp;";
    }
    updateContent();
  };

  const handleAddColumn = () => {
    if (!selectedTable) return;
    for (let i = 0; i < selectedTable.rows.length; i++) {
      const cell = selectedTable.rows[i].insertCell(-1);
      cell.contentEditable = "true";
      cell.innerHTML = "&nbsp;";
    }
    updateContent();
  };

  const handleRemoveRow = () => {
    if (!selectedTable || selectedTable.rows.length <= 1) return;
    selectedTable.deleteRow(-1);
    updateContent();
  };

  const handleRemoveColumn = () => {
    if (!selectedTable || selectedTable.rows[0].cells.length <= 1) return;
    for (let i = 0; i < selectedTable.rows.length; i++) {
      selectedTable.rows[i].deleteCell(-1);
    }
    updateContent();
  };

  const handleRemoveTable = () => {
    if (!selectedTable) return;
    selectedTable.remove();
    setSelectedTable(null);
    setShowTableToolbar(false);
    updateContent();
  };

  // ------------------- DOM helpers -------------------
  const insertNode = (node: Node) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
  };

  

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const table = (e.target as HTMLElement).closest("table") as HTMLTableElement | null;
    if (table) {
      setSelectedTable(table);
      const rect = table.getBoundingClientRect();
      setTableToolbarPos({ top: rect.top - 40 + window.scrollY, left: rect.left + window.scrollX });
      setShowTableToolbar(true);
    } else {
      setShowTableToolbar(false);
      setSelectedTable(null);
    }

    const option = (e.target as HTMLElement).closest("option") as HTMLOptionElement | null;
    if (option) {
      setSelectedOption(option);
      saveSelection();
    } else {
      setSelectedOption(null);
    }
  };

  // ------------------- Image Upload -------------------
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.style.maxWidth = "100%";
        img.style.margin = "8px 0";
        insertNode(img);
        updateContent();
      };
      reader.readAsDataURL(file);
    };
  };

  // ------------------- Preview -------------------
  const renderPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      if (node.nodeType === 1 && (node as HTMLElement).classList.contains("latex-span") && (node as HTMLElement).dataset.tex) {
        return <BlockMath key={i} math={(node as HTMLElement).dataset.tex || ""} />;
      } else if (node.nodeType === 1) {
        return <span key={i} dangerouslySetInnerHTML={{ __html: (node as HTMLElement).outerHTML }} />;
      } else if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }
      return null;
    });
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <h3>Custom Question Editor</h3>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => document.execCommand("bold")}><b>B</b></button>
        <button onClick={() => document.execCommand("italic")}><i>I</i></button>
        <button onClick={() => document.execCommand("underline")}><u>U</u></button>
        <button onClick={handleImageUpload}>🖼️</button>
        <button onClick={() => insertTable(3, 3)}>📊</button>
        <button onClick={() => { saveSelection(); setShowLatexModal(true); }}>∑</button>
      </div>

      {/* Editor */}
     <div
  ref={editorRef}
  className="editor"
  contentEditable
  suppressContentEditableWarning={true}
  onInput={updateContent}
  onClick={handleEditorClick}
/>

      {/* Table Toolbar */}
      {showTableToolbar && (
        <div
          className="table-toolbar"
          style={{ position: "absolute", top: tableToolbarPos.top, left: tableToolbarPos.left }}
        >
          <button onClick={handleAddRow}>➕ Row</button>
          <button onClick={handleAddColumn}>➕ Col</button>
          <button onClick={handleRemoveRow}>➖ Row</button>
          <button onClick={handleRemoveColumn}>➖ Col</button>
          <button onClick={handleRemoveTable}>🗑 Remove</button>
        </div>
      )}

      {/* LaTeX Modal */}
      {showLatexModal && (
        <div className="modal-overlay" onClick={() => setShowLatexModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Insert LaTeX Formula</h4>
            <textarea
              rows={4}
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Type LaTeX formula"
            />
            <div className="preview">
              <strong>Preview:</strong>
              {latexInput ? <BlockMath math={latexInput} /> : <p>Type to see preview...</p>}
            </div>
            <button onClick={() => insertLatex(latexInput)}>Insert</button>
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="preview-box">
        <h4>Preview</h4>
        <div className="question-preview">{renderPreview()}</div>
      </div>

<style jsx>{`
  .toolbar { display: flex; gap: 6px; border: 1px solid #ddd; background: #f9f9f9; padding: 6px; border-radius: 6px; margin-bottom: 8px; }
  .toolbar button { background: #fff; border: 1px solid #ccc; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
  .toolbar button:hover { background: #0070f3; color: white; }
  .editor { 
    border: 1px solid #ccc; 
    min-height: 150px; 
    padding: 8px; 
    border-radius: 6px; 
    background: #fff; 
    overflow-x: auto;
  }
  
  /* Table with important styles */
  .data-table { 
    border-collapse: collapse !important; 
    margin: 8px 0 !important; 
    width: 100% !important; 
    border: 1px solid #aaa !important; 
    table-layout: fixed !important;
  }
  .data-table td, .data-table th { 
    border: 1px solid #aaa !important; 
    padding: 6px !important; 
    min-width: 40px !important; 
    word-break: break-word !important;
  }

  .preview-box { background: #fafafa; padding: 10px; border-radius: 6px; border: 1px solid #ddd; margin-top: 12px; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
  .modal { background: white; padding: 20px; border-radius: 8px; width: 400px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
  .modal textarea { width: 100%; padding: 6px; margin-top: 6px; border-radius: 4px; border: 1px solid #ccc; }
  .modal button { background: #0070f3; color: white; padding: 6px 10px; border: none; border-radius: 4px; margin-top: 10px; cursor: pointer; }
  .table-toolbar { background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 4px; display: flex; gap: 4px; z-index: 1000; }
  .table-toolbar button { padding: 4px 6px; cursor: pointer; }
`}</style>


    </div>
  );
}
