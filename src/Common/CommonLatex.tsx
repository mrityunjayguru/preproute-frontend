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
const parseStyleString = (style: string | null): React.CSSProperties => {
  if (!style) return {};

  return style.split(";").reduce((acc, item) => {
    const [key, value] = item.split(":");
    if (!key || !value) return acc;

    const jsKey = key
      .trim()
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    // ✅ REMOVE !important
    const cleanValue = value.replace(/!important/g, "").trim();

    acc[jsKey as keyof React.CSSProperties] = cleanValue;

    return acc;
  }, {} as React.CSSProperties);
};

  const normalizeText = (s: string) =>
    s.replace(/\u00A0/g, " ").replace(/\r/g, "");

  const renderNode = (node: ChildNode, key: string | number): React.ReactNode => {

    // ================= TEXT NODE =================
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = normalizeText(node.textContent || "");
        if (raw.trim() === "×" || raw.trim() === "✕") {
    return null;
  }

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
  // if (
  //   el.tagName === "BUTTON" ||
  //   el.tagName === "SVG" ||
  //   el.getAttribute("role") === "button" ||
  //   el.getAttribute("contenteditable") === "false" ||
  //   el.getAttribute("aria-label")?.toLowerCase().includes("close") ||
  //   el.getAttribute("aria-label")?.toLowerCase().includes("remove")
  // ) {
  //   return null;
  // }
      const tag = el.tagName.toLowerCase();
      const children = Array.from(el.childNodes).map((child, i) =>
        renderNode(child, `${key}-${tag}-${i}`)
      );

      switch (tag) {
    
     case "img": {
  const src = el.getAttribute("src") || "";
  const alt = el.getAttribute("alt") || "";

  // Parse inline style string if present (e.g. style="width:50px;height:40px;")
  const styleAttr = el.getAttribute("style") || "";
  const inlineStyles: Record<string, string> = {};
  styleAttr.split(";").forEach((rule) => {
    const [prop, value] = rule.split(":").map((s) => s && s.trim());
    if (prop && value) {
      // Convert CSS property to camelCase for React
      const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      inlineStyles[jsProp] = value;
    }
  });

  // Respect width/height attributes as well
  const widthAttr = el.getAttribute("width");
  const heightAttr = el.getAttribute("height");

  return (
    <img
      key={key}
      src={src}
      alt={alt}
      width={widthAttr || undefined}
      height={heightAttr || undefined}
      style={{
        display: "inline-block",
        maxWidth: "100%",
        height: "auto",
        verticalAlign: "middle",
        margin: "0 .3rem",
        ...inlineStyles, // merge inline styles from content
      }}
    />
  );
}

      case "table": {
  const inlineStyles = parseStyleString(el.getAttribute("style"));
console.log(inlineStyles,"inlineStyles")
  return (
    <table
      key={key}
      className="vikash-table"
      style={{
        ...inlineStyles,          // ✅ DB wala width + border preserve
      }}
    >
      {children}
    </table>
  );
}

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
