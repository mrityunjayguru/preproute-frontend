"use client";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SectionWiseTab from "./SectionWiseTab";
import TimeWiseTab from "./TimeWiseTab";
import DifficultyWiseTab from "./DifficultyWiseTab";
import { formatDateTime } from "@/Common/ComonDate";
import { capitalizeWords } from "@/Utils/Cappital";

/* -------------------- Helpers -------------------- */
const avg = (arr: number[]) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

/* -------------------- Tooltip Base -------------------- */
const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2">
    <div className="bg-white rounded-xl shadow-lg px-4 py-3 border min-w-[140px]">
      {children}
    </div>
  </div>
);

/* -------------------- Tooltip Variants -------------------- */
const AvgCWA = ({ correct, wrong, attempted }: any) => (
  <>
    <p className="text-sm font-medium text-gray-700 mb-1 font-poppins flex">
      Average
    </p>
    <div className="flex font-normal font-dm-sans gap-1">
      <span className="text-green-600">{String(correct).padStart(2, "0")}</span>
      <span className="text-gray-400">|</span>
      <span className="text-red-500">{String(wrong).padStart(2, "0")}</span>
      <span className="text-gray-400">|</span>
      <span className="text-gray-900">
        {String(attempted).padStart(2, "0")}
      </span>
    </div>
  </>
);

const AvgTime = ({ time }: { time: number }) => (
  <>
    <p className="text-sm flex items-center font-medium text-gray-700 mb-1 font-poppins">
      Average Time
    </p>
    <p className="text-[#007bff] flex   font-normal font-dm-sans">
      {time.toFixed(2)} Sec.
    </p>
  </>
);

const AvgAccuracy = ({ acc, att }: any) => (
  <>
    <p className="text-sm flex items-center font-medium text-gray-700 mb-1 font-poppins">
      Average
    </p>
    <p className="text-[#007bff] flex items-center font-normal font-dm-sans">
      {acc.toFixed(0)}% | {att.toFixed(0)}%
    </p>
  </>
);

/* -------------------- Component -------------------- */
interface TopicWiseTabProps {
  data: any;
}

