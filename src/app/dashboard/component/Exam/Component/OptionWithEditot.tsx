"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  MouseEvent,
} from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper";
import Toolbar from "./ToolBar";
import Image from "next/image";
import ADDIMAGE from "@/assets/vectors/mangeExam/image.svg";
import TRUE from "@/assets/vectors/mangeExam/true.svg";
interface OptionEditorProps {
  choice: string;                 // A, B, C, D
  value?: string;
  isCorrect: boolean;
  onChange: (content: string) => void;
  onCheckToggle: () => void;
  QuestionType: "Normal" | "Other";
}

/* ====================================================== */

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
  const savedRangeRef = useRef<Range | null>(null);
  const initializedRef = useRef(false);

  const [showLatexModal, setShowLatexModal] = useState(false);
  const [latexInput, setLatexInput] = useState("");

  const [previewHTML, setPreviewHTML] = useState("");

  /* ================= INITIALIZE ONCE ================= */

  useEffect(() => {
    if (!editorRef.current) return;
    if (initializedRef.current) return;

    editorRef.current.innerHTML = value || "";
    initializedRef.current = true;
  }, []);


  /* ================= CURSOR HELPERS ================= */

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

  /* ================= CONTENT UPDATE ================= */

  const updateContent = () => {
    if (!editorRef.current) return;
    onChange(editorRef.current.innerHTML);
  };

  /* ================= INSERT NODE ================= */

  const insertNode = (node: Node) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    updateContent();
  };

  /* ================= IMAGE ================= */

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const res: any = await dispatch(handleUploadImage({ image: file }));
      const url = res?.payload;
      if (!url) return;
        // createImageWrapper(url)
    //   const img = document.createElement("img");
    //   img.src = url;
    //   img.style.maxWidth = "100%";
    //   img.style.margin = "6px 0";

    //   insertNode(img);
    const wrapper = createImageWrapper(url);
        insertNode(wrapper);
        updateContent();
    };
  };
 const createImageWrapper = (imageUrl: string) => {
  const wrapper = document.createElement("span");
  wrapper.className = "image-wrapper";
  wrapper.contentEditable = "false";
  Object.assign(wrapper.style, {
    position: "relative",
    display: "inline-block",
    margin: "6px",
  });

  const img = document.createElement("img");
  img.src = imageUrl;
  Object.assign(img.style, {
    maxWidth: "200px",
    height: "auto",
    borderRadius: "6px",
    display: "block",
  });

  /* ❌ REMOVE IMAGE */
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "✖";
  Object.assign(removeBtn.style, {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px",
  });

  removeBtn.onclick = () => {
    wrapper.remove();
    updateContent();
  };

  /* 🔄 RESIZE HANDLE */
  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, {
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "10px",
    height: "10px",
    background: "rgba(0,0,0,0.6)",
    cursor: "nwse-resize",
    borderRadius: "2px",
  });

  let startX = 0;
  let startWidth = 0;

  resizeHandle.onmousedown = (e) => {
    e.preventDefault();
    startX = e.clientX;
    startWidth = img.offsetWidth;

    const onMouseMove = (ev: MouseEvent) => {
      const newWidth = startWidth + (ev.clientX - startX);
      img.style.width = `${Math.max(50, newWidth)}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      updateContent();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  wrapper.appendChild(img);
  wrapper.appendChild(removeBtn);
  wrapper.appendChild(resizeHandle);

  return wrapper;
};

  /* ================= TABLE ================= */

  const insertTable = (r = 3, c = 3) => {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    for (let i = 0; i < r; i++) {
      const tr = table.insertRow();
      for (let j = 0; j < c; j++) {
        const td = tr.insertCell();
        td.contentEditable = "true";
        td.innerHTML = "&nbsp;";
        td.style.border = "1px solid #ccc";
        td.style.padding = "6px";
      }
    }
    insertNode(table);
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

  /* ================= PREVIEW (SAFE) ================= */

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    //   wrapAllImagesWithTools();
    }
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPreviewHTML(editorRef.current?.innerHTML || "");
    }, 300);
    return () => clearTimeout(t);
  });

  const renderPreview = useMemo(() => {
    if (!previewHTML) return null;

    const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;

    const parseText = (text: string) =>
      text.split(latexRegex).map((part, i) => {
        if (part.startsWith("$$"))
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        if (part.startsWith("$"))
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        return <span key={i}>{part}</span>;
      });

    const parser = new DOMParser();
    const doc = parser.parseFromString(previewHTML, "text/html");

    return (
      <div className="preview-container">
        {Array.from(doc.body.childNodes).map((n, i) =>
          n.nodeType === 3 ? (
            <div key={i}>{parseText(n.textContent || "")}</div>
          ) : (
            <div
              key={i}
              dangerouslySetInnerHTML={{
                __html: (n as HTMLElement).outerHTML,
              }}
            />
          )
        )}
      </div>
    );
  }, [previewHTML]);

  /* ================= RENDER ================= */

  return (
    <div className="border rounded-lg p-3 mb-4">

      {/* ===== OPTION HEADER ===== */}
     <div className="flex items-center gap-2">
              {/* <button
                onClick={handleImageUpload}
                className="text-blue-600 hover:underline"
              >
                <Image src={ADDIMAGE} alt="add" width={24} height={24} />
              </button> */}
              <button
                onClick={onCheckToggle}
                className={`py-1 my-1 px-0.5 rounded-full font-medium transition ${
                  isCorrect
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Image src={TRUE} alt="true" width={12} height={12} />
              </button>
            </div>

      {/* ===== TOOLBAR ===== */}
      <Toolbar
        onCommand={(cmd, val) =>
          document.execCommand(cmd, false, val)
        }
        onInsertLatex={() => {
          saveSelection();
          setShowLatexModal(true);
        }}
        onInsertImage={handleImageUpload}
        onInsertTable={() => insertTable()}
        onInsertLink={() => {
          const url = prompt("Enter URL");
          if (url) document.execCommand("createLink", false, url);
        }}
      />

      {/* ===== EDITOR ===== */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="editor"
        onInput={updateContent}
        onFocus={saveSelection}
        style={{
          minHeight: 150,
          border: "1px solid #ddd",
          padding: 10,
          outline: "none",
        }}
      />

      {/* ===== PREVIEW ===== */}
      {QuestionType === "Normal" && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Preview</h4>
          {renderPreview}
        </div>
      )}

      {/* ===== LATEX MODAL ===== */}
      {showLatexModal && (
        <div className="modal bg-white p-4 rounded shadow">
          <textarea
            rows={3}
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
            className="w-full border p-2"
          />
          <BlockMath math={latexInput || " "} />
          <button
            onClick={insertLatex}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          >
            Insert
          </button>
        </div>
      )}
    </div>
  );
}
