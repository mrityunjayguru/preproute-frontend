import Image from "next/image";
import LOCK2 from "@/assets/vectors/lock-2.svg";
import { capitalizeWords } from "@/Utils/Cappital";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MockExamCard = ({ exam, index, handleExam, selectedExam }: any) => {
  const router = useRouter();

  // ✅ Proper Unlock Check (Safe + Clean)
  const isUnlocked = Boolean(
    selectedExam?.OrderDetail?.[0]?.planMatch?.[0]?.features?.sectional
  );

  const isAttempted = exam?.hasGivenExam;

  const isInProgress =
    isAttempted && exam?.userSummary?.target === 0;

  const isCompleted =
    isAttempted && exam?.userSummary?.target === 100;

  // ✅ Card Click
  const onClick = () => {
    if (!isUnlocked) {
      router.push("/PlanandPricing");
      return;
    }

    handleExam(exam, exam?.hasGivenExam ? "Resume" : "start", index);
  };

  return (
    <div
      className="rounded-[8px] my-5 bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] p-4 sm:p-5 lg:p-6 
                 flex flex-col transition-all"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase">
          Sectional Test
        </span>
        {!isUnlocked && (
          <Image src={LOCK2} alt="lock" width={18} />
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">
        {capitalizeWords(exam?.questionPapername)}
      </h3>

      {/* Status Text */}
      <p className="text-sm text-gray-500 mb-4">
        {!isAttempted
          ? isUnlocked
            ? "Unlocked"
            : "Locked"
          : ""}
      </p>

      {/* Footer Buttons */}
      <div className="mt-auto w-full font-poppins">
        {!isUnlocked ? (
          // 🔒 LOCKED STATE
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/PlanandPricing");
            }}
            className="px-10 h-11 rounded-[8px] bg-[#E3E5E9] text-[#ADB5CC] cursor-not-allowed font-poppins"
          >
            Start
          </Button>
        ) : isCompleted ? (
          // ✅ COMPLETED → RESULT
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleExam(exam);
            }}
            className="border border-[#FF5635] text-[#FF5635] 
                       hover:bg-[#FF5635] hover:text-white transition cursor-pointer font-poppins"
          >
            Result and Analysis
          </Button>
        ) : isInProgress ? (
          // 🔄 IN PROGRESS → RESUME + RESTART
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#FF5635] text-white 
                         hover:bg-black transition cursor-pointer font-poppins"
              onClick={(e) => {
                e.stopPropagation();
                handleExam(exam, "Resume");
              }}
            >
              Resume
            </Button>

            <Button
              className="flex-1 bg-black text-white 
                         hover:bg-[#FF5635] transition cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleExam(exam, "start");
              }}
            >
              Restart
            </Button>
          </div>
        ) : (
          // ▶️ NOT ATTEMPTED → START
          <Button
            className="px-10 h-11 rounded-[8px] 
                       bg-[#FF5635] text-white 
                       hover:bg-black transition cursor-pointer font-poppins"
            onClick={(e) => {
              e.stopPropagation();
              handleExam(exam, "start", index);
            }}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default MockExamCard;