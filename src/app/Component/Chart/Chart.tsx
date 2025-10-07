// Import Shadcn's Card components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Utility to join class names
import { cn } from '@/lib/utils';

// DonutChart component
type DonutChartProps = {
  data: number[];
  colors: string[];
  size?: number;
  strokeWidth?: number;
};

const DonutChart = ({
  data,
  colors,
  size = 150,
  strokeWidth = 30,
}: DonutChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative w-full flex justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {data.map((value, index) => {
          const strokeDashoffset =
            circumference - (value / 100) * circumference;
          const currentOffset = offset;
          offset += (value / 100) * circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              style={{
                transformOrigin: 'center',
                transform: `rotate(${currentOffset}deg)`,
                transition: 'stroke-dashoffset 0.3s ease-out',
              }}
            />
          );
        })}
      </svg>
      {/* White circle in middle to make donut */}
      <div
        className=" rounded-full"
      
      />
    </div>
  );
};

export const ImpactChart = () => {
  const chartData = {
    with: {
      data: [70, 15, 15],
      colors: ['#FF5635', '#80707B', '#000000'],
      labels: [
        { text: '70% Confident & Prepared', color: '#FF5635' },
        { text: '15% Struggle with Time', color: '#000000' },
        { text: '15% High Anxiety', color: '#80707B' },
      ],
    },
    without: {
      data: [30, 35, 35],
      colors: ['#FF5635', '#80707B', '#000000'],
      labels: [
        { text: '30% Confident & Prepared', color: '#FF5635' },
        { text: '35% Struggle with Time', color: '#000000' },
        { text: '35% High Anxiety', color: '#80707B' },
      ],
    },
  };

  return (
    <div className="bg-[#F7F7F5] mt-5 p-6 md:p-8 flex flex-col items-center">
      <h1 className="text-xl md:text-2xl font-normal textorange mb-8 text-center">
        Impact of Online Practice
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* With Online Mock Exams */}
        <Card className="w-full text-center shadow-none border-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-[#000000] text-lg md:text-xl">
              With Online Mock Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <DonutChart
                data={chartData.with.data}
                colors={chartData.with.colors}
                size={140}
                strokeWidth={28}
              />
              <div className="mt-4 space-y-1">
                {chartData.with.labels.map((label, index) => (
                  <p
                    key={index}
                    className={cn(
                      'text-sm md:text-lg',
                      label.text.includes('70%') && 'text-[#FF5635]',
                      label.text.includes('15% High Anxiety') &&
                        'text-[#80707B]',
                    )}
                  >
                    {label.text}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Without Online Mock Exams */}
        <Card className="w-full text-center shadow-none border-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-[#000000] text-lg md:text-xl">
              Without Online Mock Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <DonutChart
                data={chartData.without.data}
                colors={chartData.without.colors}
                size={140}
                strokeWidth={28}
              />
              <div className="mt-4 space-y-1">
                {chartData.without.labels.map((label, index) => (
                  <p
                    key={index}
                    className={cn(
                      'text-sm md:text-lg',
                      label.text.includes('30%') && 'text-[#FF5635]',
                      label.text.includes('35% High Anxiety') &&
                        'text-[#80707B]',
                    )}
                  >
                    {label.text}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