const TopicWiseTab = ({ data }: TopicWiseTabProps) => {
  const topicData = useSelector((state: any) => state?.topic?.topic);
  const [filterSection, setFilterSection] = useState("Section");
  const filterBy=["Section","Time","Topic","Difficulty"]


  const getTopicName = (topicId: string) => {
    const topic = topicData?.find((t: any) => t._id === topicId);
    return topic ? topic.topic : "Topic";
  };
  const sections = useMemo(() => {
    if (!data?.topicData) return [];
    const set = new Set<string>();
    data.topicData.forEach((t: any) =>
      t.details?.forEach((d: any) => d.section && set.add(d.section))
    );
    return Array.from(set);
  }, [data]);

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

  const filteredData = useMemo(() => {
 
    if (!data?.topicData) return [];
    return data.topicData
      .map((topic: any) => {
        let details = topic.details || [];
 
        // if (filterSection !== "All") {
        //   details = details.filter((d: any) => d.section == filterSection);
        //   console.log(details,"ppppppppppppppppppppppp")
        // }
        if (!details.length) return null;
        return { ...topic, details };
      })
      .filter(Boolean);
  }, [data, filterSection]);
console.log(filteredData,"datadatadatadatadata")
  return (
    <div className="w-full">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {" "}
        <div>
          {" "}
          <h2 className="text-2xl font-normal font-poppins text-gray-900">
            {" "}
            {data?.examdetail?.examname}{" "}
            <span className="text-[#FF5635]">
              {" "}
              {capitalizeWords(data?.questionpaper?.questionPapername)}{" "}
            </span>{" "}
          </h2>{" "}
          <p className="text-sm text-gray-600 font-dm-sans">
            {" "}
                       Attempted on {formatDateTime(data?.updatedAt) || "-"}
           
          </p>{" "}
        </div>{" "}
        {/* <div className="text-[#FF5635]">Section-wise Analytics</div>{" "} */}
      </div>{" "}
      {/* Filter */}{" "}
      <div className="flex items-center gap-4 mb-6 mt-6">
        {" "}
        <span className="text-gray-700 font-poppins">Filter by</span>{" "}
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="bg-white border border-gray-200 px-4 py-2 rounded min-w-[150px]"
        >
          {" "}
          {/* <option value="All">Topic</option>{" "} */}
          {filterBy?.map((s:any,i:any) => (
            <option key={i} value={s}>{s}</option>
          ))}{" "}
        </select>{" "}
      </div>
      {/* Topics */}
      {filterSection=="Topic"?( <div className="space-y-8">
        {filteredData.map((topic: any) => (
          <div
            key={topic.topicId}
            className="bg-white rounded-lg overflow-hidden"
          >
            {/* Header Row */}
            <div className="bg-[#005EB6] text-white flex">
              <div className="p-4 w-1/4 min-w-[200px] text-lg font-poppins">
                {getTopicName(topic.topicId)}
              </div>
              <div className="flex-1 flex">
                {topic.details.map((d: any, i: number) => (
                  <div key={i} className="flex-1 p-4 text-center text-sm">
                    {d.QuestionType}
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Number of Questions (RESTORED) */}
            <div className="flex border-b">
              <div className="p-4 w-1/4 min-w-[200px] font-poppins">
                Number of Questions
              </div>
              <div className="flex-1 flex">
                {topic.details.map((d: any, i: number) => (
                  <div key={i} className="flex-1 p-4 text-center">
                    {d.total}
                  </div>
                ))}
              </div>
            </div>

            {/* Correct | Wrong | Attempted */}
            <div className="flex border-b bg-[#F9FBFC]">
              <div className="p-4 w-1/4 min-w-[200px] font-poppins">
                Correct | Wrong | Attempted
              </div>
              <div className="flex-1 flex text-sm">
                {topic.details.map((d: any, i: number) => (
                  <div
                    key={i}
                    className="flex-1 p-4 text-center relative group cursor-pointer"
                  >
                    <span className="text-green-600">{d.correct}</span> |{" "}
                    <span className="text-red-500">{d.wrong}</span> |{" "}
                    <span>{d.attempted}</span>
                    <div className="hidden group-hover:block">
                      <TooltipWrapper>
                        <AvgCWA
                          correct={Math.round(
                            avg(topic.details.map((x: any) => x.correct))
                          )}
                          wrong={Math.round(
                            avg(topic.details.map((x: any) => x.wrong))
                          )}
                          attempted={Math.round(
                            avg(topic.details.map((x: any) => x.attempted))
                          )}
                        />
                      </TooltipWrapper>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Time */}
            <div className="flex border-b">
              <div className="p-4 w-1/4 min-w-[200px] font-poppins">
                Average Time
              </div>
              <div className="flex-1 flex">
                {topic.details.map((d: any, i: number) => (
                  <div
                    key={i}
                    className="flex-1 p-4 text-center relative group cursor-pointer"
                  >
                    {Number(d.avgTime || 0).toFixed(2)} Sec.
                    <div className="hidden group-hover:block">
                      <TooltipWrapper>
                        <AvgTime
                          time={avg(
                            topic.details.map((x: any) =>
                              Number(x.avgTime || 0)
                            )
                          )}
                        />
                      </TooltipWrapper>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accuracy | Attempt % */}
            <div className="flex bg-[#F9FBFC]">
              <div className="p-4 w-1/4 min-w-[200px] font-poppins text-[#005EB6]">
                Accuracy | Attempt %
              </div>
              <div className="flex-1 flex text-[#005EB6]">
                {topic.details.map((d: any, i: number) => (
                  <div
                    key={i}
                    className="flex-1 p-4 text-center relative group cursor-pointer"
                  >
                    {d.accuracy} | {d.percentage}
                    <div className="hidden group-hover:block">
                      <TooltipWrapper>
                        <AvgAccuracy
                          acc={avg(
                            topic.details.map((x: any) =>
                              Number(x.accuracy || 0)
                            )
                          )}
                          att={avg(
                            topic.details.map((x: any) =>
                              Number(x.percentage || 0)
                            )
                          )}
                        />
                      </TooltipWrapper>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>):(null)}
     
     {filterSection=="Section"?(
      <SectionWiseTab data={data}/>
     ):(null)}
   {filterSection=="Time"?(
      <TimeWiseTab data={data}/>
     ):(null)}
  {filterSection=="Difficulty"?(
      <DifficultyWiseTab data={data}/>
     ):(null)}
      
    </div>
  );
};

export default TopicWiseTab;
