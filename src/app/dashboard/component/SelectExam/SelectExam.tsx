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

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [yearOrSet, setYearOrSet] = useState("");
  const [test,setTest]=useState("")
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [selectedSubTopicId, setSelectedSubTopicId] = useState("");
  const [level, setLevel] = useState("");

  const [subtopic, setSubtopic] = useState<any[]>([]);

  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  const selectedExamTypeName =
    examTypeData.find((t: any) => t._id === examType)?.examType || "";

  // ================= FETCH =================
  useEffect(() => {
    const payload: any = {};
    dispatch(getExamType(payload));
  }, [dispatch]);

  // ================= YEARS / MOCKS =================
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const mockSets = Array.from({ length: 50 }, (_, i) => `Mock ${i + 1}`);
  const topicTest = Array.from({ length: 10 }, (_, i) => `Test ${i + 1}`);


  // ================= HANDLERS =================
  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setExamType(val);
    setExamName("");
    setYearOrSet("");
    setSelectedExam(null);
    setSelectedSectionId("");
    setSelectedTopicId("");
    setSelectedSubTopicId("");
    setLevel("");
    setSubtopic([]);
    dispatch(getexam({ examtypeId: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      examid: examName,
      examTypeId: examType,
      examformat: selectedExamTypeName.toLowerCase(),
    };

    // ✅ ONLY non-topic-wise gets questionPapername
    if (selectedExamTypeName) {
      payload.questionPapername = yearOrSet;
    }

    if (selectedSectionId) payload.sectionId = selectedSectionId;
    if (selectedTopicId) payload.topicId = selectedTopicId;
    if (selectedSubTopicId) payload.subTopicId = selectedSubTopicId;
    if (level) payload.level = level.toLowerCase();

    const response: any = await dispatch(createQuestionPaper(payload));

    if (response.payload === true) {
      await dispatch(handleSelectedExamDetail(payload));
      router.push("manageExam");
    }
  };

  // ================= DERIVED DATA =================
  const sections = selectedExam?.sections || [];

  const topics =
    sections.find((s: any) => s.sectionDetail?._id === selectedSectionId)
      ?.topics || [];

  // ================= SUBTOPIC FETCH =================
  useEffect(() => {
    if (!selectedTopicId) return;

    const fetchSubTopic = async () => {
      const payload: any = { topicId: selectedTopicId };
      const res: any = await dispatch(getSubTopicByTopicId(payload));
      setSubtopic(res?.payload || []);
    };

    fetchSubTopic();
  }, [selectedTopicId, dispatch]);

  // ================= UI =================
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
          <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
            <h1 className="text-[#FF5635] text-2xl font-poppins">
              Create Exam
            </h1>
          </div>
        </div>

        <div className="mx-auto flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-[8px] p-6"
          >
            {/* Exam Type */}
            <select
              value={examType}
              onChange={handleExamTypeChange}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
            >
              <option value="">Choose Exam Type</option>
              {examTypeData.map((type: any) => (
                <option key={type._id} value={type._id}>
                  {type.examType}
                </option>
              ))}
            </select>

            {/* Exam */}
            <select
              value={examName}
              onChange={(e) => {
                const id = e.target.value;
                setExamName(id);
                setSelectedExam(exam.find((ex: any) => ex._id === id));
                setSelectedSectionId("");
                setSelectedTopicId("");
                setSelectedSubTopicId("");
                setLevel("");
              }}
              className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
            >
              <option value="">Choose Exam</option>
              {exam.map((ex: any) => (
                <option key={ex._id} value={ex._id}>
                  {ex.examname}
                </option>
              ))}
            </select>

            {/* Section */}
            {(selectedExamTypeName.toLowerCase() === "sectional" ||
              selectedExamTypeName.toLowerCase() === "topic wise") &&
              sections.length > 0 && (
                <select
                  value={selectedSectionId}
                  onChange={(e) => {
                    setSelectedSectionId(e.target.value);
                    setSelectedTopicId("");
                    setSelectedSubTopicId("");
                    setLevel("");
                  }}
                  className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
                >
                  <option value="">Choose Section</option>
                  {sections.map((sec: any) => (
                    <option
                      key={sec.sectionDetail._id}
                      value={sec.sectionDetail._id}
                    >
                      {sec.sectionDetail.section}
                    </option>
                  ))}
                </select>
              )}

            {/* Topic */}
            {selectedExamTypeName.toLowerCase() === "topic wise" &&
              selectedSectionId && (
                <select
                  value={selectedTopicId}
                  onChange={(e) => {
                    setSelectedTopicId(e.target.value);
                    setSelectedSubTopicId("");
                    setLevel("");
                  }}
                  className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
                >
                  <option value="">Choose Topic</option>
                  {topics.map((t: any) => (
                    <option key={t._id} value={t._id}>
                      {t.topic}
                    </option>
                  ))}
                </select>
              )}

            {/* Sub Topic */}
            {selectedTopicId && (
              <select
                value={selectedSubTopicId}
                onChange={(e) => {
                  setSelectedSubTopicId(e.target.value);
                  setLevel("");
                }}
                className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
              >
                <option value="">Choose Subtopic</option>
                {subtopic.map((st: any) => (
                  <option key={st._id} value={st._id}>
                    {st.subtopic}
                  </option>
                ))}
              </select>
            )}

            {/* Level */}
            {selectedTopicId && (
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
              >
                <option value="">Choose Level</option>
                <option value="Basic">Basic</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            )}
               {selectedTopicId && (
               <select
                  value={yearOrSet}
                  onChange={(e) => setYearOrSet(e.target.value)}
                  className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
                >
                  <option value="">Choose Test</option>
                  {topicTest.map((set) => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
                </select>
            )}
            {/* ❌ MOCK / YEAR REMOVED FOR TOPIC WISE */}
            {selectedExamTypeName.toLowerCase() !== "topic wise" &&
              (selectedExamTypeName.toLowerCase() === "pyqs" ? (
                <select
                  value={yearOrSet}
                  onChange={(e) => setYearOrSet(e.target.value)}
                  className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
                >
                  <option value="">Select Year</option>
                  {years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={yearOrSet}
                  onChange={(e) => setYearOrSet(e.target.value)}
                  className="w-full mb-6 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF]"
                >
                  <option value="">Select Mock Set</option>
                  {mockSets.map((set) => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
                </select>
              ))}

            <button
              type="submit"
              className="w-full py-2 bg-[#FF5635] text-white rounded-[8px] font-poppins"
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
