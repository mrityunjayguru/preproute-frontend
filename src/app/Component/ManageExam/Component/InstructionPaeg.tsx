"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questionIcon } from "@/Common/svgIcon";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Footer } from "@/Layout/Footer";

export default function InstructionsPage() {
  const router = useRouter();

  const handleExam = () => {
    router.push("/Exam/userExam");
  };

  return (
    <div className="px-3 sm:px-6  flex flex-col gap-10">
      {/* MAIN CARD */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-28">
        <header
          className={`sticky font-dm-sans  top-0 z-20 w-full bg-white font-DM_Sans`}
        >
          <div className="mx-auto flex items-center justify-between gap-4 py24 lg:py-5">
            {/* Left: Logo */}
            <div className="flex items-center gap-12">
              <div
                className="cursor-pointer"
                onClick={() => router.push("/home")}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </header>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl   font-poppins text-black">
            Instructions
          </h1>

          <Button
            onClick={handleExam}
            className="bg-[#FF5635] font-poppins hover:bg-[#e34d2e] text-white 
                       px-8 sm:px-12 py-5 font-thin text-sm md:text-xl cursor-pointer 
                       rounded-full  self-start sm:self-auto"
          >
            Start Exam
          </Button>
        </div>

        {/* GENERAL INSTRUCTIONS */}
        <section className="mb-2">
          <h2 className="text-sm sm:text-base md:text-md font-poppins text-black">
            General Instructions
          </h2>

          <ol className="list-decimal font-dm-sans ml-4 space-y-1 text-xs sm:text-sm md:text-sm text-gray-700">
            <li>
            Your clock will be set at the server. The countdown timer at the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.
            </li>
            <li>
            The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:

            </li>
          </ol>

          {/* STATUS LEGEND */}
          <div className="grid font-dm-sans grid-cols-1 sm:grid-cols-2 lg:grid-rows-3 gap-3 mt-2">
            {[
              ["#D9D9D9", "You have not visited the question yet."],
              ["#ED3324", "You have not answered the question."],
              ["#4FA77E", "You have answered the question."], 
              ["#9555E1", "You have NOT answered but marked for review."],
              ["#870051", "Answered & Marked for Review will be evaluated."],
            ].map(([color, text], i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#f8fbff] rounded-lg px-3 py-1"
              >
                <span style={{ color }}>{questionIcon}</span>
                <p className="text-xs sm:text-sm md:text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>

          <p className="mt-1 text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans max-w-7xl ">
          The Marked for Review status for a question simply indicates that you would like to look at that question again.{" "}
            <span className="text-[#FF5635] font-medium">
            If a question is answered, but Marked for Review, then the answer will be considered for evaluation unless the status is modified by the candidate..
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
            
            <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
            <li>Click on Save & Next to save your answer for the current question and then go to the next question.</li>
            <li>Click on Mark for Review & Next to save your answer for the current question,mark it for review, and then go to the next question.</li>
          </ul>

        {/* ANSWERING */}
        
          <h2 className="text-sm sm:text-base md:text-lg  text-black font-poppins">
            Answering a Question
          </h2>
          <span className="font-dm-snas">Procedure for answering a multiple choice type question:</span>
          <ul className="list-disc ml-4 space-y-2 text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans">
            <li>
              <ul className="list-[lower-alpha] ml-5 mt-1 space-y-1 text-xs sm:text-xs md:text-sm">
                <li>To select your answer, click on the button of one of the options.</li>
                <li>To deselect your chosen answer, click on the bubble of the chosen option again or click on the Clear Response button.</li>
                <li>To change your chosen answer, click on the bubble of another option.</li>
                <li>To save your answer, you MUST click on the Save & Next button.</li>
                <li>To mark the question for review, click on the Mark for Review & Next button.If an answer is selected for a question that is Marked for Review, that answer will be considered in the evaluation.</li>
              </ul>
            </li>
            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
            <li>Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation.</li>
          </ul>
        </section>

        {/* SECTIONS */}
        <section className="">
          <h2 className="text-sm sm:text-base  md:text-lg  text-black mb-1 font-poppins">
            Navigating through sections
          </h2>
          <ul className="list-disc ml-4 space-y-1  text-xs sm:text-sm md:text-sm text-gray-700 font-dm-sans">
            <li>Sections in this question paper are displayed on the top bar of the screen.</li>
            <li>Candidates can view the corresponding section summary as part of the legend that appears in every section above the question palette.</li>
          </ul>
        </section>
      </div>
    <Footer/>
    
    </div>
  );
}
