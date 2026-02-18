"use client";

import { useEffect } from "react";

export default function DisableDevTools() {
  useEffect(() => {
    // Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable Copy / Cut / Paste
    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // Disable Text Selection (Mouse Drag)
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // Disable Key Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
        e.preventDefault();
      }

      // Ctrl+U (view source)
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
      }

      // Ctrl+C / Ctrl+A
      if (e.ctrlKey && ["c", "a"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    // Detect DevTools Open
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.innerHTML = "Inspect is not allowed!";
      }
    };

    // Apply CSS to disable selection
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.msUserSelect = "none";

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleClipboard);
    document.addEventListener("cut", handleClipboard);
    document.addEventListener("paste", handleClipboard);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", detectDevTools);

    return () => {
      document.body.style.userSelect = "auto";

      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleClipboard);
      document.removeEventListener("cut", handleClipboard);
      document.removeEventListener("paste", handleClipboard);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  return null;
}
