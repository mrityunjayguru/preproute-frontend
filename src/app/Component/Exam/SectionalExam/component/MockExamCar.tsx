import Image from "next/image";
import LOCK2 from "@/assets/vectors/lock-2.svg";
import { capitalizeWords } from "@/Utils/Cappital";

const MockExamCard = ({ exam, index, handleExam,selectedExam }: any) => {
  const isUnlocked =
     exam?.previousCompleted || selectedExam?.hasAccess;

  const onClick = () => {
    if (!isUnlocked) return;
    handleExam(exam, exam?.hasGivenExam ? "Resume" : "start", index);
  };

  return (
    <div
      className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 
                 flex flex-col transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase">Mock Test</span>
        {!isUnlocked && <Image src={LOCK2} alt="lock" width={18} />}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {capitalizeWords(exam.questionPapername)}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {exam.hasGivenExam ? "Completed" : isUnlocked ? "Unlocked" : "Locked"}
      </p>

      <button
        disabled={!isUnlocked}
        className={`w-full h-10 cursor-pointer rounded-lg text-sm font-medium
          ${
            isUnlocked
              ? "bg-[#FF5635] text-white hover:bg-[#e34d2d]"
              : "bg-gray-300 text-gray-600"
          }
        `}
      >
        {exam.hasGivenExam ? "View Result" : "Start Exam"}
      </button>
    </div>
  );
};

export default MockExamCard;
