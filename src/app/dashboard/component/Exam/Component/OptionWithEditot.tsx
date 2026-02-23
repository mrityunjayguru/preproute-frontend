"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper";
import Toolbar from "./ToolBar";
import Image from "next/image";
import TRUE from "@/assets/vectors/mangeExam/true.svg";

interface OptionEditorProps {
  choice: string;
  value?: string;
  isCorrect: boolean;
  onChange: (content: string) => void;
  onCheckToggle: () => void;
  QuestionType: "Normal" | "Other";
}

interface TableToolbarPos {
  top: number;
  left: number;
}

export default function OptionWithEditor({
  choice,
  value,
  isCorrect,
  onChange,
  onCheckToggle,
  QuestionType,
}: OptionEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const initializedRef = useRef(false);

  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tableWidth, setTableWidth] = useState<string>("");
  const [tableHeight, setTableHeight] = useState<string>("");
  const [showLatexModal, setShowLatexModal] = useState(false);
  const [latexInput, setLatexInput] = useState("");
  const [showTableToolbar, setShowTableToolbar] = useState<boolean>(false);
  const [tableToolbarPos, setTableToolbarPos] = useState<TableToolbarPos>({ top: 0, left: 0 });
  const [previewHTML, setPreviewHTML] = useState("");

  /* ================= INITIALIZE ================= */

  useEffect(() => {
    if (!editorRef.current || initializedRef.current) return;
    editorRef.current.innerHTML = value || "";
    setPreviewHTML(value || "");
    initializedRef.current = true;
  }, []);

  /* ================= SELECTION HELPERS ================= */

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const range = savedRangeRef.current;
    if (!range) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const updateContent = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    onChange(html);
    setPreviewHTML(html);
  };

  const insertNode = (node: Node) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      editorRef.current?.appendChild(node);
    } else {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      range.setStartAfter(node);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    updateContent();
  };

  /* ================= TABLE LOGIC ================= */

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const table = (e.target as HTMLElement).closest("table") as HTMLTableElement | null;

    if (table) {
      setSelectedTable(table);
      setTableWidth(table.style.width || table.getAttribute("width") || "100%");
      setTableHeight(table.style.height || table.getAttribute("height") || "auto");

      const rect = table.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      setTableToolbarPos({
        top: rect.top - (containerRect?.top || 0) - 60, // Adjusted slightly for row/col buttons
        left: Math.max(0, rect.left - (containerRect?.left || 0)),
      });

      setShowTableToolbar(true);
    } else {
      setShowTableToolbar(false);
      setSelectedTable(null);
    }
  };

  const insertTable = (r = 3, c = 3) => {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.height = "auto";
    table.style.margin = "10px 0";

    for (let i = 0; i < r; i++) {
      const tr = table.insertRow();
      for (let j = 0; j < c; j++) {
        const td = tr.insertCell();
        td.innerHTML = "&nbsp;";
        td.style.border = "1px solid #ccc";
        td.style.padding = "8px";
        td.style.minWidth = "40px";
      }
    }
    insertNode(table);
  };

  const handleTableDimensionChange = (type: 'width' | 'height', val: string) => {
    if (type === 'width') setTableWidth(val);
    if (type === 'height') setTableHeight(val);
    
    if (selectedTable) {
      selectedTable.style[type] = val.includes('%') || val.includes('px') ? val : val + "px";
      updateContent();
    }
  };

  const handleAddRow = () => {
    if (!selectedTable) return;
    const row = selectedTable.insertRow();
    const cellCount = selectedTable.rows[0].cells.length;
    for (let i = 0; i < cellCount; i++) {
      const cell = row.insertCell();
      cell.innerHTML = "&nbsp;";
      cell.style.border = "1px solid #ccc";
      cell.style.padding = "8px";
    }
    updateContent();
  };

  const handleRemoveRow = () => {
    if (selectedTable && selectedTable.rows.length > 1) {
      selectedTable.deleteRow(-1);
      updateContent();
    }
  };

  const handleAddColumn = () => {
    if (!selectedTable) return;
    for (let i = 0; i < selectedTable.rows.length; i++) {
      const cell = selectedTable.rows[i].insertCell();
      cell.innerHTML = "&nbsp;";
      cell.style.border = "1px solid #ccc";
      cell.style.padding = "8px";
    }
    updateContent();
  };

  const handleRemoveColumn = () => {
    if (selectedTable && selectedTable.rows[0].cells.length > 1) {
      for (let i = 0; i < selectedTable.rows.length; i++) {
        selectedTable.rows[i].deleteCell(-1);
      }
      updateContent();
    }
  };

  const handleRemoveTable = () => {
    if (selectedTable) {
      selectedTable.remove();
      setShowTableToolbar(false);
      setSelectedTable(null);
      updateContent();
    }
  };

  /* ================= IMAGE LOGIC ================= */

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const res: any = await dispatch(handleUploadImage({ image: file }));
      const url = res?.payload;
      if (url) {
        const wrapper = createImageWrapper(url);
        insertNode(wrapper);
      }
    };
    input.click();
  };

