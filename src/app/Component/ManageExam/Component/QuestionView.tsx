"use client";
import React, { useMemo } from "react";
import { BlockMath } from "react-katex";

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
  // Memoize the parsed question to avoid re-rendering and blinking
  const renderedQuestion = useMemo(() => {
    if (!question?.questionText) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(question.questionText, "text/html");

    return Array.from(doc.body.childNodes).map((node, i) => {
      if (node.nodeType === 1 && (node as HTMLElement).classList.contains("latex-span")) {
        return <BlockMath key={i} math={(node as HTMLElement).dataset.tex || ""} />;
      } else if (node.nodeType === 1) {
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: (node as HTMLElement).outerHTML }}
          />
        );
      } else if (node.nodeType === 3) {
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
      <div className="mb-4">{renderedQuestion}</div>
      {CurrentInput}
    </div>
  );
};

export default QuestionView;
