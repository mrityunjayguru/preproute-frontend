import React from 'react'
interface DifficultyWiseTabProps {
  sectionTime: any;
}
function SectionDataChart({sectionTime}) {
    const AverageTime = ({ value }: { value: number }) => (
  <div className="bg-white rounded-xl shadow-lg px-4 py-3 border min-w-[140px]">
    <p className="flex text-sm font-medium text-black mb-1 text-center">
      Average Time
    </p>
    <p className="flex  items-center text-lg font-semibold text-[#005EB6] text-center font-dm-sans">
      {value.toFixed(2)} 
      <span className="text-sm font-normal text-black">
        mins
      </span>
    </p>
  </div>
);

const AvgTimeTooltip = ({ value }: { value: number }) => (
  <div className="bg-white rounded-xl shadow-lg px-4 py-3 border min-w-[140px]">
    <p className="flex text-sm font-medium text-black mb-1 text-center">
      Average Time
    </p>
    <p className="flex items-center text-lg font-semibold text-[#005EB6] text-center font-dm-sans">
      {value.toFixed(2)} 
      <span className="text-sm font-normal text-black">
        mins
      </span>
    </p>
  </div>
);

  return (
    <div>
       <div className="rounded-[8px] bg-white border border-[#E6F4FF] p-6">
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
                      <div className="border-b border-gray-100 pb-2">
                        <div className="text-xs text-black font-dm-sans mb-1">
                          Overall Exam
                        </div>
                        <div className="text-2xl font-bold text-[#005EB6] relative group font-dm-sans">
                          {sectionTime.overallMinutes}
                          <span className="text-sm text-black font-normal">
                            {/* /{sectionTime.totalExamDuration || "-"} */}
                          </span>
      
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                            {/* <AverageTime value={overallMinutes} /> */}
                          </div>
                        </div>
                      </div>
      
                      {sectionTime.items.slice(0, 4).map((s) => (
                        <div
                          key={s.name}
                          className="border-b border-gray-100 pb-2 last:border-0"
                        >
                          <div className="text-xs text-black font-dm-sans mb-1">
                            {s.name}
                          </div>
                          <div
                            className="text-xl font-bold font-dm-sans relative group cursor-pointer"
                            style={{
                              color: sectionTime.pie.find((p) => p.name === s.name)
                                ?.fill,
                            }}
                          >
                            {s.minutes}
                            <span className="text-sm text-black font-normal">
                              /{s.totalDuration || "-"}
                            </span>
      
                            {/* Tooltip */}
                            <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                              <AvgTimeTooltip value={avgSectionTime} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
      
                    <div className="w-full h-[200px] ">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sectionTime.pie}
                            dataKey="value"
                            innerRadius={50}
                            outerRadius={70}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={2}
                          >
                            {sectionTime.pie.map((entry: any, index: number) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                                stroke="none"
                              />
                            ))}
                          </Pie>
      
                          <Pie
                            data={[
                              { value: sectionTime.overallMinutes, fill: "#0B5FFF" },
                              {
                                value: Math.max(
                                  0,
                                  (sectionTime.totalExamDuration ||
                                    sectionTime.overallMinutes) -
                                    sectionTime.overallMinutes
                                ),
                                fill: "#E0E0E0",
                              },
                            ]}
                            dataKey="value"
                            innerRadius={78}
                            outerRadius={85}
                            startAngle={90}
                            endAngle={-270}
                          >
                            <Cell fill="#0B5FFF" stroke="none" />
                            <Cell fill="#E0E0E0" stroke="none" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
    </div>
  )
}

export default SectionDataChart
