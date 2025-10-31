"use client";
import React, { useMemo } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Input } from "react-select/animated";

interface Props {
  question: any;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  CurrentInput: any;
}

const QuestionView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  currentQuestionIndex,
  CurrentInput,
}) => {
  const renderPreview = useMemo(() => {
    if (!question?.questionText) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(question.questionText, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      // ✅ If it's a LaTeX span
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).classList.contains("latex-span")
      ) {
        const rawTex = (node as HTMLElement).dataset.tex || "";

        // Decode any HTML entities (e.g. &lt; -> <)
        const decodedTex = new DOMParser().parseFromString(rawTex, "text/html")
          .documentElement.textContent;

        return <BlockMath key={i} math={decodedTex || ""} />;
      }

      // ✅ If it's any other HTML element
      if (node.nodeType === 1) {
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: (node as HTMLElement).outerHTML,
            }}
          />
        );
      }

      // ✅ If it's just text
      if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }

      return null;
    });
  }, [question?.questionText]);

  return (
    <div className="bg-white p-4 rounded-lg flex-1">
      <p className="text-sm font-bold bg-[#F7F7F5] p-2 rounded mb-2">
        {examName} – {paperName}
      </p>

      <p className="font-bold text-lg mb-4">
        Question: {currentQuestionIndex + 1}
      </p>

<div
  className={`w-full ${
    question?.questionPessage === "Pass"
      ? "flex gap-2 items-start"
      : "flex flex-col"
  }`}
>
  {/* 🟩 Question Preview Section */}
  <div
    className={`${
      question?.questionPessage === "Pass" ? "w-[65%]" : "w-full"
    } question-preview leading-relaxed space-y-2`}
  >
    {renderPreview}
  </div>

  {/* 🟦 Current Input Section */}
<div
  className={`${
    question?.questionPessage === "Pass" ? "w-[35%] border-gray-300" : "w-full"
  }`}
>
  {question?.questionPessage === "Pass" ? (
    <div className="pb-3 mb-3 border-b border-gray-300">
      <p className="py-1">{question?.passage}</p>
    </div>
  ) : null}

  {CurrentInput}
</div>

</div>

    </div>
  );
};

export default QuestionView;
