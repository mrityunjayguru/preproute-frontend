"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  // handleMarkForReview: () => void;
  handleMarkForAnswerAndReview: () => void;
  handleClearResponse: () => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSubmit: () => void;
  ReportQuestion: () => void;
  isTimeUp: boolean;
  loder: boolean;
}

const FooterActions: React.FC<Props> = ({
  // handleMarkForReview,
  handleClearResponse,
  handlePreviousQuestion,
  handleNextQuestion,
  handleSubmit,
  handleMarkForAnswerAndReview,
  isTimeUp,
  loder,
}) => {
  return (
    <div className="w-full bg-white px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 lg:py-0 bottom-0 left-0 right-0 z-40 border-t">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-3">
        {/* LEFT ACTIONS */}
        <div className="flex gap-2 justify-between lg:justify-start order-2 lg:order-1">
          <Button
            onClick={handleMarkForAnswerAndReview}
            disabled={isTimeUp}
            className="flex-1 lg:flex-none py-2 px-3 sm:px-4 md:px-6 cursor-pointer font-normal text-xs sm:text-sm text-gray-900 font-poppins bg-gradient-to-t from-[#FFECDF] to-white border border-[#E6F4FF]"
          >
            Mark for Review & Next
          </Button>
          <Button
            onClick={handleClearResponse}
            disabled={isTimeUp}
            className="flex-1 lg:flex-none py-2 cursor-pointer px-3 sm:px-4 md:px-6 font-normal text-xs sm:text-sm text-gray-900 font-poppins bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
          >
            Clear Response
          </Button>
        </div>

        {/* CENTER ACTIONS */}
        <div className="flex gap-2 sm:gap-3 font-poppins font-medium justify-between lg:justify-center order-1 lg:order-2">
          <Button
            onClick={handlePreviousQuestion}
            disabled={isTimeUp}
            className="flex-1 lg:flex-none disabled:bg-[#5291D2] rounded-[4px] cursor-pointer py-3 lg:py-4 px-6 sm:px-8 md:px-10 bg-[#005EB6] hover:bg-[#0069d9] text-white flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Previous
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={isTimeUp || loder}
            className="flex-1 lg:flex-none disabled:bg-[#5291D2] rounded-[4px] cursor-pointer py-3 lg:py-4 px-6 sm:px-8 md:px-10 bg-[#005EB6] hover:bg-[#0069d9] text-white flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loder ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save & Next"
            )}
          </Button>
        </div>

        {/* RIGHT ACTION */}
        <div className="flex justify-center items-center flex-shrink-0 order-3 lg:order-3">
          <Button
            onClick={handleSubmit}
            className="w-full lg:w-fit py-3 lg:py-6 px-8 sm:px-10 md:px-12 font-normal text-sm sm:text-md cursor-pointer font-poppins bg-[#00ACEF] hover:bg-[#0095cc] text-white rounded-[4px]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterActions;
