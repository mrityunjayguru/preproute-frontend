import { Button } from "@/components/ui/button";
import React from "react";

const OpenExamPopup = () => {
  const handleButtonClick = () => {
    const url = "/Exam/userExam"; // your exam page

    // open fullscreen popup
    const features = `
      fullscreen=yes,
      toolbar=no,
      menubar=no,
      location=no,
      status=no,
      resizable=no,
      scrollbars=no
    `;

    const popup = window.open(url, "_blank", features);

    if (popup) {
      popup.moveTo(0, 0);
      popup.resizeTo(screen.width, screen.height);

      popup.onload = () => {
        const doc = popup.document;

        // 🚫 Disable right-click
        doc.addEventListener("contextmenu", (e) => e.preventDefault());

        // 🚫 Disable all DevTools and navigation shortcuts
        doc.addEventListener("keydown", (e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && ["u", "r", "t", "w", "l"].includes(e.key.toLowerCase())) ||
            e.key === "Escape"
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        // 🚫 Block all anchor/link clicks
        doc.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        // 🚫 Block typing or manual URL changes in address bar
        // (this keeps the user locked in the current page)
        popup.history.pushState(null, "", popup.location.href);
        popup.onpopstate = () => {
          popup.history.pushState(null, "", popup.location.href);
        };

        // 🚫 Constantly enforce the current URL — if user tries to type another route
        setInterval(() => {
          if (popup.location.pathname !== "/Exam/userExam") {
            popup.location.href = "/Exam/userExam";
          }
        }, 1000);

        // 🚫 Prevent page close/reload
        popup.onbeforeunload = (e) => {
          e.preventDefault();
          e.returnValue = "";
        };
      };
    }
  };

  return (
    <button className="cursor-pointer"  onClick={handleButtonClick}>
      Start Exam
    </button>
  );
};

export default OpenExamPopup;
