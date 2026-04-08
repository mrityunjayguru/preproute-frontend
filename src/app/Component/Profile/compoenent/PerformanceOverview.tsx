import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CircularProgress = ({ percentage }) => {
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(percentage), 200);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e42" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="65%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-slate-800 leading-none">
          {Math.round(percentage)}%
        </span>
        <span className="text-xs font-medium text-slate-400 mt-1">Completed</span>
      </div>
    </div>
  );
};

const ArrowUp = ({ color = "#ef4444" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
    <path d="M12 4l8 8h-5v8H9v-8H4z" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const FlameIcon = ({ color = "#f97316" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c0 0-5 5.5-5 10a5 5 0 0010 0c0-4.5-5-10-5-10zm0 14a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const StatRow = ({ label, value, icon, valueColor, animateDelay = 0 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), animateDelay);
    return () => clearTimeout(t);
  }, [animateDelay]);

  return (
    <div
      className="flex items-center justify-between py-3.5 border-b border-slate-50"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-sm font-bold" style={{ color: valueColor || "#1e293b" }}>
          {value}
        </span>
        <ChevronRight />
      </div>
    </div>
  );
};

export default function PerformanceOverview() {
  const [tab, setTab] = useState("Overall");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const userdashboarddata = useSelector(
    (state: any) => state?.Auth?.userDashboard,
  );

  const checkpurchaseExam =
    userdashboarddata?.checkpurchaseExam?.[0]?.totalPublishedMocks ?? 0;

  const completed = userdashboarddata?.summary?.attempted || 0;
  const total = checkpurchaseExam;

  // Prevent divide by zero
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  // Dynamic data from userexamresultSection
  const resultSection = userdashboarddata?.userexamresultSection?.[0];
  const strongestSection = resultSection?.highest?.[0]?.sectionName || "N/A";
  const weakestSection = resultSection?.lowest?.[0]?.sectionName || "N/A";

  return (
    <div className="my-2">
      <div
        className="bg-white   w-full "
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-extrabold text-slate-800">
              Performance Overview
            </span>
            <div className="w-2 h-2 rounded-full bg-slate-200" />
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-0.5">
            {["Overall"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border-none ${
                  tab === t
                    ? "bg-white text-slate-800 shadow-sm"
                    : "bg-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-7 items-start">
          {/* Left: Circular Progress + Streak */}
          <div className="flex flex-col items-center shrink-0">
            <CircularProgress percentage={percentage} />
            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 font-bold text-sm rounded-xl px-4 py-2 mt-3 shadow-sm">
              <FlameIcon color="#f97316" />
              {completed} Attempted
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex-1 min-w-0">
            <StatRow
              label="Score Accuracy"
              value={`${userdashboarddata?.attemptcountdailybasis?.[0]?.totalAttempts || 0}%`}
              valueColor="#d97706"
              animateDelay={300} 
              icon={undefined}            
            />
            
            <StatRow
              label="Strongest"
              value={strongestSection}
              icon={<ArrowUp color="#16a34a" />}
              valueColor="#16a34a"
              animateDelay={450} 
            />

            {/* Weakest — last row, no border */}
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-sm font-medium text-slate-500">Weakest</span>
              <div className="flex items-center gap-1.5">
                <FlameIcon color="#ef4444" />
                <span className="text-sm font-bold text-slate-800">
                  {weakestSection}
                </span>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}