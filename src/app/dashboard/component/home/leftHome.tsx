import { getDashboardData } from "@/api/dashboard";
import { handleSelectedExamDetail, handleUpdateStaus } from "@/api/Exam";
import { formatDateTime } from "@/Common/ComonDate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const ExamList = ({ exams }: any) => (
  <Card className="col-span-12 lg:col-span-7 h-fit bg-[#F7F7F5] p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">Recently Created Exam</h2>
      <h2 className="textorange cursor-pointer">Show All</h2>
    </div>

    <div className="space-y-4">
      {exams && exams.length>0 && exams.map((exam: any,i:any) => {
       
        return <ExamCard key={i} exam={exam} />;
      })}
    </div>
  </Card>
);

const ExamCard = ({ exam }: any) => {
  const dispatch=useDispatch<AppDispatch>()
    const router = useRouter();
  const isDraft = exam.status === "Draft";

  const handleEdit = async(val: any) => {
       const payload: any = {
          examid:val.examid,
          examTypeId:val.examTypeId,
          questionPapername: val.questionPapername, // can be year or set name
        };
        await dispatch(handleSelectedExamDetail(payload))
        router.push("manageExam");
  };
const updateStatus=async(val:any)=>{

  const payload:any={
_id:val._id,
isPublished:!val.isPublished
  }
 await dispatch(handleUpdateStaus(payload))
await dispatch(getDashboardData(payload))
}
  return (
    <div className="flex flex-col w-full bg-white px-5 py-4 rounded-md shadow-sm border">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {exam.questionPapername} - <span className="textorange">{exam.examDetail.examname}</span>
          </h3>
          <p className="text-xs text-gray-500">Created on: {formatDateTime(exam.createdAt)}</p>
        </div>

        <div className="flex flex-col text-left md:text-right">
          <span className="text-xs textorange font-medium">Expert- <strong>{exam?.userDetail?.username}</strong> </span>
          <span className="text-sm font-semibold text-gray-800">{exam.person}</span>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="text-xs font-semibold text-gray-600">{exam.status}</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Progress */}
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">{exam.overallCompletion}% Completed</p>
          <Progress value={exam.overallCompletion} />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2 shrink-0">
          <Button onClick={() => handleEdit(exam)} variant="edit">Edit</Button>
          {exam.overallCompletion=="100"?(
           <Button  onClick={()=>updateStatus(exam)} variant="orange"> {exam?.isPublished==true?"Publish":"Un Published"} </Button>
          ):(null)}
        </div>
      </div>
    </div>
  );
};
