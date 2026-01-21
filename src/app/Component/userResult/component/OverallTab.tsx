import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import AnswerAccuracyGraph from "../Graph/AnswerAccuracyGraph";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import RANKING from "@/assets/vectors/ranking.svg";

import TROPHY from "@/assets/vectors/reportanalytics/kpis/cup.svg";
import AIM from "@/assets/vectors/reportanalytics/kpis/target.svg";
import PERCENTAGE from "@/assets/vectors/reportanalytics/kpis/percentage.svg";
import DISCOUNT from "@/assets/vectors/reportanalytics/kpis/discount.svg";
import { formatDateTime } from "@/Common/ComonDate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addfeedback } from "@/api/feedback";
import { getsubTopic } from "@/api/subTopic";
import { capitalizeWords } from "@/Utils/Cappital";
import MarksDistributionChart from "../Graph/MarksDistributionChart";

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
  const dispatch=useDispatch<AppDispatch>()
    const getData = async () => {
      const payload:any={}
      await dispatch(getsubTopic(payload));
    };
    
    useEffect(() => {
      getData();
    }, []);
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
  const sections = Array.isArray(data?.sectionWise)
    ? data.sectionWise
    : [];

  const examSections = Array.isArray(data?.examdetail?.sections)
    ? data.examdetail.sections
    : [];

  const COLORS = ["#FF8B00", "#00B8D9", "#6D5DFB"];

  // 🔹 Build sectionId → duration map (from examdetail)
  const durationMap: Record<string, number> = {};
  examSections.forEach((s: any) => {
    if (s.sectionId) {
      durationMap[s.sectionId] = Number(s.duration || 0);
    }
  });

  let overallSeconds = 0;

  const items = sections.map((s: any, idx: number) => {
    let seconds = 0;

    if (s.startTime && s.endTime) {
      const start = new Date(s.startTime).getTime();
      const end = new Date(s.endTime).getTime();

      if (!isNaN(start) && !isNaN(end) && end > start) {
        seconds = Math.floor((end - start) / 1000);
      }
    }

    overallSeconds += seconds;

    const totalDuration = durationMap[s.sectionId] || 0;

    return {
      sectionId: s.sectionId,
      name: s.sectionName,
      seconds,
      minutes: Math.round((seconds / 60) * 10) / 10,
      totalDuration, // 🔹 from examdetail
      totalQuestions: s.totalQuestions,
      attempted: s.attempted,
      totalPossibleMarks: s.totalPossibleMarks,
      fill: COLORS[idx % COLORS.length],
    };
  });

  const pie = items.map((i) => ({
    name: i.name,
    value: i.minutes,
    fill: i.fill,
  }));

  return {
    overallMinutes: Math.round((overallSeconds / 60) * 10) / 10,
    totalExamDuration: Number(data?.examdetail?.fullExamduration || 0),
    items,
    pie,
  };
}, [data]);



const [title,settitle]=useState("")
  const onSubmitFeedback = (e: React.FormEvent) => {
    const payload:any={
      title:title,
      questionPaperId:data?.questionPaperID
    }
    dispatch(addfeedback(payload))
    settitle("")
    e.preventDefault();
  };

  const avgSectionTime =
    sectionTime.items.length > 0
      ? sectionTime.overallMinutes / sectionTime.items.length
      : 0;

  const overallMinutes = sectionTime.overallMinutes || 0;
  const topicData = useSelector((state: any) => state?.topic?.topic);

