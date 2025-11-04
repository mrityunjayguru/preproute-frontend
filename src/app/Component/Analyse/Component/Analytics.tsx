import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchAttemptedExam, QuestionPaperResult } from "@/api/Users";
import { useRouter } from "next/navigation";

function Analytics() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.user?.AttemptedExam || []);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const payload: any = {};
      await dispatch(fetchAttemptedExam(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnalysis = async(examId: any) => {
const payload:any={
    examId:examId._id
}
   await dispatch(QuestionPaperResult(payload))
    console.log("Show analysis for:", examId);
      router.push("/Exam/result");

    // You can navigate or open modal here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Attempted Exams</h1>

      {data.length === 0 ? (
        <div className="text-gray-500 text-center mt-10">No exams attempted yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((exam: any) => (
            <div
              key={exam._id}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {exam?.examdetail?.examname || "Untitled Exam"}
              </h2>

              <p className="text-sm text-gray-600 mb-1">
                <strong></strong> {exam?.questionPaperDetails?.questionPapername || "N/A"}
              </p>
             

              <button
                onClick={() => handleAnalysis(exam)}
                className="cursor-pointer mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                View Analysis
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Analytics;
