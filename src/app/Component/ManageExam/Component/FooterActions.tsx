"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  handleMarkForReview: () => void;
  handleClearResponse: () => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSubmit: () => void;
  isTimeUp: boolean;
}

const FooterActions: React.FC<Props> = ({
  handleMarkForReview,
  handleClearResponse,
  handlePreviousQuestion,
  handleNextQuestion,
  handleSubmit,
  isTimeUp,
}) => (
  <footer className="bg-white p-4 shadow-md flex flex-wrap gap-2 justify-between sticky bottom-0">
    <div className="flex gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={handleMarkForReview} disabled={isTimeUp}>
        Mark for Review & Next
      </Button>
      <Button variant="outline" size="sm" onClick={handleClearResponse} disabled={isTimeUp}>
        Clear Response
      </Button>
    </div>
    <div className="flex gap-2 flex-wrap">
      <Button variant="secondary" onClick={handlePreviousQuestion} disabled={isTimeUp}>
        Previous
      </Button>
      <Button onClick={handleNextQuestion} disabled={isTimeUp}>
        Save & Next
      </Button>
    </div>
    <Button
      onClick={handleSubmit}
      variant="destructive"
      size="lg"
      className="w-full sm:w-auto"
    >
      Submit
    </Button>
  </footer>
);

export default FooterActions;
