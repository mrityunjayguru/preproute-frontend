import { Card } from "@/components/ui/card";

type Stat = {
  label: string;
  subtitle: string;
  color: string;
  value: string | number;
};

type StatsCardProps = {
  stats: Stat[];
};

export const StatsCard = ({ stats }: StatsCardProps) => (
  <Card className="col-span-12 sm:col-span-4 lg:col-span-5 grid grid-cols-3 gap-4 bg-[#F7F7F5]">
    {stats.map((stat, index) => (
      <div key={index} className="text-center p-2">
        <p className="text-sm font-medium text-gray-500">
          {stat.label}
          <span className={`block text-xs ${stat.color}`}>{stat.subtitle}</span>
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
      </div>
    ))}
  </Card>
);