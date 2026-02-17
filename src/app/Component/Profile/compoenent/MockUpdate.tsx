import React from "react";
import { useSelector } from "react-redux";

function MockUpdate() {
  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard
  );

  return (
    <div className="p-6 bg-[#F5F8FF] border-none rounded-[8px] space-y-4 flex-1 flex flex-col max-h-[300px]">
      <h3 className="text-lg font-medium text-[#FF5635] font-poppins">
        Exam Updates
      </h3>

      {/* ✅ Scrollable content */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] lg:max-h-[520px] pr-1">
        {userdashboarddata?.calculatenexkmoxk?.length > 0 ? (
          userdashboarddata.calculatenexkmoxk.map((exam: any, gi: number) => (
            <div
              key={gi}
              className="bg-white py-4 px-3 border-l-4 border-[#FF5635] font-dm-sans"
            >
              {/* Exam Name + Type */}
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-[#FF5635]">
                  {exam?.examType?.examType} {exam?.questionPapername}
                </span>

                {/* Section name if exists */}
                {exam?.sectionDetail?.section && (
                  <span className="text-gray-700 font-medium">
                    ({exam.sectionDetail.section})
                  </span>
                )}
              </div>

              {/* Published Date */}
              <div className="text-xs text-gray-900 font-dm-sans font-medium mt-1">
                Launching on{" "}
                {exam?.publishedDate
                  ? new Date(exam.publishedDate).toLocaleDateString("en-GB")
                  : "—"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 font-dm-sans">
            No upcoming exams
          </div>
        )}
      </div>
    </div>
  );
}

export default MockUpdate;
