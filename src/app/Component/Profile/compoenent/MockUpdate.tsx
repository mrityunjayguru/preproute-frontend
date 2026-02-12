import React from "react";
import { useSelector } from "react-redux";

function MockUpdate() {
  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard
  );

  return (
    <div className="p-6 bg-[#F5F8FF] border-none rounded-2xl h-[335px] space-y-4 flex-1 flex flex-col">
      <h3 className="text-lg font-medium text-[#FF5635] font-poppins">
        Exam Updates
      </h3>

      {/* ✅ max height + scroll added */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] lg:max-h-[520px] pr-1">
        {userdashboarddata?.calculatenexkmoxk?.length > 0 ? (
          userdashboarddata.calculatenexkmoxk.map((group: any, gi: any) =>
            group?.exams?.map((exam: any, i: any) => (
              <div
                key={`${gi}-${i}`}
                className="bg-white py-4 px-3 border-l-4 border-[#FF5635] font-dm-sans"
              >
                <div className="flex items-center gap-1 font-bold text-sm">
                  <span className="text-[#FF5635]">
                    {exam?.examname} {exam?.subjectName}
                  </span>
                  <span className="text-gray-800">
                    {exam?.questionPapername || "Mock"}
                  </span>
                </div>

                <div className="text-xs text-gray-900 font-dm-sans font-medium">
                  Launching on{" "}
                  {exam?.mockDate
                    ? new Date(exam.mockDate).toLocaleDateString("en-GB")
                    : "—"}
                </div>
              </div>
            ))
          )
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
