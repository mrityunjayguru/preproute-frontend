"use client";
import React from "react";
import { questionIcon } from "@/Common/svgIcon";
import { X } from "lucide-react";
import Instruction from "@/app/instructions/page";
import NOTVISITED from "@/assets/vectors/instruction/not-visted.svg";
import NOTANSWERED from "@/assets/vectors/instruction/not-answred.svg";
import ANSWERED from "@/assets/vectors/instruction/answred.svg";
import REVIEW from "@/assets/vectors/instruction/review.svg";
import NOTREVIEW from "@/assets/vectors/instruction/not-review.svg";
import Image from "next/image";

interface InstructionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

      const NotVisitedIcon = () => <Image src={NOTVISITED} alt="notvisted" />;

      const NotAnsweredIcon = () => <Image src={NOTANSWERED} alt="notvisted" />;
      
      const AnsweredIcon = () => <Image src={ANSWERED} alt="answered" />;
      
      const NotAnsweredMarkedIcon = () => <Image src={REVIEW} alt="answered" />;
      
      const AnsweredMarkedIcon = () => (
        <Image src={NOTREVIEW } alt="answered" />
      );

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
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
        >
          <X />
        </button>

        {/* -------------------- SAME UI START -------------------- */}

        <div className="px-3 sm:px-6  flex flex-col gap-10">
      {/* MAIN CARD */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-28">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl   font-poppins text-black">
            Instructions
          </h1>
        </div>

        {/* GENERAL INSTRUCTIONS */}
        <section className="mb-2">
          <h2 className="text-sm sm:text-base md:text-md font-poppins text-black">
            General Instructions
          </h2>

          <ol className="list-decimal font-dm-sans ml-4 space-y-1 text-xs sm:text-sm md:text-sm text-gray-700">
            <li>
              Your clock will be set at the server. The countdown timer at the
              top right corner of the screen will display the remaining time
              available for you to complete the examination. When the timer
              reaches zero, the examination will end by itself. You need not
              terminate the examination or submit your paper.
            </li>
            <li>
              The Question Palette displayed on the right side of screen will
              show the status of each question using one of the following
              symbols:
            </li>
          </ol>

          {/* STATUS LEGEND */}
          <div className="grid font-dm-sans grid-cols-1 sm:grid-cols-2 lg:grid-rows-3 gap-3 mt-2">
            <div className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1">
              <NotVisitedIcon />
              <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                You have not visited the question yet.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1">
            <NotAnsweredMarkedIcon />
              <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                You have NOT answered the question, but have marked the question
                for review.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1">
              
              <NotAnsweredIcon />
              <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                You have not answered the question.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1">
            
              <AnsweredMarkedIcon />
              <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                The question(s) "Answered and Marked for Review" will be
                considered for evaluation.
              </p>
              
            </div>
            <div className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1">
            <AnsweredIcon />
              <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                You have answered the question.
              </p>
            </div>
          </div>

          <p className="mt-1 text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans max-w-7xl ">
            The Marked for Review status for a question simply indicates that
            you would like to look at that question again.{" "}
            <span className="text-[#FF5635] font-medium">
              If a question is answered, but Marked for Review, then the answer
              will be considered for evaluation unless the status is modified by
              the candidate..
            </span>
          </p>
        </section>
        <section className="">
          {/* NAVIGATION */}
          <h2 className="text-sm sm:text-base md:text-md  text-black font-poppins">
            Navigating to a Question
          </h2>
          <span className="font-dm-snas">
            To answer a question, do the following:
          </span>
          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans">
            <li>
              Click on the question number in the Question Palette at the right
              of your screen to go to that numbered question directly. Note that
              using this option does NOT save your answer to the current
              question.
            </li>
            <li>
              Click on Save & Next to save your answer for the current question
              and then go to the next question.
            </li>
            <li>
              Click on Mark for Review & Next to save your answer for the
              current question,mark it for review, and then go to the next
              question.
            </li>
          </ul>

          {/* ANSWERING */}

          <h2 className="text-sm sm:text-base md:text-lg  text-black font-poppins">
            Answering a Question
          </h2>
          <span className="font-dm-snas">
            Procedure for answering a multiple choice type question:
          </span>
          <ul className="list-disc ml-4 space-y-2 text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans">
            <li>
              <ul className="list-[lower-alpha] ml-5 mt-1 space-y-1 text-xs sm:text-xs md:text-sm">
                <li>
                  To select your answer, click on the button of one of the
                  options.
                </li>
                <li>
                  To deselect your chosen answer, click on the bubble of the
                  chosen option again or click on the Clear Response button.
                </li>
                <li>
                  To change your chosen answer, click on the bubble of another
                  option.
                </li>
                <li>
                  To save your answer, you MUST click on the Save & Next button.
                </li>
                <li>
                  To mark the question for review, click on the Mark for Review
                  & Next button.If an answer is selected for a question that is
                  Marked for Review, that answer will be considered in the
                  evaluation.
                </li>
              </ul>
            </li>
            <li>
              To change your answer to a question that has already been
              answered, first select that question for answering and then follow
              the procedure for answering that type of question.
            </li>
            <li>
              Note that ONLY Questions for which answers are saved or marked for
              review after answering will be considered for evaluation.
            </li>
          </ul>
        </section>

        {/* SECTIONS */}
        <section className="">
          <h2 className="text-sm sm:text-base  md:text-lg  text-black mb-1 font-poppins">
            Navigating through sections
          </h2>
          <ul className="list-disc ml-4 space-y-1  text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans">
            <li>
              Sections in this question paper are displayed on the top bar of
              the screen.
            </li>
            <li>
              Candidates can view the corresponding section summary as part of
              the legend that appears in every section above the question
              palette.
            </li>
          </ul>
        </section>
      </div>
    </div>

        {/* -------------------- SAME UI END -------------------- */}
      </div>
    </div>
  );
}
