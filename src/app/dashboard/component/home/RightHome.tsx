"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ExamData = {
  name: string;
  views: number;
};

interface TopExamsChartProps {
  data: ExamData[];
}

const chartConfig = {
  views: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const TopExamsChart = ({ data }: TopExamsChartProps) => {
  return (
    <Card className="col-span-12 sm:col-span-8 lg:col-span-5 mt-4 sm:mt-0 bg-[#F0F9FF] border-none shadow-none font-poppins">
      <CardHeader>
        <CardTitle className="text-xl font-normal text-[#000000]">
          Top Performing Exams
        </CardTitle>
        <CardDescription>Student participation per exam</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
              right: 40,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="views" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="views"
              layout="vertical"
              fill="#FF5635"
              radius={[0, 4, 4, 0]}
              barSize={30}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-white font-medium"
                fontSize={12}
              />
              <LabelList
                dataKey="views"
                position="right"
                offset={8}
                className="fill-foreground font-medium"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
