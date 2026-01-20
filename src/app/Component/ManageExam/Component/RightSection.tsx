
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StatusIndicators from "./StatusIndicators";

import NOTVISITED from "@/assets/vectors/perticulerExam/not-visited.svg";
import ANSWERED from "@/assets/vectors/perticulerExam/answered.svg";
import UNANSWERED from "@/assets/vectors/perticulerExam/unaswered.svg";
import REVIEWMARKED from "@/assets/vectors/perticulerExam/reviewmarked.svg";
import ANSWEREDANDREVIEW from "@/assets/vectors/perticulerExam/answeredAndReviewMarked.svg";
import USERPROFILE from "@/assets/vectors/user-profile.svg";

interface Props {
  userLogin: any;
  totalNoOfQuestions: number;
  currentStatus: Record<number, string>;
  currentQuestionIndex: number;
  getQuestionByNumberId: (idx: number) => void;
  isSection: boolean;
  //  handleSubmit: () => void;
  selectedSection: any;
  isTimeUp: boolean;
}

const RightSection: React.FC<Props> = ({
  userLogin,
  totalNoOfQuestions,
  currentStatus,
  currentQuestionIndex,
  // handleSubmit,
  getQuestionByNumberId,
  isSection,
  selectedSection,
  isTimeUp,
}) => {
  // Split username into two lines
  const splitName = (name: string) => {
    if (!name) return { first: "User", second: "" };
    const parts = name.split(" ");
    if (parts.length > 1) {
      const mid = Math.ceil(parts.length / 2);
      return {
        first: parts.slice(0, mid).join(" "),
        second: parts.slice(mid).join(" "),
      };
    }
    return { first: name, second: "" };
  };

  const nameParts = splitName(userLogin?.username || "User");

  const sectionName = isSection
    ? selectedSection?.sectionDetail?.section ||
    selectedSection?.currentSection?.sectionName ||
    "Section"
    : "Question Palette";

  const [imageError, setImageError] = useState(false);

  const userImageUrl = userLogin?.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL || ""}${userLogin.image}`
    : null;

  return (
    <div
      className="
       lg:w-1/6
  w-full
  flex flex-col
  font-semibold
  flex-shrink-0
  mr-0 lg:mr-4
  mt-6 lg:mt-0
  h-[74vh] 
  sm:h-screen
  lg:h-[76vh]
      "
    >
      {/* ================= USER PROFILE ================= */}
      <div className="bg-[#F9FAFC] rounded-[8px] border border-[#E6F4FF] flex-shrink-0">
        {userLogin && (
          <>
            <div className="flex items-center bg-[#F9FAFC] p-2 rounded-[8px]">
              <div className="rounded-[8px] flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden bg-gray-100 w-16 h-16">
                {userImageUrl && !imageError ? (
                  <Image
                    src={userImageUrl}
                    alt={userLogin?.username || "User"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Image
                    src={USERPROFILE}
                    alt="User Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex flex-col text-lg lg:text-xl font-poppins">
                <span className="font-medium text-gray-900 leading-tight">
                  {nameParts.first}
                </span>
                {nameParts.second && (
                  <span className="font-medium text-gray-900 leading-tight">
                    {nameParts.second}
                  </span>
                )}
              </div>
            </div>

            <div className="px-2 pb-2">
              <StatusIndicators />
            </div>
          </>
        )}
      </div>

      {/* ================= QUESTION PALETTE ================= */}
      <div
        className="
        mt-2
    rounded-[8px]
    border
    bg-[#F9FAFC]
    border-[#C8DCFE]
    flex flex-col
    flex-1
    overflow-hidden
        "
      >
        {/* Header */}
        <div className="bg-[#005EB6] text-white py-2 px-2 rounded-t-[8px] flex-shrink-0">
          <h3 className="text-md font-normal font-dm-sans">{sectionName}</h3>
        </div>

        <p className="text-sm text-gray-700 px-3 py-2 font-poppins font-normal flex-shrink-0">
          Choose an option
        </p>

        {/* ================= SCROLLABLE GRID ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-3 pb-3 ">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {Array.from({ length: totalNoOfQuestions }, (_, idx) => {
              const status = currentStatus[idx];
                // console.log(status,"statusstatus")
              const isAnswered =
                status === "answered" || status === "answered-review";
              const isReview =
                status === "review" || status === "answered-review";
              const isAnsweredAndReview = status === "reviewAndAnswer";
              const isVisited =
                status === "visited" ||
                (idx === currentQuestionIndex && !status);

              let iconSrc = NOTVISITED;
              if (isAnsweredAndReview) iconSrc = ANSWEREDANDREVIEW;
              else if (isReview && !isAnswered) iconSrc = REVIEWMARKED;
              else if (isAnswered && !isReview) iconSrc = ANSWERED;
              else if (isVisited) iconSrc = UNANSWERED;

              return (
                <button
                  key={idx}
                  onClick={() => getQuestionByNumberId(idx)}
                  disabled={isTimeUp}
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    aspect-square
                    font-bold
                    transition
                    hover:opacity-80
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <Image
                    src={iconSrc}
                    alt={`Question ${idx + 1}`}
                    width={34}
                    height={34}
                    className="w-full h-full object-contain"
                  />

                  <span
                    className="absolute inset-0 flex items-center justify-center text-sm font-medium font-poppins"
                    style={{
                      color: iconSrc === NOTVISITED ? "#000000" : "#FFFFFF",
                    }}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
      {/* <div className="mt-6 flex justify-center px-3 pb-4 items-center flex-shrink-0">
       <Button
          onClick={handleSubmit}
          className="w-fit py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-12 font-normal text-sm sm:text-md cursor-pointer font-poppins bg-[#00ACEF] hover:bg-[#0095cc] text-white rounded-[4px]"
        >
          Submit Exam
        </Button>
        </div> */}
    </div>
  );
};

export default RightSection;
