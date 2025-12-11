"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  handleMarkForReview: () => void;
  handleClearResponse: () => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSubmit: () => void;
  ReportQuestion: () => void;
  isTimeUp: boolean;
  loder:boolean
}

const 
FooterActions: React.FC<Props> = ({
  handleMarkForReview,
  handleClearResponse,
  handlePreviousQuestion,
  handleNextQuestion,
  handleSubmit,
  ReportQuestion,
  isTimeUp,
  loder
}
) => (
  <footer className="bg-white p-4  flex flex-wrap gap-2 justify-between sticky bottom-0">
    <div className="flex gap-2 flex-wrap">
      <Button variant="outline" size="sm" 
  
      onClick={handleMarkForReview} disabled={isTimeUp}>
        Mark for Review & Next
      </Button>
      <Button variant="outline" size="sm" onClick={handleClearResponse} disabled={isTimeUp}>
        Clear Response
      </Button>
      {/* <Button variant="outline" size="sm" onClick={ReportQuestion} >
        Report
      </Button> */}
    </div>
    <div className="flex gap-4 flex-wrap ">
      <Button variant="secondary" onClick={handlePreviousQuestion} disabled={isTimeUp}
      className="bg-white text-black  border border-gray-200 text-lg font-semibold p-5"
      >
        Previous
      </Button>
     <Button
        onClick={handleNextQuestion}
        disabled={isTimeUp || loder}
        className="flex items-center gap-4 p-5 text-lg font-semibold bg-[#007bff]"
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
    <Button
      onClick={handleSubmit}
      variant="destructive"
      size="lg"
      className="  px-15 py-2 bg-[#FF5635]   "
    ><div
    className="font-semibold text-xl "
    >Submit</div>
    
    </Button>
  </footer>
);

export default FooterActions;
