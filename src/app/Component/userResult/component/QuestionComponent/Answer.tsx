import React from "react";

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
  // Extract user answer info
  const userAnswerId = question?.usergiven?.[0]?.userAnswer;
  const userAnswer = question.options.find((opt) => opt._id === userAnswerId);
  const correctOption = question.options.find((opt) => opt.isCorrect);
  // Determine answer status
  const isAttempted = question.userAttempt;
  const isCorrect = userAnswer && userAnswer.isCorrect;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Question */}
      <div
        className="text-gray-800 text-base mb-4"
      />

      {/* Answer Status */}
      {isAttempted ? (
        <div className="mb-4">
          {isCorrect ? (
            <p className="text-green-600 font-semibold">
              ✅ Correct Answer
            </p>
          ) : (
            <p className="text-red-600 font-semibold">
              ❌ Wrong Answer
            </p>
          )}
          <p className="text-gray-700 mt-2">
            <strong>Your Answer:</strong>{" "}
            {userAnswer ? userAnswer.text || "Selected Option" : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Correct Answer:</strong>{" "}
            {correctOption ? correctOption.text || "Option" : question.correctAnswer}
          </p>
        </div>
      ) : (
     <>
        <p className="text-gray-500 italic mb-4">Not Attempted</p>

           <strong>Correct Answer:</strong>{" "}
            {correctOption ? correctOption.text || "Option" : question.correctAnswer}
        </>
      )}

      {/* Hint / Explanation */}
      {question.hint && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">🧠 Solution:</h4>
          <div
            className="prose max-w-none text-sm text-gray-800 bg-gray-50 p-3 rounded"
            dangerouslySetInnerHTML={{ __html: question.hint }}
          />
        </div>
      )}
    </div>
  );
};

export default Answer;
