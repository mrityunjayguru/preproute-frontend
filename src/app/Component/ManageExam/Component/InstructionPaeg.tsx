"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function InstructionsPage() {
  const router = useRouter();

  const handleExam=()=>{
      router.push("/Exam/userExam");
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="w-full max-w-full bg-white rounded-2xl px-30">
        <h1 className="text-4xl font-bold mb-6 text-[#FF5635]">Instructions</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">General Instructions</h2>
          <ol className="list-decimal ml-6 space-y-2 text-xl">
            <li>Your clock will be set at the server. The countdown timer at the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.</li>
            <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</li>
          </ol>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-3"><span className="w-12 h-12 bg-gray-300 rounded-full shrink-0"></span><p className="text-lg">You have not visited the question yet.</p></div>
            <div className="flex items-center space-x-3"><span className="w-12 h-12 bg-red-400 rounded-full shrink-0"></span><p className="text-lg">You have not answered the question.</p></div>
            <div className="flex items-center space-x-3"><span className="w-12 h-12 bg-green-500 rounded-full shrink-0"></span><p className="text-lg">You have answered the question</p></div>
            <div className="flex items-center space-x-3"><span className="w-12 h-12 bg-purple-500 rounded-full shrink-0"></span><p className="text-lg">You have NOT answered the question, but have marked the question for review.</p></div>
            <div className="flex items-center space-x-3"><span className="w-12 h-12 bg-indigo-700 rounded-full shrink-0"></span><p className="text-lg">The question(s) “Answered and Marked for Review” will be considered for evaluation.</p></div>
          </div>

          <p className="mt-4 text-lg">
            The Marked for Review status for a question simply indicates that you would like to look at that question again. <span className="text-lg text-[#FF5635]">If a question is answered, but Marked for Review, then the answer will be considered for evaluation unless the status is modified by the candidate.</span>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Navigating to a Question</h2><h2 className="text-lg mb-4">To answer a question, do the following:</h2>
          <ul className="list-disc ml-6 space-y-2 text-black text-lg">
            <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
            <li>Click on Save & Next to save your answer for the current question and then go to the next question.</li>
            <li>Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Answering a Question</h2>
          <ul className="list-disc ml-6 space-y-2 text-lg">
            <li>Procedure for answering a multiple choice question:
              <ul className="list-[lower-alpha] ml-6 space-y-1 mt-2">
                <li>To select your answer, click on the button of one of the options.</li>
                <li>To deselect your chosen answer, click on the bubble of the chosen option again or click on the Clear Response button.</li>
                <li>To change your chosen answer, click on the bubble of another option.</li>
                <li>To save your answer, you MUST click on the Save & Next button.</li>
                <li>To mark the question for review, click on the Mark for Review & Next button. If an answer is selected for a question that is Marked for Review, that answer will be considered in the evaluation.</li>
              </ul>
            </li>
            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
            <li>Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Navigating through sections</h2>
          <ul className="list-disc ml-6 space-y-2 text-lg">
            <li>Sections in this question paper are displayed on the top bar of the screen.</li>
            <li>Candidates can view the corresponding section summary as part of the legend that appears in every section above the question palette.</li>
          </ul>
        </section>

      </div>
      <div className="flex justify-end">
          <Button
            className="bg-[#FF5635] hover:bg-[#e34d2e] px-10 text-white font-medium cursor-pointer py-8 my-2"
            onClick={handleExam}
          >
           Start Exam
          </Button>
      </div>
    </div>
  );
}
