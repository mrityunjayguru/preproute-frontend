"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import StatusIndicators from "./StatusIndicators";
import { circleShape, pentagonShape, statusColors } from "./style";

interface Props {
  userLogin: any;
  totalNoOfQuestions: number;
  currentStatus: Record<number, string>;
  currentQuestionIndex: number;
  getQuestionByNumberId: (idx: number) => void;
  isSection: boolean;
  selectedSection: any;
  isTimeUp: boolean;
}

const RightSection: React.FC<Props> = ({
  userLogin,
  totalNoOfQuestions,
  currentStatus,
  currentQuestionIndex,
  getQuestionByNumberId,
  isSection,
  selectedSection,
  isTimeUp,
}) => {
  return (
    <aside className="lg:w-1/4 w-full bg-white font-semibold p-4 border-t lg:border-t-0 lg:border-l flex-shrink-0">
      {userLogin?(
         
     <>
     User Profile
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-white text-2xl">
          {userLogin?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <p className="font-semibold text-center">{userLogin?.username || "User"}</p>
      </div>

      {/* Status Indicators */}
      <div className="mb-4">
        <StatusIndicators />
      </div>
     </>
      ):(null)}
     

      {/* Question Palette */}
      <h3 className="text-sm font-bold text-gray-500 mb-2">
        Question Palette {isSection ? `(${selectedSection?.sectionDetail?.section})` : ""}
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {Array.from({ length: totalNoOfQuestions }, (_, idx) => {
          let bgColor = statusColors.notVisited;
          let shapeStyle: any = pentagonShape;

          if (currentStatus[idx] === "answered") bgColor = statusColors.answered;
          else if (currentStatus[idx] === "review") {
            bgColor = statusColors.review;
            shapeStyle = pentagonShape;
          } else if (idx === currentQuestionIndex) bgColor = statusColors.visited;
          else if (currentStatus[idx] === "visited") bgColor = statusColors.visited;

          return (
            <Button
              key={idx}
              onClick={() => getQuestionByNumberId(idx)}
              size="sm"
              className="cursor-pointer w-10 h-10 font-bold text-white border-none flex items-center justify-center"
              style={{ backgroundColor: bgColor, ...shapeStyle }}
              disabled={isTimeUp}
            >
              {idx + 1}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default RightSection;
