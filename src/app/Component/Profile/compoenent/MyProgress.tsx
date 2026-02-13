"use client";

import Image from "next/image";

import STUDENT from "@/assets/vectors/student.svg";
import { useSelector } from "react-redux";

function MyProgress() {
  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard,
  );
  console.log(userdashboarddata?.attemptcountdailybasis[0]?.totalAttempts)
  return (
    <div className="px-6 py-2.5 bg-[#EAF8EC] border-none rounded-[8px] flex flex-col h-full">
      <div className=" flex justify-between items-start mb-4">
        <div className="">
          <h3 className="text-xl font-medium text-[#FF5635] font-poppins">
            My Progress
          </h3>
          <p className="text-sm text-gray-500 font-medium font-dm-sans">
            You're Among the Top
          </p>
        </div>
        <div className="">
          <Image src={STUDENT} alt="Student" width={50} height={50} />
        </div>
      </div>
      <div className="mt-4 xs:mt-8">
        <div className="flex items-baseline gap-1 font-poppins">
          <span className="text-4xl xs:text-5xl font-medium text-[#FF5635]">{userdashboarddata?.result1?.percentile}%</span>
          <span className="text-sm font-semibold text-gray-900">Preppers</span>
        </div>
      </div>
    </div>
  );
}

export default MyProgress;
