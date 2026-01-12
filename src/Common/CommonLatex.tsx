"use client";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface RenderPreviewProps {
  content: string;
}

const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
const blockLatexTest = (t: string) => /^\$\$[\s\S]+\$\$$/.test(t);
const inlineLatexTest = (t: string) => /^\$[^$]+\$$/.test(t);

const RenderPreview: React.FC<RenderPreviewProps> = ({ content }) => {
  if (!content) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="__root__">${content}</div>`, "text/html");
  const root = doc.getElementById("__root__");
  if (!root) return null;

  const normalizeText = (s: string) =>
    s.replace(/\u00A0/g, " ").replace(/\r/g, "");

  const renderNode = (node: ChildNode, key: string | number): React.ReactNode => {

    // ================= TEXT NODE =================
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = normalizeText(node.textContent || "");
      if (!raw) return null;

      const parts = raw.split(latexRegex);

      return parts.map((part, idx) => {
        if (!part) return null;

        const isBlock = blockLatexTest(part);
        const isInline = inlineLatexTest(part);

        // ---- Normal text ----
        if (!isBlock && !isInline) {
          const html = part
            .replace(/\n/g, "<br/>")
            .replace(/ {2}/g, "&nbsp;&nbsp;");
          return (
            <span
              key={`${key}-t-${idx}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // ---- Block LaTeX $$...$$ ----
        if (isBlock) {
          const math = part.slice(2, -2).trim();
          return (
            <div key={`${key}-b-${idx}`} style={{ margin: "0.4rem 0" }}>
              <BlockMath math={math} />
            </div>
          );
        }

        // ---- Inline LaTeX $...$ ----
        const math = part.slice(1, -1).trim();
        return (
          <span key={`${key}-i-${idx}`} style={{ display: "inline-block" }}>
            <InlineMath math={math} />
          </span>
        );
      });
    }

    // ================= ELEMENT NODE =================
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      const children = Array.from(el.childNodes).map((child, i) =>
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
              style={{ maxWidth: "100%", margin: "0.4rem 0" }}
            />
          );
        }

        case "table":
          return (
            <table
              key={key}
              style={{
                borderCollapse: "collapse",
                width: "100%",
                margin: "0.5rem 0",
              }}
            >
              {children}
            </table>
          );

        case "tr":
          return <tr key={key}>{children}</tr>;

        case "td":
        case "th":
          return (
            <td
              key={key}
              style={{
                border: "1px solid #ccc",
                padding: 6,
              }}
            >
              {children}
            </td>
          );

        case "br":
          return <br key={key} />;

        case "p":
          return <p key={key}>{children}</p>;

        case "div":
        case "span":
        case "b":
        case "i":
        case "u":
        case "strong":
        case "em":
        case "ul":
        case "ol":
        case "li":
        case "thead":
        case "tbody":
          return React.createElement(tag, { key }, children);

        default:
          return <span key={key}>{children}</span>;
      }
    }

    return null;
  };

  return (
    <>
      <style>{`
        .preview-container-latex .katex-display {
          margin: 0.4rem 0 !important;
          text-align: left;
        }
        .preview-container-latex .katex {
          font-size: 1em;
        }
      `}</style>

      <div
        className="preview-container-latex"
        style={{
          whiteSpace: "normal",
          lineHeight: 1.6,
          wordBreak: "break-word",
        }}
      >
        {Array.from(root.childNodes).map((n, i) =>
          renderNode(n, `root-${i}`)
        )}
      </div>
    </>
  );
};

export default RenderPreview;
