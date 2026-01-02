import Image from "next/image";
import React, { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import AnswerAccuracyGraph from "../Graph/AnswerAccuracyGraph";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import RANKING from "@/assets/vectors/ranking.svg";

import TROPHY from "@/assets/vectors/reportanalytics/kpis/cup.svg";
import AIM from "@/assets/vectors/reportanalytics/kpis/target.svg";
import PERCENTAGE from "@/assets/vectors/reportanalytics/kpis/percentage.svg";
import DISCOUNT from "@/assets/vectors/reportanalytics/kpis/discount.svg";

interface OverallTabProps {
  data: any;
}

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



const OverallTab = ({ data }: OverallTabProps) => {
  const attemptedDate = useMemo(() => {
    const raw = data?.examdetail?.examDate;
    if (!raw) return "";
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [data?.examdetail?.examDate]);

  const totalQuestions = Number(data?.totalQuestions || 0);
  const attempted = Number(data?.attempted || 0);
  const unattempted = Math.max(0, totalQuestions - attempted);

  const negativePerWrong = Number(
    data?.questionpaper?.negativeMark ??
      data?.examdetail?.negativeMark ??
      data?.negativeMark ??
      0
  );
  const computedNegative =
    Number.isFinite(negativePerWrong) && negativePerWrong !== 0
      ? (Number(data?.wrong || 0) || 0) * negativePerWrong
      : Number(data?.negativeMarks ?? data?.totalNegative ?? 0) || 0;

  const rank = Number(data?.rank ?? data?.myRank ?? 0);
  const totalStudents = Number(
    data?.totalStudents ?? data?.totalUsers ?? data?.totalCandidates ?? 0
  );

  const sectionTime = useMemo(() => {
    const details = Array.isArray(data?.details) ? data.details : [];
    const sections = Array.isArray(data?.sectionDetails)
      ? data.sectionDetails
      : [];
    const map: Record<string, { name: string; duration: number }> = {};
    sections.forEach((s: any) => {
      if (s?._id)
        map[s._id] = {
          name: s.section,
          duration: Number(s.duration || 0),
        };
    });

    const totals: Record<string, number> = {};
    let overall = 0;

    details.forEach((q: any) => {
      const secId =
        typeof q?.section === "object" ? q?.section?._id : q?.section;
      const secMeta = secId ? map[String(secId)] : undefined;
      const key = secMeta?.name || "Overall Exam";
      const time = Number(q?.usergiven?.timeTaken || 0);
      if (!Number.isFinite(time) || time <= 0) return;
      overall += time;
      totals[key] = (totals[key] || 0) + time;
    });

    if (overall === 0) {
      return {
        overallMinutes: 0,
        totalExamDuration: 0,
        items: [] as any[],
        pie: [] as any[],
      };
    }

    const COLORS = ["#FF8B00", "#00B8D9", "#6D5DFB", "#FF5630"];

    const items = Object.entries(totals)
      .filter(([name]) => name !== "Overall Exam")
      .map(([name, seconds]) => {
        const secEntry = Object.values(map).find((m) => m.name === name);
        return {
          name,
          seconds,
          minutes: Math.round((seconds / 60) * 10) / 10,
          totalDuration: secEntry ? secEntry.duration : 0,
        };
      })
      .sort((a, b) => b.seconds - a.seconds);

    const pie = items.map((i, idx) => ({
      name: i.name,
      value: i.minutes,
      fill: COLORS[idx % COLORS.length],
    }));

    return {
      overallMinutes: Math.round((overall / 60) * 10) / 10,
      totalExamDuration: Number(
        data?.examdetail?.duration || data?.duration || 0
      ),
      items,
      pie,
    };
  }, [data]);

  const onSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const avgSectionTime =
    sectionTime.items.length > 0
      ? sectionTime.overallMinutes / sectionTime.items.length
      : 0;

  const overallMinutes = sectionTime.overallMinutes || 0;
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-normal font-poppins text-gray-900">
            {data?.examdetail?.examname || "Mock Exam"}{" "}
            <span className="text-[#FF5635]">
              {data?.questionpaper?.questionPapername || ""}
            </span>
          </h2>
          <p className="text-sm text-gray-600 font-dm-sans">
            Attempted on {attemptedDate || "-"}
          </p>
        </div>

        <div className="w-full md:w-[220px] rounded-[8px] bg-gradient-to-t from-[#FFECDF] to-white drop-shadow-xs p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium font-poppins text-gray-900">
              My Rank
            </p>
            <p className="text-2xl font-normal font-dm-sans text-[#FF5635]">
              {rank || 0}{" "}
              <span className="text-gray-800 text-lg font-normal">
                / {totalStudents || 0}
              </span>
            </p>
          </div>
          <div className="w-7 h-7 rounded-full   text-[#FF5635] text-sm">
            <Image src={RANKING} alt="ranking" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:w-3/4">
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
            <span className="text-black font-medium font-dm-sans">
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
            <span className="text-black font-medium font-dm-sans">
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
            <span className="text-black font-medium font-dm-sans">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-blue-600 font-medium font-dm-sans">Attempted</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {attempted} out of {totalQuestions}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-[#005EB6] font-medium font-dm-sans">Correct</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.correct || 0} out of {data?.attempted || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-[#005EB6] font-medium font-dm-sans">Incorrect</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.wrong || 0} out of {data?.attempted || 0}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-[#005EB6] font-medium font-dm-sans">Unattempted</p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {unattempted} out of {totalQuestions}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-[#005EB6] font-medium font-dm-sans">
            Avg. Time/Question
          </p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.avgTimePerQuestion || "1 Min 26 Sec"}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex  justify-center items-start flex-col">
          <p className="text-[#005EB6] font-medium font-dm-sans">
            Negative Marks
          </p>
          <p className="text-xl font-normal text-[#FF5635] font-poppins">
            {computedNegative || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnswerAccuracyGraph />
        </div>
        {/* Time Analysis */}
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
                      /{sectionTime.totalExamDuration || "-"}
                    </span>

                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                      <AverageTime value={overallMinutes} />
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#005EB6] font-poppins">
          Improvement Areas
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-[8px] bg-[#F0F9FF]  p-6">
            <p className="text-[#FF5635] font-medium font-poppins">
              Focus Areas
            </p>
            <p className="text-xl font-normal text-gray-900 font-dm-sans">
              {sectionTime.items[0]?.name || "Logical Reasoning"}
            </p>
            <p className="text-sm text-[#FF5635] font-normal mt-3 font-dm-sans">
              Insights:
            </p>
            <p className="text-sm text-black font-normal font-dm-sans">
              This section has the lowest contribution and largest gap, making
              it the top improvement area.
            </p>
          </div>

          <div className="rounded-[8px] bg-[#F0F9FF] p-6 font-dm-sans">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">
              Topics
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800 font-dm-sans space-y-1">
              <li>Core concepts</li>
              <li>Frequently wrong question types</li>
              <li>Time-consuming questions</li>
            </ul>
          </div>

          <div className="rounded-[8px] bg-[#F0F9FF]  p-6 font-dm-sans">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">
              Subtopics
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800 font-dm-sans space-y-1">
              <li>Concept clarity & basics</li>
              <li>Common traps & errors</li>
              <li>Step-by-step solving approach</li>
              <li>Easy → medium practice</li>
              <li>Time management per question</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#005EB6] font-poppins">
            Over-all Ranking Data
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex justify-between flex-col">
              <div className="flex justify-between items-center">
                <p className="text-black font-medium font-dm-sans">Students</p>
                <Image src={TROPHY} alt="total" width={24} height={24} />
              </div>
              <p className="text-[26px] font-normal font-dm-sans text-[#FF5635]">
                {totalStudents || 0}
              </p>
            </div>
            <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-4 px-4 flex justify-between flex-col">
              <div className="flex justify-between items-center">
                <p className="text-black font-medium font-dm-sans">Accuracy</p>

                <Image src={AIM} alt="total" width={24} height={24} />
              </div>
              <p className="text-[26px] font-normal font-dm-sans text-[#FF5635]">
                {data?.accuracy || "0%"}
              </p>
            </div>
            <div className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex justify-between flex-col">
              <div className="flex justify-between items-center">
                <p className="text-black font-medium font-dm-sans">
                  Percentage
                </p>
                <Image src={DISCOUNT} alt="percentage" width={24} height={24} />
              </div>
              <p className="text-[26px] font-normal font-dm-sans text-[#FF5635]">
                {data?.percentage || "0%"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 font-dm-sans rounded-[4px]">
          <h3 className="text-lg font-medium text-[#005EB6] font-poppins">
            Feedback & Improvements
          </h3>
          <form onSubmit={onSubmitFeedback} className="space-y-4">
            <Textarea
              placeholder="Enter your feedback and suggestions..."
              className="min-h-[120px] border border-[#E6F4FF] bg-white"
            />
            <div className="flex">
              <Button
                type="submit"
                className="bg-[#FF5635] hover:bg-[#e34d2e] text-white px-16  rounded-[2px] font-poppins font-medium cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverallTab;
