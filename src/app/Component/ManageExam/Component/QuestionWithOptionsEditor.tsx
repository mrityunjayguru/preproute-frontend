"use client";
import React, { useRef, useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper"; // your API thunk
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Image as ImageIcon, 
  Link as LinkIcon, Type, ChevronDown, 
  Table as TableIcon, Sigma
} from "lucide-react";

interface QuestionEditorProps {
  value?: string;
  onChange: (content: string) => void;
}

interface TableToolbarPos {
  top: number;
  left: number;
}

export default function QuestionWithOptionsEditor({ onChange, value }: QuestionEditorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [content, setContent] = useState<string>("");
  const [showLatexModal, setShowLatexModal] = useState<boolean>(false);
  const [latexInput, setLatexInput] = useState<string>("");
  const [showTableToolbar, setShowTableToolbar] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tableToolbarPos, setTableToolbarPos] = useState<TableToolbarPos>({ top: 0, left: 0 });
useEffect(() => {
  const editor = editorRef.current;
  if (!editor) return;

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("remove-img-btn")) {
      const wrapper = target.closest(".image-wrapper");
      wrapper?.remove();
      updateContent();
    }
  };

  editor.addEventListener("click", handleClick);
  return () => editor.removeEventListener("click", handleClick);
}, []);

  // ---------------------- Initialize value ----------------------
  useEffect(() => {
    if (editorRef.current) {
      if (value && value.trim() !== "") {
        if (editorRef.current.innerHTML !== value) {
          editorRef.current.innerHTML = value;
          wrapAllImagesWithRemove();
          setContent(editorRef.current.innerHTML);
        }
      } else {
        editorRef.current.innerHTML = "";
        setContent("");
      }
    }
  }, [value]);

  // ---------------------- Helpers ----------------------
  const updateContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      onChange(editorRef.current.innerHTML);
    }
  };

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

  const insertNode = (node: Node) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
  };

  // ---------------------- Image Upload ----------------------
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
const payload:any={
  image:file
}
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response: any = await dispatch(handleUploadImage(payload));
        const imageUrl = response?.payload;
        if (!imageUrl) {
          console.error("Upload failed, no URL returned");
          return;
        }

        const wrapper = createImageWrapper(imageUrl);
        insertNode(wrapper);
        updateContent();
      } catch (err) {
        console.error("Image upload error:", err);
      }
    };
  };

const createImageWrapper = (imageUrl: string) => {
  const wrapper = document.createElement("span");
  wrapper.className = "image-wrapper";
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.margin = "8px";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.maxWidth = "50%";
  img.style.maxHeight = "50%";
  img.style.borderRadius = "6px";
  img.style.display = "block";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.className = "remove-img-btn";
  removeBtn.style.position = "absolute";
  removeBtn.style.top = "-8px";
  removeBtn.style.right = "-8px";
  removeBtn.style.background = "#ff4d4f";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "50%";
  removeBtn.style.cursor = "pointer";
  removeBtn.style.width = "20px";
  removeBtn.style.height = "20px";
  removeBtn.style.fontSize = "12px";
  removeBtn.style.lineHeight = "18px";

  wrapper.appendChild(img);
  wrapper.appendChild(removeBtn);
  return wrapper;
};


  // Wrap all existing images (on value load)
  const wrapAllImagesWithRemove = () => {
    const imgs = editorRef.current?.querySelectorAll("img");
    imgs?.forEach((img) => {
      if (img.parentElement?.classList.contains("image-wrapper")) return;

      const wrapper = createImageWrapper(img.src);
      img.replaceWith(wrapper);
    });
  };

  // ---------------------- Table ----------------------
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

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  // ---------------------- LaTeX ----------------------
  const insertLatex = (latex: string) => {
    const cleanLatex = latex.trim();
    if (!cleanLatex) return;

    restoreSelection();
    const html = `<span class="latex-span" data-tex="${cleanLatex}">$$${cleanLatex}$$</span>`;
    const temp = document.createElement("span");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    while (temp.firstChild) frag.appendChild(temp.firstChild);
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(frag);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    setShowLatexModal(false);
    setLatexInput("");
    updateContent();
  };

  // ---------------------- Preview ----------------------
  const renderPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      if (node.nodeType === 1 && (node as HTMLElement).classList.contains("latex-span")) {
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
    <div className="editor-container" style={{ position: "relative" }}>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-group">
          <div className="select-wrapper">
            <select
              onChange={(e) => document.execCommand("fontSize", false, e.target.value)}
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
          <button onClick={() => document.execCommand("fontName", false, "Arial")} title="Font Family">
            <Type size={18} />
          </button>
          <div className="color-picker-wrapper">
            <input
              type="color"
              onChange={(e) => document.execCommand("foreColor", false, e.target.value)}
              title="Text Color"
              className="color-input"
            />
            <div className="color-circle" />
          </div>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button onClick={() => document.execCommand("bold")} title="Bold"><Bold size={18} /></button>
          <button onClick={() => document.execCommand("italic")} title="Italic"><Italic size={18} /></button>
          <button onClick={() => document.execCommand("underline")} title="Underline"><Underline size={18} /></button>
          <button onClick={() => document.execCommand("strikeThrough")} title="Strikethrough"><Strikethrough size={18} /></button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button onClick={() => document.execCommand("justifyLeft")} title="Align Left"><AlignLeft size={18} /></button>
          <button onClick={() => document.execCommand("justifyCenter")} title="Align Center"><AlignCenter size={18} /></button>
          <button onClick={() => document.execCommand("justifyRight")} title="Align Right"><AlignRight size={18} /></button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button onClick={() => document.execCommand("insertOrderedList")} title="Ordered List"><ListOrdered size={18} /></button>
          <button onClick={() => document.execCommand("insertUnorderedList")} title="Bullet List"><List size={18} /></button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button onClick={handleImageUpload} title="Insert Image"><ImageIcon size={18} /></button>
          <button onClick={handleLink} title="Insert Link"><LinkIcon size={18} /></button>
          <button onClick={() => insertTable(3, 3)} title="Insert Table"><TableIcon size={18} /></button>
          <button onClick={() => { saveSelection(); setShowLatexModal(true); }} title="Insert LaTeX"><Sigma size={18} /></button>
        </div>
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
    </div>
  );
}