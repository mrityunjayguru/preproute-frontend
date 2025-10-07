import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ExamStatus = "Draft" | "Published" | "Archived" | string;

type Exam = {
  id: string;
  type: string;
  name: string;
  date: string;
  progress: number;
  person: string;
  status: ExamStatus;
  publishedDate?: string;
};

type ExamListProps = {
  exams: any;
};

export const ExamList = ({ exams }: ExamListProps) => (
  <Card className="col-span-12 lg:col-span-7 h-fit bg-[#F7F7F5] p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">Recently Created Exam</h2>
      <h2 className="textorange cursor-pointer">Show All</h2>
    </div>
    <div className="space-y-4">
      {exams.map((exam: { id: any; type?: string; name?: string; date?: string; progress?: number; person?: string; status?: string; publishedDate?: string | undefined; }) => {
        const safeExam: Exam = {
          id: exam.id ?? "",
          type: exam.type ?? "",
          name: exam.name ?? "",
          date: exam.date ?? "",
          progress: exam.progress ?? 0,
          person: exam.person ?? "",
          status: exam.status ?? "Draft",
          publishedDate: exam.publishedDate,
        };
        return <ExamCard key={safeExam.id} exam={safeExam} />;
      })}
    </div>
  </Card>
);

const ExamCard = ({ exam }: { exam: Exam }) => {
  const isDraft = exam.status === "Draft";

  return (
    <div className="flex flex-col w-full bg-white px-5 py-4 rounded-md shadow-sm border">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            Expert - <span className="textorange">{exam.name}</span>
          </h3>
          <p className="text-xs text-gray-500">Created on: {exam.date}</p>
        </div>

        <div className="flex flex-col text-left md:text-right">
          <span className="text-xs textorange font-medium">Expert</span>
          <span className="text-sm font-semibold text-gray-800">
            {exam.person}
          </span>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="text-xs font-semibold text-gray-600">
            {exam.status}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Progress */}
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">
            {exam.progress}% Completed
          </p>
          <Progress className="" value={exam.progress} />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2 shrink-0">
          <Button variant="edit">Edit</Button>
          {isDraft ? (
            <Button variant="orange" >
              Publish
            </Button>
          ) : (
            <Button
              variant="orange"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
