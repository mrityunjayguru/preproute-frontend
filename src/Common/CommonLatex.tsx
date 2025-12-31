"use client";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface RenderPreviewProps {
  content: string;
}

const RenderPreview: React.FC<RenderPreviewProps> = ({ content }) => {
  if (!content) return null;

  // ---- Latex detection regex ----
  const latexRegex = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
  const blockLatexTest = (t: string) => /^\$\$[\s\S]+\$\$$/.test(t);
  const inlineLatexTest = (t: string) => /^\$[^$]+\$$/.test(t);

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="__root__">${content}</div>`, "text/html");
  const root = doc.getElementById("__root__");
  if (!root) return null;

  const normalizeText = (s: string) => s.replace(/\u00A0/g, " ").replace(/\r/g, "");

  const renderNode = (node: ChildNode, key: string | number): React.ReactNode => {
    // --- text node ---
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = normalizeText(node.textContent || "");
      if (!raw) return null;

      const parts = raw.split(latexRegex);
      return parts.map((part, idx) => {
        if (part === "") return null;
        if (!latexRegex.test(part)) {
          const html = part.replace(/\n/g, "<br/>").replace(/ {2}/g, "&nbsp;&nbsp;");
          return <span key={`${key}-t-${idx}`} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        if (blockLatexTest(part)) {
          const math = part.slice(2, -2).trim();
          return (
            <div key={`${key}-b-${idx}`} style={{ textAlign: "center", margin: "0.25rem 0" }}>
              <BlockMath math={math} />
            </div>
          );
        }
        if (inlineLatexTest(part)) {
          const math = part.slice(1, -1).trim();
          return (
            <span key={`${key}-i-${idx}`} style={{ display: "inline-block", verticalAlign: "baseline" }}>
              <InlineMath math={math} />
            </span>
          );
        }
        return null;
      });
    }

    // --- element node ---
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      const children = Array.from(node.childNodes);
      const renderedChildren = children.map((child, i) => renderNode(child, `${key}-${tag}-${i}`));

      switch (tag) {
        case "img": {
          const src = el.getAttribute("src") || "";
          const alt = el.getAttribute("alt") || "";
          const styleAttr = el.getAttribute("style") || "";
          const inlineStyles: Record<string, string> = {};
          styleAttr.split(";").forEach((rule) => {
            const [prop, value] = rule.split(":").map((s) => s && s.trim());
            if (prop && value) {
              const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
              inlineStyles[jsProp] = value;
            }
          });
          const width = el.getAttribute("width");
          const height = el.getAttribute("height");
          return (
            <img
              key={key}
              src={src}
              alt={alt}
              width={width || undefined}
              height={height || undefined}
              style={{
                display: "inline-block",
                maxWidth: "100%",
                height: "auto",
                verticalAlign: "middle",
                margin: "0.3rem",
                ...inlineStyles,
              }}
            />
          );
        }

        case "table":
          return (
            <table key={key} style={{ borderCollapse: "collapse", width: "100%", margin: "0.5rem 0" }}>
              {renderedChildren}
            </table>
          );

        case "tr":
          return <tr key={key}>{renderedChildren}</tr>;

        case "td":
        case "th":
          return (
            <td
              key={key}
              style={{
                border: "1px solid #ccc",
                padding: 6,
                verticalAlign: "middle",
              }}
            >
              {renderedChildren}
            </td>
          );

        case "p":
          return (
            <p key={key} style={{ margin: "0.6rem 0" }}>
              {renderedChildren}
            </p>
          );

        case "br":
          return <br key={key} />; // ✅ fixed

        case "div":
        case "span":
        case "ul":
        case "ol":
        case "li":
        case "b":
        case "i":
        case "u":
        case "strong":
        case "em":
        case "thead":
        case "tbody":
          return React.createElement(tag, { key }, renderedChildren);

        default:
          return <span key={key} dangerouslySetInnerHTML={{ __html: el.innerHTML }} />;
      }
    }
    return null;
  };

  const output = Array.from(root.childNodes).map((n, i) => renderNode(n, `root-${i}`));

  return (
    <>
      <style>{`
        .preview-container-latex .katex {
          font-size: 1em !important;
        }
        .preview-container-latex .katex-display {
          margin: 0.25rem 0 !important;
        }
        .preview-container-latex .katex-html {
          white-space: normal;
        }
        .preview-container-latex .katex .katex-html {
          display: inline-block;
        }
      `}</style>
      <div
        style={{
          lineHeight: 1.6,
          wordBreak: "break-word",
          overflowX: "auto",
        }}
        className="preview-container preview-container-latex font-poppins"
      >
        {output}
      </div>
    </>
  );
};

export default RenderPreview;