const createImageWrapper = (imageUrl: string) => {
  const wrapper = document.createElement("span");
  wrapper.contentEditable = "false";

  Object.assign(wrapper.style, {
    position: "relative",
    display: "inline-block",
    margin: "10px",
    verticalAlign: "middle",
    cursor: "pointer",
  });

  const img = document.createElement("img");
  img.src = imageUrl;

  Object.assign(img.style, {
    width: "200px",
    height: "auto",
    borderRadius: "4px",
    display: "block",
  });

  /* ================= CONTROLS ================= */

  const controls = document.createElement("div");

  Object.assign(controls.style, {
    position: "absolute",
    top: "-60px",
    left: "0",
    display: "none",
    gap: "6px",
    background: "#ffffff",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    zIndex: "50",
  });

  const createInput = (
    placeholder: string,
    initial: string,
    prop: "width" | "height"
  ) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = initial;
    input.placeholder = placeholder;

    Object.assign(input.style, {
      width: "60px",
      fontSize: "12px",
      border: "1px solid #ccc",
      padding: "2px 4px",
      borderRadius: "4px",
    });

    input.addEventListener("input", (e) => {
      const val = (e.target as HTMLInputElement).value;
      img.style[prop] = /^\d+$/.test(val) ? val + "px" : val;
      updateContent();
    });

    return input;
  };

  const widthInput = createInput("W", "200px", "width");
  const heightInput = createInput("H", "auto", "height");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "✕";

  Object.assign(deleteBtn.style, {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "0 6px",
    cursor: "pointer",
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrapper.remove();
    updateContent();
  });

  controls.appendChild(widthInput);
  controls.appendChild(heightInput);
  controls.appendChild(deleteBtn);

  wrapper.appendChild(img);
  wrapper.appendChild(controls);

  /* ================= OPEN / CLOSE LOGIC ================= */

  let isOpen = false;

  const openControls = () => {
    controls.style.display = "flex";
    wrapper.style.outline = "2px solid #3b82f6";
    isOpen = true;
  };

  const closeControls = () => {
    controls.style.display = "none";
    wrapper.style.outline = "none";
    isOpen = false;
  };

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isOpen) openControls();
    else closeControls();
  });

  /* Prevent close when clicking inside controls */
  controls.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  widthInput.addEventListener("click", (e) => e.stopPropagation());
  heightInput.addEventListener("click", (e) => e.stopPropagation());

  /* Close when clicking outside */
  const handleOutsideClick = (e: MouseEvent) => {
    if (!wrapper.contains(e.target as Node)) {
      closeControls();
    }
  };

  document.addEventListener("click", handleOutsideClick);

  return wrapper;
};
  /* ================= LATEX ================= */

  const insertLatex = () => {
    if (!latexInput.trim()) return;
    const span = document.createElement("span");
    span.innerHTML = `$$${latexInput}$$`;
    insertNode(span);
    setLatexInput("");
    setShowLatexModal(false);
  };

 const renderPreview = useMemo(() => {
    if (!previewHTML) return null;

    // LaTeX regex patterns
    const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
    const blockLatexTest = (t: string) => /^\$\$[\s\S]+\$\$$/.test(t);
    const inlineLatexTest = (t: string) => /^\$[^$]+\$$/.test(t);

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div id="__root__">${previewHTML}</div>`, "text/html");
    const root = doc.getElementById("__root__");
    if (!root) return null;

    const normalizeText = (s: string) =>
      s.replace(/\u00A0/g, " ").replace(/\r/g, "");

    const renderNode = (node: ChildNode, key: string | number): React.ReactNode => {
      // --- Handle text nodes ---
      if (node.nodeType === Node.TEXT_NODE) {
        const raw = normalizeText(node.textContent || "");
        if (!raw) return null;

        const parts = raw.split(latexRegex);
        return parts.map((part, idx) => {
          if (part === "") return null;

          if (!latexRegex.test(part)) {
            const html = part
              .replace(/\n/g, "<br/>")
              .replace(/ {2}/g, "&nbsp;&nbsp;");
            return <span key={`${key}-t-${idx}`} dangerouslySetInnerHTML={{ __html: html }} />;
          }

          if (blockLatexTest(part)) {
            const math = part.slice(2, -2).trim();
            return (
              <div
                key={`${key}-b-${idx}`}
                style={{ textAlign: "center", margin: "0.5rem 0" }}
              >
                <BlockMath math={math} />
              </div>
            );
          }

          if (inlineLatexTest(part)) {
            const math = part.slice(1, -1).trim();
            return <InlineMath key={`${key}-i-${idx}`} math={math} />;
          }

          return null;
        });
      }

      // --- Handle element nodes ---
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const tag = el.tagName.toLowerCase();
        const children = Array.from(node.childNodes);
        const renderedChildren = children.map((child, i) =>
          renderNode(child, `${key}-${tag}-${i}`)
        );

        switch (tag) {
        case "img": {
  const src = el.getAttribute("src") || "";
  const alt = el.getAttribute("alt") || "";

  // Parse inline style string if present (e.g. style="width:50px;height:40px;")
  const styleAttr = el.getAttribute("style") || "";
  const inlineStyles: Record<string, string> = {};
  styleAttr.split(";").forEach((rule) => {
    const [prop, value] = rule.split(":").map((s) => s && s.trim());
    if (prop && value) {
      // Convert CSS property to camelCase for React
      const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      inlineStyles[jsProp] = value;
    }
  });

  // Respect width/height attributes as well
  const widthAttr = el.getAttribute("width");
  const heightAttr = el.getAttribute("height");

  return (
    <img
      key={key}
      src={src}
      alt={alt}
      width={widthAttr || undefined}
      height={heightAttr || undefined}
      style={{
        display: "inline-block",
        maxWidth: "100%",
        height: "auto",
        verticalAlign: "middle",
        margin: "0 .3rem",
        ...inlineStyles, // merge inline styles from content
      }}
    />
  );
}


   case "table": {
  // Parse inline style string if present (e.g. style="width:50px;height:40px;")
  const styleAttr = el.getAttribute("style") || "";

  const inlineStyles: React.CSSProperties = {};

  styleAttr.split(";").forEach((rule) => {
    const [prop, value] = rule.split(":").map((s) => s && s.trim());

    if (prop && value) {
      // Convert CSS property to camelCase for React
      const jsProp = prop.replace(/-([a-z])/g, (_, c) =>
        c.toUpperCase()
      );

      (inlineStyles as any)[jsProp] = value;
    }
  });

  return (
    <table
      key={key}
      style={{
        borderCollapse: "collapse",
        margin: "0.5rem 0",
        ...inlineStyles,
      }}
    >
      {renderedChildren}
    </table>
  );
}
          case "tr":
            return <tr key={key}>{renderedChildren}</tr>;

          case "td":
            return (
              <td
                key={key}
                style={{
                  border: "1px solid #ccc",
                  padding: 6,
                  verticalAlign: "middle",
                }}
              >
                {renderedChildren}
              </td>
            );

          case "th":
            return (
              <th
                key={key}
                style={{
                  border: "1px solid #ccc",
                  padding: 6,
                  verticalAlign: "middle",
                }}
              >
                {renderedChildren}
              </th>
            );

          case "tbody":
          case "thead":
            return React.createElement(tag, { key }, renderedChildren);

          case "p":
            return (
              <p key={key} style={{ margin: "0.6rem 0" }}>
                {renderedChildren}
              </p>
            );

          case "div":
            return <div key={key}>{renderedChildren}</div>;

          case "span":
            return <span key={key}>{renderedChildren}</span>;

          case "b":
          case "strong":
            return <strong key={key}>{renderedChildren}</strong>;

          case "i":
          case "em":
            return <em key={key}>{renderedChildren}</em>;

          case "u":
            return <u key={key}>{renderedChildren}</u>;

          case "br":
            return <br key={key} />;

          case "ul":
            return <ul key={key}>{renderedChildren}</ul>;

          case "ol":
            return <ol key={key}>{renderedChildren}</ol>;

          case "li":
            return <li key={key}>{renderedChildren}</li>;

          default:
            return (
              <span key={key} dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
            );
        }
      }

      return null;
    };

    const output = Array.from(root.childNodes).map((n, i) =>
      renderNode(n, `root-${i}`)
    );

    return (
      <div
        style={{
          lineHeight: 1.6,
          wordBreak: "break-word",
          overflowX: "auto",
        }}
        className="preview-container"
      >
        <style>{`
          .preview-container img {
            display:inline-block;
            max-width:100%;
            height:auto;
            vertical-align:middle;
            margin:0 .3rem;
          }
          .preview-container table {
            border-collapse: collapse;
            margin: 0.5rem 0;
            width: 100%;
          }
          .preview-container td, .preview-container th {
            border:1px solid #ddd;
            padding:6px;
            vertical-align:middle;
          }
        `}</style>
        {output}
      </div>
    );
  }, [previewHTML]);

  return (
    <div ref={containerRef} className="relative border rounded-lg p-3 mb-4 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={onCheckToggle}
          className={`py-1 px-2 rounded-full transition ${isCorrect ? "bg-green-500" : "bg-gray-200"}`}
        >
          <Image src={TRUE} alt="true" width={12} height={12} className={isCorrect ? "invert" : ""} />
        </button>
        <span className="font-bold">{choice}</span>
      </div>

      <Toolbar 
        onCommand={(cmd, val) => { document.execCommand(cmd, false, val); updateContent(); }}
        onInsertLatex={() => { saveSelection(); setShowLatexModal(true); }}
        onInsertImage={handleImageUpload}
        onInsertTable={() => insertTable(3, 3)}
        onInsertLink={() => {}}
      />

      {/* Floating Table Toolbar */}
      {showTableToolbar && (
        <div 
          className="absolute z-50 bg-white border shadow-lg rounded p-2 flex gap-2 items-center"
          style={{ top: tableToolbarPos.top, left: tableToolbarPos.left }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <span className="text-[10px] text-gray-400">W:</span>
              <input 
                type="text"
                className="w-14 border text-xs p-1" 
                value={tableWidth} 
                onChange={(e) => handleTableDimensionChange('width', e.target.value)} 
              />
              <span className="text-[10px] text-gray-400">H:</span>
              <input 
                type="text"
                className="w-14 border text-xs p-1" 
                value={tableHeight} 
                onChange={(e) => handleTableDimensionChange('height', e.target.value)} 
              />
            </div>
          </div>
          <div className="h-6 w-[1px] bg-gray-200 mx-1" />
          <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border" title="Add Row" onClick={handleAddRow}>+Row</button>
          <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border" title="Remove Row" onClick={handleRemoveRow}>-Row</button>
          <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border" title="Add Column" onClick={handleAddColumn}>+Col</button>
          <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border" title="Remove Column" onClick={handleRemoveColumn}>-Col</button>
          <button className="text-xs bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded" title="Delete Table" onClick={handleRemoveTable}>🗑</button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onBlur={saveSelection}
        onClick={handleEditorClick}
        className="min-h-[150px] border p-3 outline-none rounded mt-2 focus:border-blue-400 transition-colors"
      />

      {QuestionType === "Normal" && (
        <div className="mt-4 border-t pt-2">
          <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">Preview</h4>
          {renderPreview}
        </div>
      )}

      {showLatexModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
          <div className="bg-white p-4 rounded-lg w-96 shadow-2xl">
            <textarea
              className="w-full border p-2 mb-2 rounded"
              rows={3}
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Enter LaTeX here..."
            />
            <div className="mb-4 overflow-auto max-h-20 border-b pb-2">
                <BlockMath math={latexInput || "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"} />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowLatexModal(false)} className="text-gray-500">Cancel</button>
              <button onClick={insertLatex} className="bg-blue-600 text-white px-4 py-1 rounded">Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}