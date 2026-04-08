import { formatMinutesSeconds } from '@/Utils/Cappital';
import React, { useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function SectionTimeAnllysisGraph({ data }: any) {

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const totalTimeTakenSeconds = useMemo(() => {
    return (data?.sectionWise || []).reduce(
      (acc: number, val: any) => acc + (val.totalTime || 0),
      0
    );
  }, [data]);

  const sectionTime = useMemo(() => {
    const sections = Array.isArray(data?.sectionWise) ? data.sectionWise : [];
    const examSections = Array.isArray(data?.examdetail?.sections)
      ? data.examdetail.sections
      : [];

    const COLORS = ["#FF8B00", "#00B8D9", "#6D5DFB"];

    const durationMap: Record<string, number> = {};
    examSections.forEach((s: any) => {
      if (s.sectionId) durationMap[s.sectionId] = Number(s.duration || 0);
    });

    const totalExamDuration = Number(data?.examdetail?.fullExamduration || 0);

    const items = sections.map((s: any, idx: number) => {
      const seconds = s.totalTime || 0;
      const totalDurationSec = (durationMap[s.sectionId] || 0) * 60;

      return {
        sectionId: s.sectionId,
        name: s.sectionName,
        seconds,
        minutes: formatMinutesSeconds(seconds),
        totalDuration: formatMinutesSeconds(totalDurationSec),
        fill: COLORS[idx % COLORS.length],
      };
    });

    // ✅ FIXED PIE
    const pie = (() => {
      if (!totalExamDuration) return [];

      if (selectedSection) {
        const selected = items.find((i: any) => i.name === selectedSection);

        const selectedMinutes = selected ? selected.seconds / 60 : 0;
        const remaining = Math.max(0, totalExamDuration - selectedMinutes);

        return [
          {
            name: selectedSection,
            value: selectedMinutes,
            fill: selected?.fill || "#FF8B00",
          },
          {
            name: "Remaining",
            value: remaining,
            fill: "#E5E7EB",
          },
        ];
      }

      return items.map((i: any) => ({
        name: i.name,
        value: i.seconds / 60,
        fill: i.fill,
      }));
    })();

    return {
      overallMinutes: totalTimeTakenSeconds / 60,
      totalExamDuration,
      items,
      pie,
    };
  }, [data, totalTimeTakenSeconds, selectedSection]);

  const start = new Date(data?.fullExamStartTime).getTime();
  const end = new Date(data?.fullExamEndTime).getTime();
  const spentMinutes = ((end - start) / 60000).toFixed(2);

  return (
    <div>
      <div className="rounded-[8px] bg-white border border-[#E6F4FF] p-3 sm:p-6">
        <div className="flex items-center justify-between mb-4 font-poppins">
          <h3 className="text-lg font-medium text-[#005EB6]">
            Time Analysis{" "}
            <span className="text-xs text-black font-normal">(in mins)</span>
          </h3>
        </div>

        {sectionTime.pie.length === 0 ? (
          <div className="text-sm text-gray-500 font-dm-sans">
            No time data found.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 items-center">
            <div className="space-y-4">

              {/* Overall */}
              <div
                className="border-b border-gray-100 pb-2 cursor-pointer"
                onClick={() => setSelectedSection(null)}
              >
                <div className="text-xs text-black font-dm-sans mb-1">
                  Overall Exam
                </div>

                <div
                  className="text-2xl font-bold font-dm-sans"
                  style={{
                    color: "#005EB6",
                    opacity: selectedSection ? 0.5 : 1,
                    transform: !selectedSection ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {spentMinutes}/
                  <span className="text-[#000]">
                    {data?.examdetail?.fullExamduration}
                  </span>
                </div>
              </div>

              {/* Sections */}
              {sectionTime.items.slice(0, 4).map((s) => (
                <div
                  key={s.name}
                  className="border-b border-gray-100 pb-2 last:border-0 cursor-pointer"
                  onClick={() =>
                    setSelectedSection((prev) =>
                      prev === s.name ? null : s.name
                    )
                  }
                >
                  <div className="text-xs text-black font-dm-sans mb-1">
                    {s.name}
                  </div>

                  <div
                    className="text-xl font-bold font-dm-sans"
                    style={{
                      color: sectionTime.items.find(
                        (p) => p.name === s.name
                      )?.fill,
                      opacity:
                        selectedSection && selectedSection !== s.name
                          ? 0.4
                          : 1,
                      transform:
                        selectedSection === s.name ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {s.minutes}
                  </div>
                </div>
              ))}
            </div>

            {/* Graph */}
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectionTime.pie}
                    dataKey="value"
                    innerRadius={35}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                  >
                    {sectionTime.pie.map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>

                  <Pie
                    data={[
                      { value: sectionTime.overallMinutes, fill: "#0B5FFF" },
                      {
                        value: Math.max(
                          0,
                          sectionTime.totalExamDuration - sectionTime.overallMinutes
                        ),
                        fill: "#E0E0E0",
                      },
                    ]}
                    dataKey="value"
                    innerRadius={63}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#0B5FFF" />
                    <Cell fill="#E0E0E0" />
                  </Pie>

                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionTimeAnllysisGraph;