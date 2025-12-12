import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleGivenExam, setCurrentSection } from "@/api/Exam";

interface UserExamPopProps {
  text?: string | number;
}
const UserExamPop: React.FC<UserExamPopProps> = ({ text }) => {
    const router = useRouter();
  const dispatch=useDispatch<AppDispatch>()
  const handleButtonClick = () => {
  if (!localStorage.getItem("token")) return router.push("/Auth/signin");
    const url = "/Exam/InstructionPaeg"; // your exam page
    const payload:any=null
  dispatch(handleGivenExam(payload))
dispatch(setCurrentSection(payload))
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
        popup.history.pushState(null, "", popup.location.href);
        popup.onpopstate = () => {
          popup.history.pushState(null, "", popup.location.href);
        };

        // 🚫 Constantly enforce the current URL
        // setInterval(() => {
        //   if (popup.location.pathname !== "/Exam/userExam") {
        //     popup.location.href = "/Exam/userExam";
        //   }
        // }, 1000);

        // 🚫 Prevent page close/reload
        popup.onbeforeunload = (e) => {
          e.preventDefault();
          e.returnValue = "";
        };
      };
    }
  };

  return (
    <button className="cursor-pointer" onClick={handleButtonClick}>
      {text} Mock
    </button>
  );
};

export default UserExamPop;
