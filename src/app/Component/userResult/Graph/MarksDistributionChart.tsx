import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from 'recharts';

const MarksVsStudentsChart = ({ data }) => {
  // 1. Find the data point with the highest number of students for the "Peak" line
  const peakData = data.reduce((prev, current) => {
    return (prev.students > current.students) ? prev : current;
  }, data[0]);

  // 2. Define custom tick formatters and domains to match the image
  const xAxisDomain = [-30, 360]; // Based on the image's X-axis
  const yAxisDomain = [0, 600];   // Based on the image's Y-axis

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          <XAxis
            dataKey="marks"
            type="number"
            domain={xAxisDomain}
            tickCount={14} // To get ticks every 30 units (-30, 0, 30, ...)
            label={{ value: 'Marks Obtained →', position: 'bottom', offset: 0 }}
          />
          
          <YAxis
            domain={yAxisDomain}
            tickCount={5} // To get ticks every 150 units (0, 150, 300, ...)
          />
          
          <Tooltip
            formatter={(value, name) => [value, 'Students']}
            labelFormatter={(label) => `Marks: ${label}`}
          />
          
          {/* The "Peak" Reference Line */}
          {peakData && (
            <ReferenceLine
              x={peakData.marks}
              stroke="#FF5635"
              strokeDasharray="3 3"
            >
              <Label
                value="Peak"
                position="top"
                fill="#FF5635"
                offset={10}
              />
            </ReferenceLine>
          )}
          
          <Line
            type="monotone" // Creates the smooth curve
            dataKey="students"
            stroke="#FF5635"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#FF5635', strokeWidth: 2, fill: '#fff' }} // Styles the data points
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Example usage with the data structure you provided
const App = () => {
  // Replace this with your actual data source:
  const examResult = useSelector(
        (state: any) => state.question?.result?.data
      );
  const sampleData = [
    { marks: -20, students: 20 },
    { marks: 0, students: 250 },
    { marks: 20, students: 380 },
    { marks: 45, students: 310 },
    { marks: 70, students: 455 },
    { marks: 100, students: 480 }, // Peak
    { marks: 135, students: 435 },
    { marks: 165, students: 300 },
    { marks: 190, students: 130 },
    { marks: 220, students: 30 },
    { marks: 250, students: 5 },
    { marks: 280, students: 1 },
    { marks: 310, students: 0 },
    { marks: 340, students: 0 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Exam Results Summary</h3>
      <MarksVsStudentsChart data={examResult?.summarylogsresult} />
    </div>
  );
};

export default App;