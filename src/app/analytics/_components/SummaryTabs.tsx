"use client";
import { useEffect, useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Empty,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import OVERALL from "@/assets/vectors/reportanalytics/routes/overall.svg";
import QUESTIONWISE from "@/assets/vectors/reportanalytics/routes/presention-chart.svg";
import DETAILED from "@/assets/vectors/reportanalytics/routes/share.svg";
import EMPTY from "@/assets/vectors/results-empty.svg";
import Image from "next/image";
import OverallTab from "@/app/Component/userResult/component/OverallTab";
import TopicWiseTab from "@/app/Component/userResult/component/TopicWiseTab";
import QuestionWiseTab from "@/app/Component/userResult/component/QuestionWiseTab";
import { useRouter } from "next/navigation";

interface SummaryTabsProps {
  data: any;
  examName?: string;
}

const SummaryTabs = ({ data }: SummaryTabsProps) => {
  const [activeTab, setActiveTab] = useState("Overall");
  const router = useRouter();
  const tabItems = [
    { value: "Overall", label: "Overall", icon: OVERALL },
    { value: "Question-wise", label: "Question-wise", icon: QUESTIONWISE },
    { value: "Detailed", label: "Detailed", icon: DETAILED },
  ];



  const questionRows = useMemo(() => {
    const details = Array.isArray(data?.details) ? data.details : [];
    return details
      .map((q: any) => {
        const attempted = Boolean(q?.userAttempt);
        const userAnswer = q?.usergiven?.userAnswer;
        const correctAnswer = q?.correctAnswer;
        const isCorrect = attempted && userAnswer !== undefined && userAnswer === correctAnswer;
        const status = attempted ? (isCorrect ? "Correct" : "Wrong") : "Unattempted";
        const timeTaken = Number(q?.usergiven?.timeTaken || 0);
        const sectionName =
          typeof q?.section === "object"
            ? q?.section?.section
            : data?.sectionDetails?.find((s: any) => s?._id === q?.section)?.section;

        return {
          questionNo: q?.questionNo,
          status,
          timeTaken,
          sectionName: sectionName || "-",
          questionType: q?.questionType || "-",
        };
      })
      .sort((a: any, b: any) => (a.questionNo ?? 0) - (b.questionNo ?? 0));
  }, [data]);

  if (!data) {
    return (
      <Empty>
        <EmptyMedia>
          <Image
            src={EMPTY}
            alt="No Data"
            width={200}
            height={200}
            className="opacity-80 font-poppins"
          />
        </EmptyMedia>
        <EmptyContent>
          <EmptyTitle className="font-poppins">No Data Available</EmptyTitle>
          <EmptyDescription className="font-poppins">
            There is no analytics data available for this exam yet.
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full bg-transparent p-0 h-auto justify-start gap-4 border-b border-[#D6EBFF] rounded-none overflow-x-auto scrollbar-none snap-x snap-mandatory px-4 sm:px-0">
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none h-auto rounded-none border-0 bg-transparent px-0 py-4 text-sm font-medium font-poppins text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#FF5635] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5635] [&[data-state=active]_img]:[filter:invert(46%)_sepia(55%)_saturate(3558%)_hue-rotate(341deg)_brightness(98%)_contrast(106%)]"
          >
            <span className="inline-flex items-center gap-2">
              <Image src={tab.icon} alt={tab.label} width={18} height={18} />
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="Overall" className="mt-3">
        <OverallTab data={data} />
      </TabsContent>

      <TabsContent value="Question-wise" className="mt-3">
        <div className="space-y-6">
          <QuestionWiseTab data={data} />
        </div>
      </TabsContent>

      <TabsContent value="Detailed" className="mt-3">
        <div className="space-y-6">
          <TopicWiseTab data={data} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SummaryTabs;
