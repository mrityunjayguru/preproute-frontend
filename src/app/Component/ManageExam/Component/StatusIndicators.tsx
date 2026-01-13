import React from "react";
import Image from "next/image";
import NOTVISITED from "@/assets/vectors/perticulerExam/not-visited.svg";
import ANSWERED from "@/assets/vectors/perticulerExam/answered.svg";
import UNANSWERED from "@/assets/vectors/perticulerExam/unaswered.svg";
import REVIEWMARKED from "@/assets/vectors/perticulerExam/reviewmarked.svg";
import ANSWEREDANDREVIEW from "@/assets/vectors/perticulerExam/answeredAndReviewMarked.svg";

const Indicator = ({ icon, label }: any) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        <Image src={icon} alt={label} width={40} height={40} />
      </div>
      <span className="text-[10px] font-poppins font-normal text-gray-800">{label}</span>
    </div>
  );
};

const StatusIndicators = () => {
  const indicatorsData = [
    { 
      icon: NOTVISITED,
      label: "Not Visited"
    },
    { 
      icon: ANSWERED,
      label: "Answered"
    },
    { 
      icon: UNANSWERED,
      label: "Unanswered"
    },
    { 
      icon: REVIEWMARKED,
      label: "Review Marked"
    },
    { 
      icon: ANSWEREDANDREVIEW,
      label: "Answered and Review Marked"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {indicatorsData.map((item, index) => (
        <Indicator key={index} {...item} />
      ))}
    </div>
  );
};

export default StatusIndicators;
