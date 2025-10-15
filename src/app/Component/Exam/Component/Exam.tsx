"use client";
import { getUserQuestionData } from "@/api/QuestionPaper";
import { AppDispatch } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// --- Utility Components (mimicking shadcn/ui) ---

// Lock Icon (lucide-react style)
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Button Component
type ButtonProps = {
  variant?: "default" | "secondary" | "primary" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const variantStyles = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Exam Card ---
const MockExamCard = ({ exam }: { exam: any }) => {
    const router = useRouter();
  
  const dispatch=useDispatch<AppDispatch>()

  const handleExma=(data:any)=>{
    const payload:any={
      examTypeId:data?.examTypeId,
      examid:data?.examid,
      questionPapername:data?.questionPapername,
    }
    dispatch(getUserQuestionData(payload))
    router.push("userExam");

  }
  return (
    <Card
      className={`p-6 flex flex-col h-full ${
        exam.isLocked ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Mock Exam
          </span>
          <h3
            className={`text-xl font-bold mt-1 ${
              exam.isLocked ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {exam.questionPapername || "Untitled Exam"}
          </h3>
          {exam.status === "Free" && (
            <span className="text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              Free
            </span>
          )}
        </div>
        {exam.isLocked && <LockIcon className="mt-1" />}
      </div>

      <p
        className={`text-sm mt-auto ${
          exam.isLocked ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {exam.description || "Unattempted"}
      </p>

      {!exam.isLocked && (
        <Button onClick={()=>{handleExma(exam)}}
          variant="secondary"
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 self-start"
        >
          Start
        </Button>
      )}
    </Card>
  );
};

const UserExam = () => {
  const examById = useSelector((state: any) => state?.exam?.examById) || [];
  const selectedExamType=useSelector((state:any)=>state.examType?.selectedExamType)
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="container mx-auto px-6 md:px-12 py-10">
        {/* Header Section */}
        <div className="mb-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          {(examById && examById.length > 0
  ? examById[0]?.exam?.examname
  : "") + ": " + (selectedExamType?.examType || "")}


          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            The Prep Route mock tests are carefully designed to mirror the
            question style, difficulty level, and time pressure of the actual
            exam. Read this document to learn more.
          </p>
        </div>

        {/* Mock Exam Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {examById?.length > 0 ? (
            examById.map((exam: any, index: number) => (
              <MockExamCard key={exam._id || index} exam={exam} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No exams available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserExam;
