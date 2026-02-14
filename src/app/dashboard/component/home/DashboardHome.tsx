"use client";
import { useEffect } from "react";
import { ExamList } from "./leftHome";
import { TopExamsChart } from "./RightHome";
import { StatsCard } from "./StatusCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getDashboardData } from "@/api/dashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Footer from "@/app/layouts/_component/footer";

const DashboardHome = () => {
  const data = useSelector((state: any) => state?.dashboard?.Dashboard);
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  // role
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const getDashboard = async () => {
    const payload: any = {};
    await dispatch(getDashboardData(payload));
  };

  useEffect(() => {
    getDashboard();
  }, []);
  useEffect(() => {
    if (userLogin?.role != "Admin" && userLogin?.role != "Expert") {
      router.push(`/home`);
    }
  }, []);
  // Calculate real stats from data
  const totalExams = data ? data.length : 0;
  const draftExams = data
    ? data.filter((exam: any) => !exam.isPublished).length
    : 0;
  const publishedExams = data
    ? data.filter((exam: any) => exam.isPublished).length
    : 0;

  const stats = [
    {
      label: "Total",
      value: totalExams,
    },
    {
      label: "Drafts",
      value: draftExams,
    },
    {
      label: "Published",
      value: publishedExams,
    },
  ];

  const chartData = [
    { name: "Exam A", views: 85 },
    { name: "Exam B", views: 95 },
    { name: "Exam C", views: 78 },
    { name: "Exam D", views: 90 },
    { name: "Exam E", views: 70 },
    { name: "Exam F", views: 65 },
    { name: "Exam G", views: 82 },
    { name: "Exam H", views: 55 },
    { name: "Exam I", views: 75 },
    { name: "Exam J", views: 60 },
  ];

  return (
    <div className="">
      <div className=" mx-auto   px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header Section with Light Blue Background */}
        <div className="bg-[#E8F4F8] rounded-lg px-8 py-10 mb-8 text-start">
          <h1 className="text-[#FF5635] text-2xl md:text-3xl font-semibold font-poppins mb-2">
            Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column (Exams List) */}
          <div className="col-span-12 lg:col-span-7">
            <ExamList exams={data} />
          </div>

          {/* Right Column (Stats and Chart) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-row-12 gap-6">
              <StatsCard stats={stats} />
              <TopExamsChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
