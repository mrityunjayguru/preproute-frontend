import React from "react";

const OpenExamPopup = () => {
  const handleButtonClick = () => {
    const url = "/Exam/userExam"; // exam page route
    const features = `
      width=1000,
      height=700,
      top=${window.innerHeight / 2 - 350},
      left=${window.innerWidth / 2 - 500},
      toolbar=no,
      menubar=no,
      scrollbars=no,
      resizable=no,
      status=no
    `;

    const popup = window.open(url, "_blank", features);

    // Attempt to block right click and key shortcuts inside popup
    if (popup) {
      popup.onload = () => {
        popup.document.oncontextmenu = () => false; // right click disable
        popup.document.onkeydown = (e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.key === "I") ||
            (e.ctrlKey && e.key === "U")
          ) {
            e.preventDefault();
            return false;
          }
        };
      };
    }
  };

  return (
    <button onClick={handleButtonClick}>
      Open Exam Window
    </button>
  );
};

export default OpenExamPopup;
