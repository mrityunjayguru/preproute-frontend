"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import CALENDER from "@/assets/vectors/calendar.svg";
import { AppDispatch } from "@/store/store";
import { getExamBeSectionTypeId } from "@/api/ExamType";

function DailyPratice() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const userdashboarddata =
    useSelector((state: any) => state?.Auth?.userDashboard?.data) || [];
 const contdayly =
    useSelector((state: any) => state?.Auth?.userDashboard) || [];
  /**
   * ✅ Filter ONLY:
   * - Today
   * - examformet === daily practice
   * - isPublished === true
   */
  const todaySections = useMemo(() => {
    if (!Array.isArray(userdashboarddata)) return [];

    const today = new Date().toDateString();

    return userdashboarddata.filter((item: any) => {
      if (!item?.createdAt) return false;

      const itemDate = new Date(item.createdAt).toDateString();

      return (
        itemDate === today &&
        item?.examformet?.toLowerCase() === "daily practice" &&
        item?.isPublished === true &&
        item?.sectionDetail?._id
      );
    });
  }, [userdashboarddata]);

  /**
   * ✅ Start Exam
   */
  const startExam = async (sectionItem: any) => {
    if (!sectionItem?.sectionDetail?._id) return;

    const payload: any = {
      sectionId: sectionItem.sectionDetail._id,
    };

    await dispatch(getExamBeSectionTypeId(payload));
    router.push("/Exam/dailyPractice");
  };

  return (
    <div className="p-6 border-none rounded-[8px] bg-[#EBFAFF] max-h-[300px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-medium text-[#2B5CE7] font-poppins">
          Daily Practice
        </h3>

        <span className="bg-[#2D80FB] text-white text-xs px-6 py-2 rounded-full font-medium tracking-tight whitespace-nowrap">
         {Array.isArray(contdayly?.todaystreakByID)
  ? contdayly.todaystreakByID.length
  : 0}{" "}
Preppers Attempted

        </span>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {userdashboarddata.length > 0 ? (
          userdashboarddata.map((item: any, index: number) => {
            return (
              <div
                key={item?._id || index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                {/* Section Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-lg text-gray-800 mb-1 font-dm-sans">
                    {item?.sectionDetail?.section || "—"}
                  </h4>


{/* 
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 font-dm-sans">
                    <Image
                      src={CALENDER}
                      alt="Calendar"
                      width={16}
                      height={16}
                    />
                    <span>
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "—"}
                    </span>
                  </div> */}
                </div>

                {/* Attempt Button */}
                <Button
                  onClick={() => startExam(item)}
                  className="w-full sm:w-auto bg-[#FF5635] hover:bg-[#FF5635]/90 text-white rounded-lg font-poppins cursor-pointer px-8 py-2 text-base h-auto shadow-sm"
                >
                  Attempt Now
                </Button>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 font-dm-sans">
            No Daily Practice available for today
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyPratice;
