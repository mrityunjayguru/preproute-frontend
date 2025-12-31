"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper";
import CanvaEditor from "./AAAA";
import Toolbar from "./ToolBar";

interface QuestionEditorProps {
  value?: string;
  QuestionType:any,
  onChange: (content: string) => void;
}

interface TableToolbarPos {
  top: number;
  left: number;
}

export default function QuestionEditor({ onChange, value,QuestionType }: QuestionEditorProps) {
   console.log(QuestionType)
  const dispatch = useDispatch<AppDispatch>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [content, setContent] = useState<string>("");
  const [showLatexModal, setShowLatexModal] = useState<boolean>(false);
  const [latexInput, setLatexInput] = useState<string>("");
  const [showTableToolbar, setShowTableToolbar] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tableToolbarPos, setTableToolbarPos] = useState<TableToolbarPos>({ top: 0, left: 0 });
  const [resizing, setResizing] = useState<boolean>(false);
  const [resizeData, setResizeData] = useState<any>(null);

  // ---------------------- Handle Image Removal ----------------------
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

  // ---------------------- Initialize value for Edit ----------------------
  useEffect(() => {
    if (!editorRef.current) return;

    if (value && value.trim() !== "") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        wrapAllImagesWithRemoveAndResize();
        attachTableEvents();
        renderAllLatex();
        setContent(editorRef.current.innerHTML);
      }
    } else {
      editorRef.current.innerHTML = "";
      setContent("");
    }
  }, [value]);

  // ---------------------- Helpers ----------------------
  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContent(html);
      onChange(html);
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

  // 🩵 Move cursor after inserted node
  range.setStartAfter(node);
  range.setEndAfter(node);
  sel.removeAllRanges();
  sel.addRange(range);
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

      const payload: any = { image: file };

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

  // ---------------------- Image Wrapper + Resize ----------------------
  const createImageWrapper = (imageUrl: string) => {
    const wrapper = document.createElement("span");
    wrapper.className = "image-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.margin = "8px";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "6px";
    img.style.display = "block";
    img.style.resize = "none";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.className = "remove-img-btn";
    Object.assign(removeBtn.style, {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "#ff4d4f",
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      width: "20px",
      height: "20px",
      fontSize: "12px",
      lineHeight: "18px",
    });

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    Object.assign(resizeHandle.style, {
      position: "absolute",
      width: "10px",
      height: "10px",
      bottom: "0",
      right: "0",
      background: "rgba(0,0,0,0.5)",
      cursor: "nwse-resize",
      borderRadius: "2px",
    });

    resizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      setResizing(true);
      setResizeData({
        img,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: img.offsetWidth,
        startHeight: img.offsetHeight,
      });
    });

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    wrapper.appendChild(resizeHandle);
    return wrapper;
  };

  // Resize logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing || !resizeData) return;
      const { img, startX, startY, startWidth, startHeight } = resizeData;
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      const newHeight = Math.max(50, startHeight + (e.clientY - startY));
      img.style.width = `${newWidth}px`;
      img.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      if (resizing) {
        setResizing(false);
        updateContent();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, resizeData]);

  const wrapAllImagesWithRemoveAndResize = () => {
    const imgs = editorRef.current?.querySelectorAll("img");
    imgs?.forEach((img) => {
      if (img.parentElement?.classList.contains("image-wrapper")) return;
      const wrapper = createImageWrapper(img.src);
      const newImg = wrapper.querySelector("img")!;
      newImg.style.width = img.style.width || "auto";
      newImg.style.height = img.style.height || "auto";
      img.replaceWith(wrapper);
    });
  };

  // ---------------------- Table Handling ----------------------
  const insertTable = (rows = 3, cols = 3) => {
    const table = document.createElement("table");
    table.className = "data-table";
    Object.assign(table.style, {
      borderCollapse: "collapse",
      width: "100%",
      border: "1px solid #aaa",
    });

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

  const attachTableEvents = () => {
    const tables = editorRef.current?.querySelectorAll("table");
    tables?.forEach((table) => {
      table.querySelectorAll("td").forEach((td) => {
        td.contentEditable = "true";
      });
    });
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

  const execCommand = (command: string, value: any = null) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  // ---------------------- LaTeX ----------------------
  const renderAllLatex = () => {
    const spans = editorRef.current?.querySelectorAll(".latex-span");
    if (!spans) return;
    spans.forEach((span) => {
      const tex = (span as HTMLElement).dataset.tex;
      if (!tex) return;
      try {
        (span as HTMLElement).innerHTML = window.katex.renderToString(tex, { throwOnError: false });
      } catch (err) {
        console.warn("LaTeX render failed:", err);
      }
    });
  };

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

  // ---------------------- Render Preview ----------------------
 const renderPreview = useMemo(() => {
    if (!content) return null;

    // LaTeX regex patterns
    const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
    const blockLatexTest = (t: string) => /^\$\$[\s\S]+\$\$$/.test(t);
    const inlineLatexTest = (t: string) => /^\$[^$]+\$$/.test(t);

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div id="__root__">${content}</div>`, "text/html");
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


          case "table":
            return (
              <table
                key={key}
                style={{
                  borderCollapse: "collapse",
                  margin: "0.5rem 0",
                  width: "100%",
                }}
              >
                {renderedChildren}
              </table>
            );

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
  }, [content]);


  // ---------------------- Render UI ----------------------
  return (
    <div className="editor-container" style={{ position: "relative" }}>
      {/* <h3>Custom Question Editor</h3> */}
{/* <CanvaEditor/> */}
      {/* Toolbar */}
      <Toolbar 
        onCommand={execCommand}
        onInsertLatex={() => { saveSelection(); setShowLatexModal(true); }}
        onInsertImage={handleImageUpload}
        onInsertTable={() => insertTable(3, 3)}
        onInsertLink={handleLink}
      />

      {/* Editor */}
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onInput={updateContent}
        onClick={handleEditorClick}
        style={{
          minHeight: "200px",
        }}
      />

      {/* Table Toolbar */}
      {showTableToolbar && (
        <div
          className="table-toolbar"
          style={{
            position: "absolute",
            top: tableToolbarPos.top,
            left: tableToolbarPos.left,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "4px",
            display: "flex",
            gap: "4px",
            zIndex: 10,
          }}
        >
          <button onClick={handleAddRow}>➕ Row</button>
          <button onClick={handleAddColumn}>➕ Col</button>
          <button onClick={handleRemoveRow}>➖ Row</button>
          <button onClick={handleRemoveColumn}>➖ Col</button>
          <button onClick={handleRemoveTable}>🗑</button>
        </div>
      )}

      {/* LaTeX Modal */}
      {showLatexModal && (
        <div className="modal-overlay w-full h-full" onClick={() => setShowLatexModal(false)}>
          <div 
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "20px",
              width: "400px",
              margin: "100px auto",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h4>Insert LaTeX Formula</h4>
            <textarea
              rows={4}
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Type LaTeX formula"
              style={{ width: "100%", marginBottom: "10px" }}
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
      {QuestionType=="Normal"?(
         <div className="preview-box" style={{ marginTop: "20px" }}>
        <h4>Preview</h4>
        <div className="question-preview">{renderPreview}</div>
      </div>
      ):(null)}
     
    </div>
  );
}
