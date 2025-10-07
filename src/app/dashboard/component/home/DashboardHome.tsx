import { ExamList } from "./leftHome";
import { TopExamsChart } from "./RightHome";
import { StatsCard } from "./StatusCard";

const DashboardHome = () => {
  // Mock Data
  const exams = [
    { type: "Expert", name: "IPMAT Indore", date: "26 Sep 2025", person: "Arnav Pickett", status: "Draft", progress: 50, publishedDate: null },
    { type: "Expert", name: "IIM Bangalore DB...", date: "26 Sep 2025", person: "Ayanna Sharp", status: "Complete", progress: 100, publishedDate: null },
    { type: "Expert", name: "Symbiosis Entranc...", date: "01 Sep 2025", person: "Parker Powell", status: "Published", progress: 100, publishedDate: "08 Sep 2025" },
    { type: "Mock", name: "IPMAT Indore", date: "25 Aug 2025", person: "Dean Conrad", status: "Published", progress: 100, publishedDate: "25 Aug 2025" },
    { type: "Mock", name: "IPMAT Indore", date: "25 Aug 2025", person: "Dean Conrad", status: "Complete", progress: 100, publishedDate: null },
  ];

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
          <ExamList exams={exams} />
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