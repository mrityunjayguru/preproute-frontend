"use client";
import React from "react";
import { questionIcon } from "@/Common/svgIcon";
import { X } from "lucide-react";

interface InstructionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionPopup({
  isOpen,
  onClose,
}: InstructionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4  right-1 text-3xl cursor-pointer font-bold text-gray-600 hover:text-black"
        >
          <X />
        </button>

        {/* -------------------- SAME UI START -------------------- */}

        <div className="min-h-screen bg-white flex flex-col relative">
          <div className="w-full max-w-full bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#FF5635]">
                Instructions
              </h1>
            </div>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-2">
                General Instructions
              </h2>

              <ol className="list-decimal ml-6 space-y-2 text-base">
                <li>Your clock will be set at the server...</li>
                <li>The Question Palette displayed on the right side...</li>
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-3">
                  <span className="text-[#D9D9D9]">{questionIcon}</span>
                  <p className="text-base">
                    You have not visited the question yet.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#ED3324]">{questionIcon}</span>
                  <p className="text-base">
                    You have not answered the question.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#4FA77E]">{questionIcon}</span>
                  <p className="text-base">You have answered the question.</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#9555E1]">{questionIcon}</span>
                  <p className="text-base">Marked for review.</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#870051]">{questionIcon}</span>
                  <p className="text-base">
                    Answered & Marked for Review will be evaluated.
                  </p>
                </div>
              </div>

              <p className="mt-3 text-base">
                The Marked for Review status simply indicates...
                <span className="text-[#FF5635]">
                  {" "}
                  If a question is answered and marked for review, it will be
                  evaluated.
                </span>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-2">
                Navigating to a Question
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-base">
                <li>Click the question number in the Question Palette.</li>
                <li>Click Save & Next to save and go next.</li>
                <li>Click Mark for Review & Next to mark and continue.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-2">
                Answering a Question
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-base">
                <li>
                  Procedure for answering:
                  <ul className="list-[lower-alpha] ml-6 space-y-1 mt-1 text-sm">
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

            <section>
              <h2 className="text-lg font-semibold mb-2">
                Navigating through sections
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-base">
                <li>Sections appear on the top bar.</li>
                <li>Section summary appears above the palette.</li>
              </ul>
            </section>
          </div>
        </div>

        {/* -------------------- SAME UI END -------------------- */}
      </div>
    </div>
  );
}
