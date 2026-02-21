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
import { capitalizeWords, formatMinutesSeconds } from "@/Utils/Cappital";
import MarksDistributionChart from "../Graph/MarksDistributionChart";
import { ToastError } from "@/Utils/toastUtils";
import { getTopic } from "@/api/Topic";

interface OverallTabProps {
  data: any;
}

const AverageTime = ({ value }: { value: number }) => (
  <div className="bg-white rounded-xl shadow-lg px-4 py-3 border min-w-[140px]">
    <p className="flex text-sm font-medium text-black mb-1 text-center">Average Time</p>
    <p className="flex items-center text-lg font-semibold text-[#005EB6] text-center font-dm-sans">
      {value.toFixed(2)}
      <span className="text-sm font-normal text-black">mins</span>
    </p>
  </div>
);

const OverallTab = ({ data }: OverallTabProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, settitle] = useState("");

  const getData = async () => {
    const payload: any = {};
    await dispatch(getsubTopic(payload));
  };

  useEffect(() => {
    getData();
      dispatch(getTopic({}));
  }, []);

  const totalQuestions = Number(data?.totalQuestions || 0);
  const attempted = Number(data?.attempted || 0);
  const unattempted = Math.max(0, totalQuestions - attempted);

  const negativePerWrong = Number(
    data?.questionpaper?.negativeMark ?? data?.examdetail?.negativeMark ?? data?.negativeMark ?? 0
  );
  const computedNegative =
    Number.isFinite(negativePerWrong) && negativePerWrong !== 0
      ? (Number(data?.wrong || 0) || 0) * negativePerWrong
      : Number(data?.negativeMarks ?? data?.totalNegative ?? 0) || 0;

  // Calculate total seconds taken from all sections
  const totalTimeTakenSeconds = useMemo(() => {
    return (data?.sectionWise || []).reduce((acc: number, val: any) => acc + (val.totalTime || 0), 0);
  }, [data]);

  const sectionTime = useMemo(() => {
    const sections = Array.isArray(data?.sectionWise) ? data.sectionWise : [];
    const examSections = Array.isArray(data?.examdetail?.sections) ? data.examdetail.sections : [];
    const COLORS = ["#FF8B00", "#00B8D9", "#6D5DFB"];

    const durationMap: Record<string, number> = {};
    examSections.forEach((s: any) => {
      if (s.sectionId) durationMap[s.sectionId] = Number(s.duration || 0);
    });

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

    const pie = items.map((i: any) => ({
      name: i.name,
      value: i.seconds / 60, // Pie chart logic usually works better on numerical minutes
      fill: i.fill,
    }));

    return {
      overallMinutes: totalTimeTakenSeconds / 60,
      totalExamDuration: Number(data?.examdetail?.fullExamduration || 0),
      items,
      pie,
    };
  }, [data, totalTimeTakenSeconds]);

  const onSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const wordCount = title.trim().split(/\s+/).length;
    if (wordCount < 2) {
      ToastError("Feedback must contain at least 2 words");
      return;
    }
    const payload: any = { title, questionPaperId: data?.questionPaperID };
    dispatch(addfeedback(payload));
    settitle("");
  };

  const topicData = useSelector((state: any) => state?.topic?.topic);
  const subTopics = useSelector((state: any) => state?.subTopic?.subTopic || []);

  const getTopicName = (topicId: string) => topicData?.find((t: any) => t._id === topicId)?.topic || "Topic";
  const getSubTopicName = (subId: string) => subTopics?.find((t: any) => t._id === subId)?.subtopic || "Topic";

  const weakestSection = useMemo(() => {
    const sections = data?.sectionWise || [];
    if (!sections.length) return null;
    let weakest: any = null;
    let lowestAccuracy = Infinity;

    sections.forEach((s: any) => {
      const att = Number(s.attempted || 0);
      const corr = Number(s.correct || 0);
      if (att === 0) return;
      const acc = corr / att;
      if (acc < lowestAccuracy) {
        lowestAccuracy = acc;
        weakest = { name: s.sectionName, accuracy: Math.round(acc * 100) };
      }
    });
    return weakest;
  }, [data]);

  const weakTopics = useMemo(() => {
    return (data?.typeWiseTime || [])
      .map((t: any) => ({
        ...t,
        accuracy: t.attempted ? (Number(t.correct) / Number(t.attempted)) * 100 : 0,
      }))
      .sort((a: any, b: any) => a.accuracy - b.accuracy)
      .slice(0, 5);
  }, [data]);

  const weakSubtopics = useMemo(() => {
    const details = Array.isArray(data?.details) ? data.details : [];
    const map: Record<string, any> = {};
    details.forEach((q: any) => {
      const sid = q.subtopicId;
      if (!sid) return;
      if (!map[sid]) map[sid] = { subtopicId: sid, total: 0, attempted: 0, correct: 0 };
      map[sid].total += 1;
      if (q.usergiven) {
        map[sid].attempted += 1;
        const isCorrect = q.answerType === "Numeric" 
          ? Number(q.usergiven?.numericAnswer) === Number(q.correctAnswer)
          : q.usergiven?.userAnswer === q.correctAnswer; // Standardized check
        if (isCorrect) map[sid].correct += 1;
      }
    });
    return Object.values(map)
      .map((s: any) => ({ ...s, accuracy: s.attempted > 0 ? (s.correct / s.attempted) * 100 : 0 }))
      .sort((a: any, b: any) => a.accuracy - b.accuracy)
      .slice(0, 5);
  }, [data]);

  const checkShow = data?.examdetail?.examname === "CUET" || data?.questionpaper?.examformet === "sectional";

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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:w-3/4">
        {[
          { label: "Score", value: data?.totalMarks || 0, icon: TROPHY },
          { label: "Accuracy", value: data?.accuracy || "0%", icon: AIM },
          { label: "Percentage", value: data?.percentage || "0%", icon: DISCOUNT },
        ].map((kpi, idx) => (
          <div key={idx} className="rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] py-3 px-4 flex justify-between flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 font-medium font-dm-sans">{kpi.label}</span>
              <Image src={kpi.icon} alt={kpi.label} width={24} height={24} />
            </div>
            <p className="text-[28px] font-normal font-dm-sans text-[#FF5635]">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Attempted", val: `${attempted} out of ${totalQuestions}`, color: "text-blue-600" },
          { label: "Correct", val: `${data?.correct || 0} out of ${attempted}`, color: "text-[#005EB6]" },
          { label: "Incorrect", val: `${data?.wrong || 0} out of ${attempted}`, color: "text-[#005EB6]" },
          { label: "Unattempted", val: `${unattempted} out of ${totalQuestions}`, color: "text-[#005EB6]" },
          { label: "Avg. Time", val: data?.averageTimePerAttempted || "0s", color: "text-[#005EB6]" },
          { label: "Negative Marks", val: computedNegative || 0, color: "text-[#005EB6]", valColor: "text-[#FF5635]" },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-[8px] bg-[#F0F9FF] border border-[#E6F4FF] py-5 px-4 flex justify-center items-start flex-col">
            <p className={`${stat.color} font-medium font-dm-sans`}>{stat.label}</p>
            <p className={`text-xl font-normal ${stat.valColor || "text-gray-900"} font-poppins`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {!checkShow && (
          <>
            <div className="lg:col-span-2">
              <AnswerAccuracyGraph />
            </div>

            <div className="rounded-[8px] bg-white border border-[#E6F4FF] p-6">
              <h3 className="text-lg font-medium text-[#005EB6] mb-4 font-poppins">
                Time Analysis <span className="text-xs text-black font-normal">(in mins)</span>
              </h3>

              {sectionTime.items.length === 0 ? (
                <div className="text-sm text-gray-500 font-dm-sans">No time data found.</div>
              ) : (
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-2">
                      <div className="text-xs text-black font-dm-sans mb-1">Overall Exam</div>
                      <div className="text-2xl font-bold text-[#005EB6] font-dm-sans">
                        {formatMinutesSeconds(totalTimeTakenSeconds)}/
                        <span className="text-[#000]">{data?.examdetail?.fullExamduration}</span>
                      </div>
                    </div>

                    {sectionTime.items.slice(0, 4).map((s) => (
                      <div key={s.name} className="border-b border-gray-100 pb-2 last:border-0">
                        <div className="text-xs text-black font-dm-sans mb-1">{s.name}</div>
                        <div className="text-xl font-bold font-dm-sans" style={{ color: s.fill }}>
                          {s.minutes}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-[200px]">
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
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                          ))}
                        </Pie>
                        <Pie
                          data={[
                            { value: sectionTime.overallMinutes, fill: "#0B5FFF" },
                            {
                              value: Math.max(0, (sectionTime.totalExamDuration || sectionTime.overallMinutes) - sectionTime.overallMinutes),
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
          </>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#005EB6] font-poppins">Improvement Areas</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {!checkShow && (
            <div className="rounded-[8px] bg-[#F0F9FF] p-6">
              <p className="text-[#FF5635] font-medium font-poppins">Focus Areas</p>
              <p className="text-xl font-normal text-gray-900 font-dm-sans">{weakestSection?.name || "N/A"}</p>
              <p className="text-sm text-[#FF5635] font-normal mt-3 font-dm-sans">Insights:</p>
              <p className="text-sm text-black font-normal font-dm-sans">
                This section has the lowest contribution and largest gap, making it the top improvement area.
              </p>
            </div>
          )}

          <div className="rounded-[8px] max-h-[250px] bg-[#F0F9FF] p-6 font-dm-sans">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">Topics</p>
            <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
              {weakTopics?.length > 0 ? (
                weakTopics.map((val: any) => <li key={val.topicId}>{getTopicName(val.topicId)}</li>)
              ) : (
                <li>No data available</li>
              )}
            </ul>
          </div>

          <div className="rounded-[8px] bg-[#F0F9FF] p-6 font-dm-sans max-h-[250px]">
            <p className="text-[#FF5635] font-medium font-poppins mb-3">Subtopics</p>
            <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
              {weakSubtopics.length > 0 ? (
                weakSubtopics.map((val: any, i: number) => (
                  <li key={val.subtopicId || i}>{getSubTopicName(val.subtopicId)}</li>
                ))
              ) : (
                <li>No data available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 font-dm-sans rounded-[4px]">
          <h3 className="text-lg font-medium text-[#005EB6] font-poppins">Feedback & Improvements</h3>
          <form onSubmit={onSubmitFeedback} className="space-y-4">
            <Textarea
              value={title}
              disabled={data?.isfeedBack}
              onChange={(e) => settitle(e.target.value)}
              placeholder="Enter your feedback and suggestions..."
              className="min-h-[120px] border border-[#E6F4FF] bg-white"
            />
            <div className="flex">
              <Button
                type="submit"
                className="bg-[#FF5635] hover:bg-[#e34d2e] text-white px-16 rounded-[2px] font-poppins font-medium cursor-pointer"
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