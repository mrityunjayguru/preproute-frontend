import React from "react";
import Image from "next/image";
import FLAME from "@/assets/vectors/flame.svg"
import Anoucement from "./Anoucement";
import { useSelector } from "react-redux";

function DailyStrake() {
      const userdashboarddata = useSelector(
        (state: any) => state?.Auth?.userDashboard,
    );
    
    const todayAttempts =
  userdashboarddata?.attemptcountdailybasis?.[0]?.totalAttempts ?? 0;
  return (
    <div className="md:col-span-6 lg:col-span-4 flex flex-col space-y-6">
      {/* Daily Streaks */}
      <div className="p-6 bg-[#FFF4CF] border-none rounded-2xl flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-[#FF5635] font-poppins">
            Daily Streaks
          </h3>
          <Image src={FLAME} alt="Flame" width={50} height={50} />
        </div>
        <div className="mt-4">
          <div className="text-5xl font-medium text-[#FF5635]">
            {todayAttempts}{""}
            <span className="text-xl font-dm-sans text-gray-900">Days</span>
          </div>
        </div>
      </div>

      {/* Announcements */}
     
<Anoucement/>
    </div>
  );
}

export default DailyStrake;
