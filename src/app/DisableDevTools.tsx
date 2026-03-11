"use client";

import { useEffect } from "react";

export default function DisableDevTools() {
  useEffect(() => {

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable Copy / Cut / Paste
    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // Disable Text Selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // Disable Key Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "F12") {
        e.preventDefault();
      }

      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
        e.preventDefault();
      }

      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
      }

      if (e.ctrlKey && ["c", "a"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    // DevTools detection (only desktop)
    const detectDevTools = () => {

      if (isMobile) return;

      const threshold = 200;

      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        document.body.innerHTML =
          "<h1 style='text-align:center;margin-top:20%'>Inspect is not allowed!</h1>";
      }
    };

    // Debugger detection
    const debuggerCheck = () => {

      if (isMobile) return;

      const start = new Date().getTime();
      debugger;
      const end = new Date().getTime();

      if (end - start > 100) {
        document.body.innerHTML =
          "<h1 style='text-align:center;margin-top:20%'>Inspect is not allowed!</h1>";
      }
    };

    document.body.style.userSelect = "none";

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleClipboard);
    document.addEventListener("cut", handleClipboard);
    document.addEventListener("paste", handleClipboard);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    const devToolsInterval = setInterval(detectDevTools, 1500);
    const debuggerInterval = setInterval(debuggerCheck, 3000);

    return () => {

      document.body.style.userSelect = "auto";

      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleClipboard);
      document.removeEventListener("cut", handleClipboard);
      document.removeEventListener("paste", handleClipboard);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);

      clearInterval(devToolsInterval);
      clearInterval(debuggerInterval);
    };

  }, []);

  return null;
}