const weakestSection = useMemo(() => {
  const sections = data?.sectionWise || [];
  if (!sections.length) return null;

  let weakest = null;
  let lowestAccuracy = Infinity;

  sections.forEach((s: any) => {
    const attempted = Number(s.attempted || 0);
    const correct = Number(s.correct || 0);

    if (attempted === 0) return;

    const accuracy = correct / attempted; // 0 → 1

    if (accuracy < lowestAccuracy) {
      lowestAccuracy = accuracy;
      weakest = {
        name: s.sectionName,
        accuracy: Math.round(accuracy * 100),
        correct,
        attempted,
      };
    }
  });

  return weakest;
}, [data]);
const weakTopics = useMemo(() => {
  const topics = data?.typeWiseTime || [];
  if (!topics.length) return [];

  return topics
    .map((t: any) => {
      const total = Number(t.total || 0);
      const attempted = Number(t.attempted || 0);
      const correct = Number(t.correct || 0);

      if (total === 0) return null;

      const attemptRate = (attempted / total) * 100;
      const accuracy = attempted ? (correct / attempted) * 100 : 0;

      return {
        topicId: t.topicId,
        total,
        attempted,
        correct,
        wrong: Number(t.wrong || 0),
        avgTime: Number(t.avgTime || 0),
        attemptRate: Math.round(attemptRate),
        accuracy: Math.round(accuracy),
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy);
}, [data]);

    const subTopics = useSelector((state: any) => state?.subTopic?.subTopic || []);

  const getTopicName = (topicId: string) => {
    const topic = topicData?.find((t: any) => t._id === topicId);
    return topic ? topic.topic : "Topic";
  };
  const getSubTopicName = (subtopicId: string) => {
    const topic = subTopics?.find((t: any) => t._id === subtopicId);
    return topic ? topic.subtopic : "Topic";
  };

  
const weakSubtopics = useMemo(() => {
  const details = Array.isArray(data?.details) ? data.details : [];
  if (!details.length) return [];

  const map: Record<string, any> = {};

  details.forEach((q: any) => {
    const subtopicId = q.subtopicId;
    if (!subtopicId) return;

    if (!map[subtopicId]) {
      map[subtopicId] = {
        subtopicId,
        total: 0,
        attempted: 0,
        correct: 0,
      };
    }

    map[subtopicId].total += 1;

    // ✅ Count attempt only if user answered
    if (q.usergiven) {
      map[subtopicId].attempted += 1;

      let isCorrect = false;

      if (q.answerType === "Numeric") {
        isCorrect =
          Number(q.usergiven?.numericAnswer) ===
          Number(q.correctAnswer);
      }

      if (isCorrect) {
        map[subtopicId].correct += 1;
      }
    }
  });

  return Object.values(map)
    .map((s: any) => {
      const attemptRate =
        s.total > 0
          ? Math.round((s.attempted / s.total) * 100)
          : 0;

      const accuracy =
        s.attempted > 0
          ? Math.round((s.correct / s.attempted) * 100)
          : 0;

      return {
        ...s,
        attemptRate,
        accuracy,
      };
    })
    // ✅ Weak Area Condition
   
    .sort((a: any, b: any) => a.accuracy - b.accuracy);
}, [data]);


  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-normal font-poppins text-gray-900">
            {data?.examdetail?.examname || "Mock Exam"}{" "}
            <span className="text-[#FF5635]">
              {capitalizeWords(data?.questionpaper?.questionPapername) || ""}
            </span>
          </h2>
          <p className="text-sm text-gray-600 font-dm-sans">
            Attempted on {formatDateTime(data?.updatedAt) || "-"}
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
            Avg. Time
          </p>
          <p className="text-xl font-normal text-gray-900 font-poppins">
            {data?.averageTimePerAttempted || "1 Min 26 Sec"}
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
                    {data?.examdetail.fullExamduration}
                    <span className="text-sm text-black font-normal">
                      /{data?.examdetail.fullExamduration || "-"}
                    </span>

                    {/* <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                      <AverageTime value={overallMinutes} />
                    </div> */}
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
                      {/* <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                        <AvgTimeTooltip value={avgSectionTime} />
                      </div> */}
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
              {weakestSection?.name} 
            </p>
            <p className="text-sm text-[#FF5635] font-normal mt-3 font-dm-sans">
              Insights:
            </p>
            <p className="text-sm text-black font-normal font-dm-sans">
              This section has the lowest contribution and largest gap, making
              it the top improvement area.
            </p>
          </div>

          <div className="rounded-[8px] max-h-[250px] overflow-y-scroll bg-[#F0F9FF] p-6 font-dm-sans">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">
              Topics
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800 font-dm-sans space-y-1">
           {weakTopics?.length > 0 ? (
  weakTopics.map((val) => (
    <li key={val.topicId}>
      {getTopicName(val.topicId)}
    </li>
  ))
) : (
  <li>No data available</li>
)}

           
            
            </ul>
          </div>

          <div className="rounded-[8px] bg-[#F0F9FF]  p-6 font-dm-sans max-h-[250px] overflow-y-scroll">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">
              Subtopics
            </p>
          <ul className="list-disc pl-5 text-sm text-gray-800 font-dm-sans space-y-1">
  {weakSubtopics.map((val, i) => {
    return (
      <li key={val.subtopicId || i}>
        {getSubTopicName(val.subtopicId)}
      </li>
    );
  })}
</ul>

          </div>
        </div>
      </div>

        <h3 className="text-lg font-medium text-[#005EB6] font-poppins">
            Over-all Ranking Data
          </h3>
      <MarksDistributionChart/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <div className="space-y-4">
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
        </div> */}

        <div className="space-y-4 font-dm-sans rounded-[4px]">
          <h3 className="text-lg font-medium text-[#005EB6] font-poppins">
            Feedback & Improvements
          </h3>
          <form onSubmit={onSubmitFeedback} className="space-y-4">
            <Textarea
             value={title}
             disabled={data?.isfeedBack}
            onChange={(e)=>settitle(e.target.value)}
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
