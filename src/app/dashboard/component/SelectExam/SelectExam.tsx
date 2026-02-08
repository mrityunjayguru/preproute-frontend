"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getexam, handleSelectedExamDetail } from "@/api/Exam";
import { getExamType } from "@/api/ExamType";
import { createQuestionPaper } from "@/api/QuestionPaper";
import Footer from "@/app/layouts/_component/footer";
import { getSubTopicByTopicId } from "@/api/subTopic";
import { getCollege } from "@/api/college";

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examTypeId, setExamTypeId] = useState("");
  const [subExamTypeId, setSubExamTypeId] = useState("");
  const [examId, setExamId] = useState("");
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const [yearOrSet, setYearOrSet] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [selectedSubTopicId, setSelectedSubTopicId] = useState("");
  const [level, setLevel] = useState("");
  const [subtopic, setSubtopic] = useState<any[]>([]);

  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];
  const examList = useSelector((state: any) => state.exam.exam) || [];
  const college =useSelector((state:any)=>state.college.college)
  const selectedExamType = examTypeData.find(
    (e: any) => e._id === examTypeId,
  );

  // ================= FETCH EXAM TYPES =================
  useEffect(() => {
    dispatch(getExamType({}));
  }, [dispatch]);

  // ================= YEARS / MOCK SETS =================
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const mockSets = Array.from({ length: 50 }, (_, i) => `Mock ${i + 1}`);
  const topicTests = Array.from({ length: 10 }, (_, i) => `Test ${i + 1}`);

  // ================= HANDLERS =================
  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setExamTypeId(id);
    setSubExamTypeId("");
    setExamId("");
    setSelectedExam(null);
    setYearOrSet("");
    setSelectedSectionId("");
    setSelectedTopicId("");
    setSelectedSubTopicId("");
    setLevel("");
    setSubtopic([]);
     dispatch(
      getexam({
        examtypeId: id,
      }),
    );
  };

  const handleSubExamTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = e.target.value;
    setSubExamTypeId(id);

    dispatch(
      getexam({
        examtypeId: examTypeId,
        subExamTypeId: id,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      examid: examId,
      examTypeId,
      examformat: selectedExamType?.examType?.toLowerCase(),
    };

    if (subExamTypeId) payload.subExamTypeId = subExamTypeId;
    if (yearOrSet) payload.questionPapername = yearOrSet;
    if (selectedSectionId) payload.sectionId = selectedSectionId;
    if (selectedTopicId) payload.topicId = selectedTopicId;
    if (selectedSubTopicId) payload.subTopicId = selectedSubTopicId;
    if (level) payload.level = level.toLowerCase();

    const res: any = await dispatch(createQuestionPaper(payload));
    if (res.payload === true) {
      await dispatch(handleSelectedExamDetail(payload));
      router.push("manageExam");
    }
  };

  // ================= DERIVED =================
  const sections = selectedExam?.sections || [];
  const topics =
    sections.find((s: any) => s.sectionDetail?._id === selectedSectionId)
      ?.topics || [];

  // ================= SUBTOPIC =================
  useEffect(() => {
    if (!selectedTopicId) return;

    dispatch(getSubTopicByTopicId({ topicId: selectedTopicId })).then(
      (res: any) => setSubtopic(res.payload || []),
    );
  }, [selectedTopicId, dispatch]);

  // useEffect(()=>{
  //   const payload:any={
  //     examTypes:subExamTypeId
  //   }
  //   if(examTypeId){
  //     payload.examTypeId=examTypeId
  //   }
  //   if(subExamTypeId){
  //     payload.examTypeId=subExamTypeId
  //   }
  //    dispatch(getCollege(payload));
  // },[subExamTypeId,examTypeId])


  // ================= UI =================
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="mx-auto px-6 mb-8">
          <div className="bg-[#F0F9FF] rounded-lg px-8 py-6">
            <h1 className="text-[#FF5635] text-2xl font-poppins">
              Create Exam
            </h1>
          </div>
        </div>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6"
          >
            {/* Exam Type */}
            <select
              value={examTypeId}
              onChange={handleExamTypeChange}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border"
            >
              <option value="">Choose Exam Type</option>
              {examTypeData.map((t: any) => (
                <option key={t._id} value={t._id}>
                  {t.examType}
                </option>
              ))}
            </select>

            {/* Sub Exam Type (CUET / IPMAT) */}
            {selectedExamType?.subMenuExists && (
              <select
                value={subExamTypeId}
                onChange={handleSubExamTypeChange}
                className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border"
              >
                <option value="">Choose Sub Exam</option>
                {selectedExamType.subMenus.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.subExamType}
                  </option>
                ))}
              </select>
            )}

            {/* Exam */}
            <select
              value={examId}
              onChange={(e) => {
                const id = e.target.value;
                setExamId(id);
                setSelectedExam(examList.find((x: any) => x._id === id));
              }}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border"
            >
              <option value="">Choose Exam</option>
              {examList.map((ex: any) => (
                <option key={ex._id} value={ex._id}>
                  {ex.examname}
                </option>
              ))}
            </select>

            {/* Mock / Year */}
            {selectedExamType?.examType === "PYQs" ? (
              <select
                value={yearOrSet}
                onChange={(e) => setYearOrSet(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-[8px] border"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={yearOrSet}
                onChange={(e) => setYearOrSet(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-[8px] border"
              >
                <option value="">Select Mock</option>
                {mockSets.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-[#FF5635] text-white rounded-[8px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectExamForm;
