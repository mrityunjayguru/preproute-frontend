"use client";

import React, { useRef, useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper";

interface OptionProps {
  choice: string;
  value: string;
  isCorrect: boolean;
  onChange: (val: string) => void;
  onCheckToggle: () => void;
  QuestionType:any
}

export default function OptionWithLatex({
  choice,
  value,
  isCorrect,
  onChange,
  onCheckToggle,
  QuestionType
}: OptionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [latexInput, setLatexInput] = useState("");
  const [showLatexModal, setShowLatexModal] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeData, setResizeData] = useState<any>(null);

  // ✅ Sync external value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
      wrapAllImagesWithTools();
      renderAllLatex();
    }
  }, [value]);

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // ---------------------- 🖼️ Handle Image Upload ----------------------
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
        if (!imageUrl) return;

        const wrapper = createImageWrapper(imageUrl);
        insertNode(wrapper);
        updateContent();
      } catch (err) {
        console.error("Image upload error:", err);
      }
    };
  };

  // 🧱 Create image wrapper with remove + resize
  const createImageWrapper = (imageUrl: string) => {
    const wrapper = document.createElement("span");
    wrapper.className = "image-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.margin = "6px";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.maxWidth = "200px";
    img.style.height = "auto";
    img.style.borderRadius = "6px";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.className = "remove-img-btn";
    Object.assign(removeBtn.style, {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "#ff4d4f",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      width: "20px",
      height: "20px",
    });

    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, {
      position: "absolute",
      bottom: "0",
      right: "0",
      width: "10px",
      height: "10px",
      background: "rgba(0,0,0,0.5)",
      cursor: "nwse-resize",
      borderRadius: "2px",
    });

    // Resize logic
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

  // 🪄 Wrap existing images on load
  const wrapAllImagesWithTools = () => {
    const imgs = editorRef.current?.querySelectorAll("img");
    imgs?.forEach((img) => {
      if (img.parentElement?.classList.contains("image-wrapper")) return;
      const wrapper = createImageWrapper(img.src);
      img.replaceWith(wrapper);
    });
  };

  // 🧩 Insert Node
  const insertNode = (node: Node) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.insertNode(node);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // 🪶 Resize handler
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!resizing || !resizeData) return;
      const { img, startX, startY, startWidth, startHeight } = resizeData;
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      const newHeight = Math.max(50, startHeight + (e.clientY - startY));
      img.style.width = `${newWidth}px`;
      img.style.height = `${newHeight}px`;
    };

    const handleUp = () => {
      if (resizing) {
        setResizing(false);
        updateContent();
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [resizing, resizeData]);

  // ---------------------- 🧮 Handle LaTeX ----------------------
  const insertLatex = (latex: string) => {
    const html = `<span class="latex-span" data-tex="${latex}">$$${latex}$$</span>`;
    insertHTMLAtCursor(html);
    setShowLatexModal(false);
    setLatexInput("");
    updateContent();
  };

  const insertHTMLAtCursor = (html: string) => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node;
    while ((node = temp.firstChild)) frag.appendChild(node);
    range.insertNode(frag);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const renderAllLatex = () => {
    const spans = editorRef.current?.querySelectorAll(".latex-span");
    spans?.forEach((span) => {
      const tex = (span as HTMLElement).dataset.tex;
      if (!tex) return;
      try {
        (span as HTMLElement).innerHTML = window.katex.renderToString(tex, {
          throwOnError: false,
        });
      } catch (err) {
        console.warn("Latex render error:", err);
      }
    });
  };

  // ---------------------- 🖊️ Remove Image Event ----------------------
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("remove-img-btn")) {
        const wrapper = target.closest(".image-wrapper");
        wrapper?.remove();
        updateContent();
      }
    };
    editor.addEventListener("click", clickHandler);
    return () => editor.removeEventListener("click", clickHandler);
  }, []);

  return (
    <div className="border p-3 rounded bg-gray-50 space-y-3">
      {/* Option Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateContent}
        className="border rounded p-2 min-h-[60px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* Toolbar */}
      <div className="flex items-center gap-3 text-sm">
        <button onClick={handleImageUpload} className="text-blue-600 hover:underline">
          🖼️ Add Image
        </button>

        {/* <button
          onClick={() => setShowLatexModal(true)}
          className="text-purple-600 hover:underline"
        >
          ∑ Add Formula
        </button> */}

        <button
          onClick={onCheckToggle}
          className={`px-3 py-1 rounded font-medium transition ${
            isCorrect
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isCorrect ? "✓ Correct" : "Mark"}
        </button>
      </div>

      {/* LaTeX Modal */}
      {showLatexModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setShowLatexModal(false)}
        >
          <div
            className="bg-white p-5 rounded shadow-md w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold mb-2">Insert LaTeX Formula</h4>
            <textarea
              rows={3}
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Type LaTeX formula"
              className="w-full border rounded p-2 mb-3"
            />
            <div className="mb-3">
              <strong>Preview:</strong>
              {latexInput ? (
                <BlockMath math={latexInput} />
              ) : (
                <p className="text-gray-400">Type to see preview...</p>
              )}
            </div>
            <button
              onClick={() => insertLatex(latexInput)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Insert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
