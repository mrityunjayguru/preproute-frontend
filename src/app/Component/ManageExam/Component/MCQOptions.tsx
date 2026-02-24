import { Dot } from "lucide-react";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";

interface Option {
  _id: string;
  text: string;
  isCorrect?: boolean;
}

interface MCQOptionsProps {
  options: Option[];
  selected: string | null;
  setSelected: (value: string) => void;
  disabled?: boolean;
  question?: any;
}

export const MCQOptions: React.FC<MCQOptionsProps> = ({
  options,
  selected,
  setSelected,
  disabled = false,
  question,
}) => {
  // Get user’s selected option
  let userAnswer = question?.userAnswer;
  const isSubmitted = question?.userAttempted;

  // For some question formats (like usergiven array)
  if (isSubmitted && question?.usergiven?.[0]?.userAnswer) {
    userAnswer = question.usergiven[0].userAnswer;
  }
const renderPreview = (content: any) => {
  if (!content) return null;

  const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
  const blockLatexTest = (t: string) => /^\$\$[\s\S]+\$\$$/.test(t);
  const inlineLatexTest = (t: string) => /^\$[^$]+\$$/.test(t);

  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<div id="__root__">${content}</div>`,
    "text/html"
  );
  const root = doc.getElementById("__root__");
  if (!root) return null;

  const normalizeText = (s: string) =>
    s.replace(/\u00A0/g, " ").replace(/\r/g, "");

  const renderNode = (
    node: ChildNode,
    key: string | number
  ): React.ReactNode => {
    // TEXT NODE
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = normalizeText(node.textContent || "");
      if (!raw) return null;

      const parts = raw.split(latexRegex);

      return parts.map((part, idx) => {
        if (!part) return null;

        const isLatex =
          (part.startsWith("$$") && part.endsWith("$$")) ||
          (part.startsWith("$") && part.endsWith("$"));

        if (!isLatex) {
          return (
            <span key={`${key}-t-${idx}`}>
              {part}
            </span>
          );
        }

        const math = part.replace(/^\$+|\$+$/g, "").trim();

        if (part.startsWith("$$")) {
          return (
            <div key={`${key}-b-${idx}`} style={{ margin: "0.4rem 0" }}>
              <BlockMath math={math} />
            </div>
          );
        }

        return <InlineMath key={`${key}-i-${idx}`} math={math} />;
      });
    }

    // ELEMENT NODE
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

          return (
            <img
              key={key}
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "0.5rem 0",
              }}
            />
          );
        }
case "button":
  return null; // remove delete icon button

case "div":
  // remove resize handle div (absolute positioned small box)
  if (
    el.getAttribute("style")?.includes("cursor: nwse-resize")
  ) {
    return null;
  }
  return <div key={key}>{renderedChildren}</div>;
        case "table":
          return (
            <div key={key} style={{ width: "100%" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  tableLayout: "fixed",
                  wordBreak: "break-word",
                }}
              >
                {renderedChildren}
              </table>
            </div>
          );

        case "tr":
          return <tr key={key}>{renderedChildren}</tr>;

        case "td":
        case "th":
          return (
            <td
              key={key}
              style={{
                border: "1px solid #ddd",
                padding: 6,
                wordBreak: "break-word",
              }}
            >
              {renderedChildren}
            </td>
          );

        case "p":
          return (
            <p key={key} style={{ margin: "0.5rem 0" }}>
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
          return <span key={key}>{renderedChildren}</span>;
      }
    }

    return null;
  };

  const output = Array.from(root.childNodes).map((n, i) =>
    renderNode(n, `root-${i}`)
  );

  return (
    <div
      className="preview-container"
      style={{
        lineHeight: 1.6,
        wordBreak: "break-word",
      }}
    >
      {output}
    </div>
  );
};


  return (
    <div className="space-y-3">
      {options.map((opt, idx) => {
        const isCorrect = !!opt.isCorrect;
        const isUserSelected = userAnswer == opt._id;

        // 🎨 Background Logic
        let bgClass = "border-gray-200 hover:bg-gray-50";

        if (isSubmitted) {
          if (isCorrect) {
            bgClass = "border-green-500 bg-green-100"; // ✅ correct
          } else if (isUserSelected && !isCorrect) {
            bgClass = "border-red-500 bg-red-100"; // ❌ wrong
          } else {
            bgClass = "border-gray-200 bg-white"; // ⚪ neutral
          }
        } else {
          bgClass =
            selected === opt._id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50";
        }

        // 🖱️ Handle click (disabled after submission)
        const handleClick = () => {
          if (!disabled && !isSubmitted) setSelected(opt._id);
        };

        // 🔵 Circle color
        const circleClass = isSubmitted
          ? isCorrect
            ? "border border-green-500 text-green-600"
            : isUserSelected && !isCorrect
            ? "border border-red-500 text-red-600"
            : "border border-gray-300 text-gray-500"
          : selected === opt._id
          ? "border border-blue-500 text-blue-600"
          : "border border-gray-300 text-gray-500";

        return (
          <div
            key={opt._id}
            onClick={handleClick}
            className={`flex items-center p-3 font-poppins rounded-lg transition select-none ${bgClass} ${
              disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {/* Option Label (A, B, C...) */}
            <span
              className={`w-4 h-4 flex items-center justify-center mr-3 border-2 rounded-full font-bold ${circleClass}`}
            >
              <Dot className="h-5 w-5"/>
            </span>

            {/* Option Text */}
            {renderPreview(opt.text)}
            {/* <span
              className="text-gray-900"
              dangerouslySetInnerHTML={{ __html: opt.text }}
            /> */}
          </div>
        );
      })}
    </div>
  );
};
