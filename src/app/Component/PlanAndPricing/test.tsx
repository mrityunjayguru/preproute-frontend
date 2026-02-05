import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const ExamDropdown = ({ examTypeData }: any) => {
  const handleExamClick = (exam: any) => {
    console.log("Exam Selected:", exam.examType);
  };

  const handleSubExamClick = (exam: any, sub: any) => {
    console.log("Exam:", exam.examType, "SubExam:", sub.subExamType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-4 py-2 border rounded-md">
        Select Exam
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        {examTypeData.map((exam: any) => (
          exam.subMenuExists && exam.subMenus?.length ? (
            // ✅ SUB MENU
            <DropdownMenuSub key={exam._id}>
              <DropdownMenuSubTrigger className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]">
                {exam.examType}
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent className="w-48">
                {exam.subMenus.map((sub: any) => (
                  <DropdownMenuItem
                    key={sub._id}
                    onClick={() => handleSubExamClick(exam, sub)}
                    className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]"
                  >
                    {sub.subExamType}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            // ✅ NO SUB MENU
            <DropdownMenuItem
              key={exam._id}
              onClick={() => handleExamClick(exam)}
              className="cursor-pointer hover:bg-orange-50 hover:text-[#FF5635]"
            >
              {exam.examType}
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExamDropdown;
