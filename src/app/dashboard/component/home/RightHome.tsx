import { Card } from "@/components/ui/card";
type ExamData = {
    views: number;
    // Add other properties if needed
};

interface TopExamsChartProps {
    data: ExamData[];
}

export const TopExamsChart = ({ data }: TopExamsChartProps) => {
    // Find the max value for scaling
    const maxView = Math.max(...data.map(item => item.views));

    return (
        <Card className="col-span-12 sm:col-span-8 lg:col-span-5 mt-4 sm:mt-0 bg-[#F7F7F5] px-5">
            <h2 className="text-xl font-normal text-[#000000] mb-6">Top Performing Exams</h2>
            <div className="flex h-56 items-end justify-around space-x-2 border-b-2 border-l-2 border-[#FF5635]">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center h-full justify-end ">
                        <div 
                            className="w-3  rounded-t-lg bg-[#FF5635] transition-all duration-500 ease-out hover:bg-red-600"
                            style={{ height: `${(item.views / maxView) * 90 + 10}%` }} // Scale bar height (10% base minimum)
                        ></div>
                    </div>
                ))}
            </div>
            <p className="text-center text-xl font-medium text-[#000000] ">
                Top Ten Exams
            </p>
        </Card>
    );
};


