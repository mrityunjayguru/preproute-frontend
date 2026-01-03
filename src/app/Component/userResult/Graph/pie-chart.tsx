import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#0B5FFF", "#6D5DFB", "#00B8D9", "#FF8B00"];

interface TimePieProps {
  data: { name: string; value: number }[];
}

export const TimeDonutChart = ({ data }: TimePieProps) => {
  return (
    <div className="w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Optional tooltip */}
          <Tooltip
            formatter={(value: number) => `${value} min`}
            contentStyle={{
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
