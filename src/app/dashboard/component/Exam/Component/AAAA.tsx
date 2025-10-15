"use client";
import React, { useRef, useState } from "react";

interface ImageItem {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvaEditorProps {
  insertImage: (url: string) => void; // callback to insert into QuestionEditor
}

export default function CanvaEditor({ insertImage }: CanvaEditorProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Upload image dynamically
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const id = Date.now().toString();

    // Add to local canvas preview
    setImages((prev) => [
      ...prev,
      { id, src: url, x: 50, y: 50, width: 150, height: 150 },
    ]);

    // Insert directly into editor
    insertImage(url);
  };

  // Move and resize logic (simplified)
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const img = images.find((img) => img.id === id);
    if (!img) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...img };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, x: start.x + dx, y: start.y + dy } : i))
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="w-full gap-4 mt-4">
      {/* Canva-like Editor */}
      <div className="w-full border border-gray-300 rounded-md relative h-[300px] bg-gray-50 overflow-hidden">
        <div className="absolute top-2 left-2 z-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            id="upload-image"
            className="hidden"
          />
          <label
            htmlFor="upload-image"
            className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded cursor-pointer"
          >
            Upload Image
          </label>
        </div>

        <div ref={canvasRef} className="relative w-full h-full">
          {images.map((img) => (
            <div
              key={img.id}
              className="absolute border border-transparent cursor-move"
              style={{ left: img.x, top: img.y, width: img.width, height: img.height }}
              onMouseDown={(e) => handleMouseDown(e, img.id)}
            >
              <img
                src={img.src}
                alt="canvas-item"
                className="w-full h-full object-cover rounded"
                draggable={false}
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full border border-gray-300 rounded-md p-2 bg-white mt-2">
        <h4 className="text-center font-semibold mb-2">Live Preview</h4>
        <div className="relative border border-gray-200 h-[300px] bg-gray-100 overflow-hidden">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt="preview"
              className="absolute object-cover rounded"
              style={{ left: img.x, top: img.y, width: img.width, height: img.height }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
