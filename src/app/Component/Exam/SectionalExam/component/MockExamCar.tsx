import Image from "next/image";
import LOCK2 from "@/assets/vectors/lock-2.svg";

const MockExamCard = ({ exam, index, handleExam,selectedExam }: any) => {
  const isUnlocked =
    index === 0 || exam?.previousCompleted || selectedExam?.hasAccess;

  const onClick = () => {
    if (!isUnlocked) return;
    handleExam(exam, exam?.hasGivenExam ? "Resume" : "start", index);
  };

  return (
    <div
      className={`rounded-xl border p-5 transition-all
        ${
          isUnlocked
            ? "bg-white cursor-pointer hover:shadow-md"
            : "bg-gray-100 cursor-not-allowed opacity-70"
        }
      `}
      onClick={onClick}
    >
      <div className="flex justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase">Mock Test</span>
        {!isUnlocked && <Image src={LOCK2} alt="lock" width={18} />}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {exam.questionPapername}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {exam.hasGivenExam ? "Completed" : isUnlocked ? "Unlocked" : "Locked"}
      </p>

      <button
        disabled={!isUnlocked}
        className={`w-full h-10 rounded-lg text-sm font-medium
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
