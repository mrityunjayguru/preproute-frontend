import React from "react";
import { BlockMath } from "react-katex";

interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface UserGiven {
  userAnswer: string;
}

interface Question {
  questionText: string;
  answerType: string;
  correctAnswer: string;
  options: Option[];
  userAttempt?: boolean;
  usergiven?: UserGiven[];
  hint?: string;
}

const Answer: React.FC<{ question: Question }> = ({ question }) => {
  const userAnswerId = question?.usergiven?.[0]?.userAnswer;
  const userAnswer = question.options.find((opt) => opt._id === userAnswerId);
  const correctOption = question.options.find((opt) => opt.isCorrect);

  const isAttempted = question.userAttempt;
  const isCorrect = userAnswer && userAnswer.isCorrect;

  const renderPreview = (content: string) => {
    if (!content) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    return nodes.map((node, i) => {
      if (node.nodeType === 1 && (node as HTMLElement).classList.contains("latex-span")) {
        return <BlockMath key={i} math={(node as HTMLElement).dataset.tex || ""} />;
      } else if (node.nodeType === 1) {
        return <span key={i} dangerouslySetInnerHTML={{ __html: (node as HTMLElement).outerHTML }} />;
      } else if (node.nodeType === 3) {
        return <span key={i}>{node.textContent}</span>;
      }
      return null;
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Question */}
      <div className="text-gray-800 text-base mb-4">
        {/* {renderPreview(question.questionText)} */}
      </div>

      {/* Answer Status */}
      {isAttempted ? (
        <div className="mb-4">
          {isCorrect ? (
            <p className="text-green-600 font-semibold">✅ Correct Answer</p>
          ) : (
            <p className="text-red-600 font-semibold">❌ Wrong Answer</p>
          )}
          <p className="text-gray-700 mt-2">
            <strong>Your Answer:</strong>{" "}
            {userAnswer ? renderPreview(userAnswer.text) : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Correct Answer:</strong>{" "}
            {correctOption
              ? renderPreview(correctOption.text)
              : renderPreview(question.correctAnswer)}
          </p>
        </div>
      ) : (
        <>
          {/* <p className="text-gray-500 italic mb-4">Not Attempted</p> */}
          <strong>Correct Answer:</strong>{" "}
          {correctOption
            ? renderPreview(correctOption.text)
            : renderPreview(question.correctAnswer)}
        </>
      )}

      {/* Hint / Explanation */}
      {question.hint && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-1">🧠 Solution:</h4>
          <div className="prose max-w-none text-sm text-gray-800 bg-gray-50 p-3 rounded">
            {renderPreview(question.hint)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Answer;
