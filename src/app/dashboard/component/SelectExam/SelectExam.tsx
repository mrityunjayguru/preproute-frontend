"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getexam, handleSelectedExamDetail } from "@/api/Exam";
import { getExamType } from "@/api/ExamType";
import { createQuestionPaper } from "@/api/QuestionPaper";
import { getSubTopicByTopicId } from "@/api/subTopic";
import Footer from "@/app/layouts/_component/footer";

// Reusable Select Component
const FormSelect = ({ value, onChange, options, placeholder, labelKey = "label", valueKey = "value" }: any) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border focus:outline-none focus:ring-2 focus:ring-[#FF5635]/20"
  >
    <option value="">{placeholder}</option>
    {options?.map((opt: any) => (
      <option key={opt[valueKey]} value={opt[valueKey]}>
        {opt[labelKey]}
      </option>
    ))}
  </select>
);

const SelectExamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ================= STATE =================
  const [formData, setFormData] = useState({
    examTypeId: "",
    subExamTypeId: "",
    examId: "",
    selectedSectionId: "",
    level: "",
    selectedTopicId: "",
    subTopicId: "", // ✅ Added
    testName: "",
    year: "",
  });

  const [selectedExam, setSelectedExam] = useState<any>(null);

  // ================= STORE =================
  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
  const examList = useSelector((state: any) => state.exam.exam) || [];
  const subTopicData = useSelector((state: any) => state.subTopic.subTopic) || [];

  // ================= DERIVED DATA =================
  const selectedExamType = useMemo(() => 
    examTypeData.find((e: any) => e._id === formData.examTypeId), 
  [examTypeData, formData.examTypeId]);

  const examFormat = selectedExamType?.examType?.toLowerCase();
  
  const isCUET = useMemo(() => {
    const sub = selectedExamType?.subMenus?.find((s: any) => s._id === formData.subExamTypeId);
    return sub?.subExamType?.toLowerCase() === "cuet";
  }, [selectedExamType, formData.subExamTypeId]);

  const sections = selectedExam?.sections || [];
  
  const topicsBySection = useMemo(() => 
    sections.find((s: any) => s.sectionDetail?._id === formData.selectedSectionId)?.topics || [],
  [sections, formData.selectedSectionId]);

  // ================= FETCHING =================
  useEffect(() => {
    dispatch(getExamType({}));
  }, [dispatch]);

  useEffect(() => {
    if (formData.selectedTopicId) {
      dispatch(getSubTopicByTopicId({ topicId: formData.selectedTopicId }));
    }
  }, [formData.selectedTopicId, dispatch]);

  // ================= CONSTANTS =================
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({ val: currentYear - i, lbl: currentYear - i }));
  const mocks = Array.from({ length: 10 }, (_, i) => ({ val: `Mock ${i + 1}`, lbl: `Mock ${i + 1}` }));
  const tests = Array.from({ length: 10 }, (_, i) => ({ val: `Test ${i + 1}`, lbl: `Test ${i + 1}` }));

  // ================= HANDLERS =================
  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setFormData({
      examTypeId: id, subExamTypeId: "", examId: "", selectedSectionId: "",
      level: "", selectedTopicId: "", subTopicId: "", testName: "", year: ""
    });
    setSelectedExam(null);
    dispatch(getexam({ examtypeId: id }));
  };

  const handleSubExamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    updateForm({ subExamTypeId: id, examId: "" });
    setSelectedExam(null);
    dispatch(getexam({ examtypeId: formData.examTypeId, subExamTypeId: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      examid: formData.examId,
      examTypeId: formData.examTypeId,
      examformat: examFormat,
    };
console.log(formData,"selectedSectionId")
    if (formData.subExamTypeId) payload.subExamTypeId = formData.subExamTypeId;
if(formData.subExamTypeId){
  payload.subExamTypeId=formData.subExamTypeId
}
    switch (examFormat) {
      case "sectional":
        payload.sectionId = formData.selectedSectionId;
        payload.questionPapername = formData.testName;
        break;
      case "topic wise":
        payload.sectionId = formData.selectedSectionId;
        payload.level = formData.level.toLowerCase();
        payload.topicId = formData.selectedTopicId;
        payload.subTopicId = formData.subTopicId; // ✅ Passed subTopicId
        payload.questionPapername = formData.testName;
        break;
          case "daily practice":
        payload.sectionId = formData.selectedSectionId;
        payload.questionPapername = formData.testName;
        break;
      case "mocks":
        payload.questionPapername = formData.testName;
        break;
      case "pyqs":
        payload.questionPapername = formData.year;
        break;
    }

    const res: any = await dispatch(createQuestionPaper(payload));
    if (res.payload === true) {
      dispatch(handleSelectedExamDetail(payload));
      router.push("manageExam");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="mx-auto px-6 mb-8 mt-4">
          <div className="bg-[#F0F9FF] rounded-lg px-8 py-6">
            <h1 className="text-[#FF5635] text-2xl font-poppins font-semibold">Create Exam</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
            
            <FormSelect 
              value={formData.examTypeId}
              onChange={handleExamTypeChange}
              options={examTypeData}
              placeholder="Choose Exam Type"
              labelKey="examType"
              valueKey="_id"
            />

            {selectedExamType?.subMenuExists && (
              <FormSelect 
                value={formData.subExamTypeId}
                onChange={handleSubExamTypeChange}
                options={selectedExamType.subMenus}
                placeholder="Choose Sub Exam"
                labelKey="subExamType"
                valueKey="_id"
              />
            )}

            {formData.examTypeId && (
              <FormSelect 
                value={formData.examId}
                onChange={(e: any) => {
                  const id = e.target.value;
                  updateForm({ examId: id });
                  setSelectedExam(examList.find((x: any) => x._id === id));
                }}
                options={examList}
                placeholder={isCUET ? "Choose Subject" : "Choose Exam"}
                labelKey={isCUET ? "subjectName" : "examname"}
                valueKey="_id"
              />
            )}

            {(examFormat === "sectional" || examFormat === "topic wise") && (
              <FormSelect 
                value={formData.selectedSectionId}
                onChange={(e: any) => updateForm({ selectedSectionId: e.target.value, level: "", selectedTopicId: "", subTopicId: "" })}
                options={sections.map((s: any) => ({ val: s.sectionDetail._id, lbl: s.sectionDetail.section }))}
                placeholder="Choose Section"
                labelKey="lbl"
                valueKey="val"
              />
            )}
  {(examFormat === "daily practice") && (
              <FormSelect 
                value={formData.selectedSectionId}
                onChange={(e: any) => updateForm({ selectedSectionId: e.target.value, level: "", selectedTopicId: "", subTopicId: "" })}
                options={sections.map((s: any) => ({ val: s.sectionDetail._id, lbl: s.sectionDetail.section }))}
                placeholder="Choose Section"
                labelKey="lbl"
                valueKey="val"
              />
            )}

            {examFormat === "topic wise" && formData.selectedSectionId && (
              <>
                <FormSelect 
                  value={formData.level}
                  onChange={(e: any) => updateForm({ level: e.target.value, selectedTopicId: "", subTopicId: "" })}
                  options={[{val: "Basic", lbl: "Basic"}, {val: "Advance", lbl: "Advance"}, {val: "Expert", lbl: "Expert"}]}
                  placeholder="Choose Level"
                  labelKey="lbl"
                  valueKey="val"
                />
                
                {formData.level && (
                  <FormSelect 
                    value={formData.selectedTopicId}
                    onChange={(e: any) => updateForm({ selectedTopicId: e.target.value, subTopicId: "" })}
                    options={topicsBySection.map((t: any) => ({ val: t._id, lbl: t.topic }))}
                    placeholder="Choose Topic"
                    labelKey="lbl"
                    valueKey="val"
                  />
                )}

                {/* ✅ Sub Topic Selection */}
                {formData.selectedTopicId && (
                  <FormSelect 
                    value={formData.subTopicId}
                    onChange={(e: any) => updateForm({ subTopicId: e.target.value })}
                    options={subTopicData.map((st: any) => ({ val: st._id, lbl: st.subtopic }))}
                    placeholder="Choose Sub-Topic"
                    labelKey="lbl"
                    valueKey="val"
                  />
                )}
              </>
            )}

            {(examFormat === "mocks" || examFormat === "sectional" || examFormat === "topic wise"  || examFormat === "daily practice") && (
              <FormSelect 
                value={formData.testName}
                onChange={(e: any) => updateForm({ testName: e.target.value })}
                options={examFormat === "topic wise" ? tests : mocks}
                placeholder={examFormat === "topic wise" ? "Choose Test" : "Choose Mock"}
                labelKey="lbl"
                valueKey="val"
              />
            )}

            {examFormat === "pyqs" && (
              <FormSelect 
                value={formData.year}
                onChange={(e: any) => updateForm({ year: e.target.value })}
                options={years}
                placeholder="Choose Year"
                labelKey="lbl"
                valueKey="val"
              />
            )}

            <button
              type="submit"
              disabled={!formData.examId}
              className="w-full py-3 mt-2 bg-[#FF5635] text-white rounded-[8px] font-semibold hover:bg-[#e44d2f] transition-all disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectExamForm;