"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import Answer from "./Answer";
import { useSelector } from "react-redux";

interface Props {
  question: any;
  examName: string;
  paperName: string;
  currentQuestionIndex: number;
  CurrentInput: any;
}

const QuestionWiswView: React.FC<Props> = ({
  question,
  examName,
  paperName,
  currentQuestionIndex,
  CurrentInput,
}) => {
 const [showAnswer, setShowAnswer] = useState<any>(false);
const singleQuestion=useSelector((state:any)=>state.question?.singleQuestion)
console.log(singleQuestion,"singleQuestionsingleQuestion")
// usergiven[0].timeTaken
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
   <>
    <div className="bg-white p-4 rounded-lg flex-1">
      <p className="text-sm font-bold bg-[#F7F7F5] p-2 rounded mb-2">
        {examName} – {paperName} 
      </p>
 <p className="font-bold text-lg mb-4">
  Question: {currentQuestionIndex + 1}
  &nbsp;&nbsp;
  <span className="text-green-500">
    {singleQuestion[0]?.userAttempted ? (
      <>
        Time: {singleQuestion[0]?.userTime}s &nbsp; | &nbsp; 
        Avg Time: {singleQuestion[0]?.averageTime}s
      </>
    ) : (
      "(Not Attempted)"
    )}
  </span>
</p>


      <div className="mb-4">{renderedQuestion}</div>
      {CurrentInput}
     <div className="flex justify-center items-center mt-10">
        <Button
          onClick={() => setShowAnswer((prev: any) => !prev)}
          className="cursor-pointer"
        >
          {showAnswer ? "Hide Result" : "Show Result"}
        </Button>
      </div>

      {/* Conditional Rendering of Answer */}
      {showAnswer && <Answer question={question} />}
    </div>
   </>

  );
};

export default QuestionWiswView;
