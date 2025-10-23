"use client"
import { useEffect } from "react";
import { ExamList } from "./leftHome";
import { TopExamsChart } from "./RightHome";
import { StatsCard } from "./StatusCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getDashboardData } from "@/api/dashboard";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

const DashboardHome = () => {
  const data=useSelector((state:any)=>state?.dashboard?.Dashboard)
  const userLogin=useSelector((state:any)=>state?.Auth?.loginUser)
  // role
  const router = useRouter()
const dispatch=useDispatch<AppDispatch>()
  const getDashboard=async()=>{
    const payload:any={}
await dispatch(getDashboardData(payload))
  }

  useEffect(()=>{
getDashboard()
  },[])
  useEffect(()=>{
    console.log(userLogin,"userLoginuserLogin")
if(userLogin?.role!="Admin" && userLogin?.role!="Expert"  ){
  router.push(`/home`)
}
  },[])
  // Mock Data
 
  const stats = [
    { label: "Total Exams", subtitle: "Published", value: 120, color: 'text-red-600' },
    { label: "Experts", subtitle: "Published", value: 120, color: 'text-red-600' },
    { label: "Operator", subtitle: "Published", value: 120, color: 'text-red-600' },
  ];

  const chartData = [
    { name: 'Exam A', views: 85 },
    { name: 'Exam B', views: 95 },
    { name: 'Exam C', views: 78 },
    { name: 'Exam D', views: 90 },
    { name: 'Exam E', views: 70 },
    { name: 'Exam F', views: 65 },
    { name: 'Exam G', views: 82 },
    { name: 'Exam H', views: 55 },
    { name: 'Exam I', views: 75 },
    { name: 'Exam J', views: 60 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 ">
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        
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
  );
};

export default DashboardHome;