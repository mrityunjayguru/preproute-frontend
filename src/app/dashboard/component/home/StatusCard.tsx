import { Card } from "@/components/ui/card";

type Stat = {
  label: string;
  value: string | number;
};

type StatsCardProps = {
  stats: Stat[];
};

export const StatsCard = ({ stats }: StatsCardProps) => (
  <div className="col-span-12 sm:col-span-4 lg:col-span-5 flex flex-col gap-2">
    <h2 className="text-lg font-medium font-poppins text-[#0056D2]">Exams</h2>
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 border border-[#E6EFFC] rounded-lg bg-[#F0F9FF]  flex flex-col items-center justify-center gap-2"
        >
          <p className="text-sm font-medium font-dm-sans text-[#0056D2]">{stat.label}</p>
          <p className="text-2xl font-medium font-poppins text-black">{stat.value}</p>
        </div>
      ))}
    </div>
  </div>
);