"use client";

import React, { useRef, useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleUploadImage } from "@/api/QuestionPaper";
import RenderPreview from "@/Common/CommonLatex";
import Image from "next/image";
import ADDIMAGE from "@/assets/vectors/mangeExam/image.svg";
import TRUE from "@/assets/vectors/mangeExam/true.svg";

interface OptionProps {
  choice: string;
  value: string;
  isCorrect: boolean;
  onChange: (val: string) => void;
  onCheckToggle: () => void;
  QuestionType: any;
}

export default function OptionWithLatex({
  choice,
  value,
  isCorrect,
  onChange,
  onCheckToggle,
  QuestionType,
}: OptionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [resizing, setResizing] = useState(false);
  const [resizeData, setResizeData] = useState<any>(null);

  // ✅ Sync external value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
      wrapAllImagesWithTools();
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
    <div className=" rounded  space-y-3">
      {/* Editable Option Input */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={updateContent}
          className="border rounded-[2px] p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleImageUpload}
            className="text-blue-600 hover:underline"
          >
            <Image src={ADDIMAGE} alt="add" width={24} height={24} />
          </button>
          <button
            onClick={onCheckToggle}
            className={`py-1 px-0.5 rounded-full font-medium transition ${
              isCorrect
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Image src={TRUE} alt="true" width={12} height={12} />
          </button>
        </div>
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 text-sm">
        <p className="font-poppins text-[#4BAE4F] font-dm-sans">
          {isCorrect ? "Marked Correct" : ""}
        </p>
      </div>

      {/* ✅ Live Rendered Preview */}
      <div className="border border-gray-200 rounded-[2px] p-3 min-h-[100px] bg-white">
        <h4 className="text-md font-poppins font-medium  text-gray-700 ">Preview:</h4>
        <RenderPreview content={value} />
      </div>
    </div>
  );
}
