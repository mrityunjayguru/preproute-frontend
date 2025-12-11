"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questionIcon } from "@/Common/svgIcon";

export default function InstructionsPage() {
  const router = useRouter();

  const handleExam = () => {
    router.push("/Exam/userExam");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 flex flex-col relative">

      <div className="w-full bg-white rounded-xl p-4 mt-4 ">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#FF5635]">Instructions</h1>

          <Button
            className="cursor-pointer bg-[#FF5635] hover:bg-[#e34d2e] px-20  py-6 text-2xl text-white font-semibold"
            onClick={handleExam}
          >
            Start Exam
          </Button>
        </div>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">General Instructions</h2>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            <li>Your clock will be set at the server...</li>
            <li>The Question Palette displayed on the right side...</li>
          </ol>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-[#D9D9D9]">{questionIcon}</span>
              <p className="text-sm">You have not visited the question yet.</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#ED3324]">{questionIcon}</span>
              <p className="text-sm">You have not answered the question.</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#4FA77E]">{questionIcon}</span>
              <p className="text-sm">You have answered the question.</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#9555E1]">{questionIcon}</span>
              <p className="text-sm">Marked for review.</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#870051]">{questionIcon}</span>
              <p className="text-sm">
                Answered & Marked for Review will be evaluated.
              </p>
            </div>
          </div>

          <p className="mt-2 text-sm">
            The Marked for Review status simply indicates...{" "}
            <span className="text-[#FF5635]">
              If a question is answered and marked for review, it will be
              evaluated.
            </span>
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Navigating to a Question</h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Click the question number in the Question Palette.</li>
            <li>Click Save & Next to save and go next.</li>
            <li>Click Mark for Review & Next to mark and continue.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Answering a Question</h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>
              Procedure for answering:
              <ul className="list-[lower-alpha] ml-5 space-y-1 mt-1 text-xs">
                <li>Select answer by clicking an option.</li>
                <li>To deselect, click again or use Clear Response.</li>
                <li>To save, click Save & Next.</li>
                <li>Marked answers will still be evaluated.</li>
              </ul>
            </li>
            <li>To change an answer, reopen the question.</li>
            <li>Only saved or marked answers count.</li>
          </ul>
        </section>

        <section className="mb-2">
          <h2 className="text-base font-semibold mb-1">Navigating through sections</h2>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Sections appear on the top bar.</li>
            <li>Section summary appears above the palette.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
