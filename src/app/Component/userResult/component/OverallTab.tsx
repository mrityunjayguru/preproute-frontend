import Image from "next/image";
import BriefTab from "./BriefTab";

import TROPHY from "@/assets/vectors/reportanalytics/kpis/cup.svg";
import AIM from "@/assets/vectors/reportanalytics/kpis/target.svg";
import PERCENTAGE from "@/assets/vectors/reportanalytics/kpis/percentage.svg";
import DISCOUNT from "@/assets/vectors/reportanalytics/kpis/discount.svg";

interface OverallTabProps {
  data: any;
}

const OverallTab = ({ data }: OverallTabProps) => {
  return (
    <div className="w-full space-y-6 px-28">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex  justify-between flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium font-dm-sans">
              Score
            </span>
            <Image src={TROPHY} alt="trophy" width={24} height={24} />
          </div>
          <p className="text-[28px] font-normal font-dm-sans text-[#FF5635]">
            {data?.totalMarks || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex  justify-between flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium font-dm-sans">
              Accuracy
            </span>
            <Image src={AIM} alt="trophy" width={24} height={24} />
          </div>
          <p className="text-[28px] font-normal font-dm-sans text-[#FF5635]">
            {data?.accuracy || "0%"}
          </p>
        </div>

        <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex  justify-between flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium font-dm-sans">
              Percentage
            </span>

            <Image src={DISCOUNT} alt="trophy" width={24} height={24} />
          </div>
          <p className="text-[28px] font-normal font-dm-sans text-[#FF5635]">
            {data?.percentage || "0%"}
          </p>
        </div>

        <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex  justify-between flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium font-dm-sans">
              Percentile
            </span>
            <Image src={PERCENTAGE} alt="trophy" width={24} height={24} />
          </div>
          <p className="text-[28px] font-normal font-dm-sans text-[#FF5635]">
            {data?.percentile ? `${data.percentile}%ile` : "0%ile"}
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-blue-600 font-medium font-dm-sans">Attempted</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.attempted || 0} out of {data?.totalQuestions || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-blue-600 font-medium font-dm-sans">Correct</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.correct || 0} out of {data?.attempted || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-blue-600 font-medium font-dm-sans">Incorrect</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.wrong || 0} out of {data?.attempted || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-blue-600 font-medium font-dm-sans">
            Avg. Time/Question
          </p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.avgTimePerQuestion || "1 Min 26 Sec"}
          </p>
        </div>
      </div>

      <BriefTab data={data} />
    </div>
  );
};

export default OverallTab;
