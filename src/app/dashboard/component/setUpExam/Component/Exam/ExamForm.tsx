"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  createexam,
  getexam,
  handlesetUpdateExam,
  handleUpdateExam,
} from "@/api/Exam";
import { getsection } from "@/api/Section";
import { getExamType } from "@/api/ExamType";

interface SectionData {
  sectionId?: string;
  topic?: string[];
  noOfQuestions: string;
  duration: string;
  correctMark: string;
  negativeMark: string;
}

const ExamForm: React.FC<{ data?: any }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const updateExamData = useSelector((state: any) => state?.exam?.updateexam);
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const collegeList = useSelector((state: any) => state.college.college);

  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [examName, setExamName] = useState("");
  const [subjectName, setSubjectName] = useState(""); // State for Subject Name
  const [fullExamDuration, setFullExamDuration] = useState("");
  const [isSwitchable, setIsSwitchable] = useState("yes");
  const [iscalculater, setIscalculater] = useState("yes");
  const [mockDate, setMockDate] = useState("");
  const [isSection, setIsSection] = useState("true");
  const [cuetTopics, setCuetTopics] = useState<string[]>([]);

  const [sectionsData, setSectionsData] = useState<SectionData[]>([
    {
      sectionId: "",
      topic: [],
      noOfQuestions: "",
      duration: "",
      correctMark: "",
      negativeMark: "",
    },
  ]);

  const [correctMark, setCorrectMark] = useState("");
  const [negativeMark, setNegativeMark] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedExamTypes, setSelectedExamTypes] = useState<any[]>([]);
  const [selectedSubExamTypes, setSelectedSubExamTypes] = useState<
    {
      examTypeId: string;
      subExamTypeId: string;
      label: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
  const animatedComponents = makeAnimated();

  const examTypeOptions = examTypeData.map((e: any) => ({
    value: e._id,
    label: e.examType,
    subMenuExists: e.subMenuExists,
    subMenus: e.subMenus || [],
  }));

  const topicOptions = topics.map((t: any) => ({
    value: t._id,
    label: t.topic,
  }));

  const collegeData = collegeList.map((val: any) => ({
    label: val.examname,
    value: val._id,
  }));

  // Handle CUET Specific Logic
  useEffect(() => {
    if (selectedCollege?.label === "CUET") {
      setIsSection("false");
    }
  }, [selectedCollege]);

  useEffect(() => {
    const payload: any = { examtypeId: data?.id };
    dispatch(getsection(payload));
    dispatch(getExamType(payload));
  }, [dispatch, data?.id]);

  useEffect(() => {
    const foundExamTypes = examTypeOptions.filter((e: any) =>
      data?.id?.includes(e.value)
    );
    setSelectedExamTypes(foundExamTypes);
  }, [data, examTypeData]);

  // Prefill form in update mode
  useEffect(() => {
    if (updateExamData && updateExamData._id) {
      const formattedDate = updateExamData?.mockDate
        ? new Date(updateExamData.mockDate).toISOString().split("T")[0]
        : "";
      
      setExamName(updateExamData.examname || "");
      setSubjectName(updateExamData.subjectName || ""); // Prefill Subject Name
      setIsSwitchable(updateExamData.switchable ? "yes" : "no");
      setIsSection(updateExamData.isSection ? "true" : "false");
      setIscalculater(updateExamData.iscalculater ? "yes" : "no");
      setMockDate(formattedDate || "");
      setFullExamDuration(updateExamData.fullExamduration?.toString() || "");

      const collegeformet = collegeData.filter((e: any) =>
        updateExamData.collegeId?.includes(e?.value)
      );
      setSelectedCollege(collegeformet[0] || null);

      if (updateExamData.subexamType?.length) {
        const mappedSubs = updateExamData?.subexamType?.map((s: any) => {
          const parent = examTypeOptions.find((e: any) => e.value === s.examTypeId);
          const sub = parent?.subMenus.find((x: any) => x._id === s.subExamTypeId);
          return {
            examTypeId: s.examTypeId,
            subExamTypeId: s.subExamTypeId,
            label: sub?.subExamType,
          };
        });
        setSelectedSubExamTypes(mappedSubs);
      }

      if (updateExamData.isSection) {
        setSectionsData(
          updateExamData.sections?.map((s: any) => ({
            sectionId: s.sectionId || "",
            topic: Array.isArray(s.topics) ? s.topics.map((t: any) => t._id) : [],
            noOfQuestions: s.noOfQuestions?.toString() || "",
            duration: s.duration?.toString() || "",
            correctMark: s.correctMark?.toString() || "",
            negativeMark: s.negativeMark?.toString() || "",
          })) || []
        );
      } else {
        setNoOfQuestions(updateExamData.noOfQuestions?.toString() || "");
        setCorrectMark(updateExamData.correctMark?.toString() || "");
        setNegativeMark(updateExamData.negativeMark?.toString() || "");
        if (updateExamData.topic) {
          setCuetTopics(updateExamData.topic);
        }
      }
      setEditingId(updateExamData._id);
    }
  }, [updateExamData]);

  const handleFieldChange = (index: number, field: keyof SectionData, value: any) => {
    const updated = [...sectionsData];
    (updated[index] as any)[field] = value;
    setSectionsData(updated);
  };

  const handleAddSection = () => {
    setSectionsData([...sectionsData, { sectionId: "", topic: [], noOfQuestions: "", duration: "", correctMark: "", negativeMark: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    if (!window.confirm("Are you sure?")) return;
    setSectionsData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubExamChange = (examTypeId: string, sub: any | null) => {
    setSelectedSubExamTypes((prev) => {
      const filtered = prev.filter((p) => p.examTypeId !== examTypeId);
      if (!sub) return filtered;
      return [...filtered, { examTypeId, subExamTypeId: sub.value, label: sub.label }];
    });
  };

  const handleSubmit = async () => {
    const payload: any = {
      examname: selectedCollege?.label,
      subjectName: subjectName, // Added to payload
      collegeId: selectedCollege?.value,
      switchable: isSwitchable === "yes",
      isSection: isSection === "true",
      mockDate: mockDate,
      iscalculater: iscalculater === "yes",
      examType: [data.id],
      subexamType: selectedSubExamTypes.map((s) => ({
        examTypeId: s.examTypeId,
        subExamTypeId: s.subExamTypeId,
      })),
      fullExamduration: Number(fullExamDuration) || undefined,
    };

    try {
      setLoading(true);
      if (isSection === "true") {
        payload.sections = sectionsData.map((s) => ({
          sectionId: s.sectionId,
          topic: s.topic,
          noOfQuestions: s.noOfQuestions,
          duration: Number(s.duration),
          correctMark: Number(s.correctMark),
          negativeMark: Number(s.negativeMark),
        }));
      } else {
        payload.noOfQuestions = noOfQuestions;
        payload.correctMark = Number(correctMark);
        payload.negativeMark = Number(negativeMark);
        if (selectedCollege?.label === "CUET") payload.topic = cuetTopics;
      }
      console.log(payload,"payloadpayloadpayload")
      if (editingId) {
        await dispatch(handleUpdateExam({ id: editingId, ...payload }));
      } else {
        await dispatch(createexam(payload));
      }

      await dispatch(getexam({ examtypeId: data?.id }));
      handleCancleSubmit();
    } catch (err) {
      alert("Error saving exam!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancleSubmit = () => {
    dispatch(handlesetUpdateExam(null));
    setExamName("");
    setSubjectName(""); // Reset Subject Name
    setFullExamDuration("");
    setIsSwitchable("yes");
    setIsSection("true");
    setSelectedSubExamTypes([]);
    setSelectedCollege(null);
    setCuetTopics([]);
    setSectionsData([{ sectionId: "", topic: [], noOfQuestions: "", duration: "", correctMark: "", negativeMark: "" }]);
    setNoOfQuestions("");
    setCorrectMark("");
    setNegativeMark("");
    setEditingId(null);
    setMockDate("");
  };

  return (
    <div className="p-6 mb-6 font-dm-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {selectedExamTypes.map((exam) =>
          exam.subMenuExists ? (
            <div key={exam.value}>
              <Label className="mb-2 block">Sub Exam Type – {exam.label}</Label>
              <Select
                options={exam.subMenus.map((s: any) => ({ value: s._id, label: s.subExamType }))}
                value={selectedSubExamTypes.filter((x) => x.examTypeId === exam.value).map((x) => ({ value: x.subExamTypeId, label: x.label }))[0] || null}
                onChange={(val) => handleSubExamChange(exam.value, val)}
                placeholder="Select Sub Exam Type"
              />
            </div>
          ) : null
        )}

        <div>
          <Label className="block font-dm-sans text-md mb-1">Exam Name</Label>
          <Select
            options={collegeData}
            value={selectedCollege}
            onChange={(option: any) => setSelectedCollege(option)}
            placeholder="Select College"
            isClearable
            classNamePrefix="react-select"
          />
        </div>

        <div>
          <Label className="mb-1 block font-dm-sans text-md">Exam Duration (In Minutes)</Label>
          <Input
            type="number"
            value={fullExamDuration}
            onChange={(e) => setFullExamDuration(e.target.value)}
            placeholder="0"
            className="px-4 border border-[#D0D5DD] rounded-[2px] focus:ring-0"
          />
        </div>

        {/* CUET Specific Fields */}
        {selectedCollege?.label === "CUET" && (
          <>
            <div>
              <Label className="mb-2 block font-dm-sans text-md">Topics</Label>
              <Select
                isMulti
                options={topicOptions}
                components={animatedComponents}
                value={topicOptions.filter((o: any) => cuetTopics.includes(o.value))}
                onChange={(selected: any) => setCuetTopics(selected ? selected.map((s: any) => s.value) : [])}
                placeholder="Select Topics for CUET"
              />
            </div>
            <div>
              <Label className="mb-1 block font-dm-sans text-md">Subject Name</Label>
              <Input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Enter Subject Name"
                className="px-4 border border-[#D0D5DD] rounded-[2px] focus:ring-0"
              />
            </div>
          </>
        )}
      </div>

      {/* Toggles */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ${selectedCollege?.label === "CUET" ? "hidden" : ""}`}>
        <div>
          <Label className="mb-4 block text-md">Section Based</Label>
          <RadioGroup onValueChange={setIsSection} value={isSection} className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="true" id="section-yes" />
              <Label htmlFor="section-yes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="false" id="section-no" />
              <Label htmlFor="section-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label className="mb-4 block text-md">Switchable Sections</Label>
          <RadioGroup onValueChange={setIsSwitchable} value={isSwitchable} className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="switch-yes" />
              <Label htmlFor="switch-yes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="switch-no" />
              <Label htmlFor="switch-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="mb-4 block text-md">Calculator</Label>
          <RadioGroup onValueChange={setIscalculater} value={iscalculater} className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="calc-yes" />
              <Label htmlFor="calc-yes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="calc-no" />
              <Label htmlFor="calc-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label className="mb-1 block text-md">Next Mock Date</Label>
          <Input value={mockDate} onChange={(e) => setMockDate(e.target.value)} type="date" className="border-[#D0D5DD]" />
        </div>
      </div>

      {/* Section Data Rendering */}
      {isSection === "true" ? (
        <div className="space-y-4">
          {sectionsData.map((item, index) => (
            <div key={index} className="w-full rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] px-5 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-md font-medium text-[#FF5635]">Section {index + 1}</p>
                {sectionsData.length > 1 && (
                  <Button variant="outline" className="text-red-500 border-red-200" onClick={() => handleRemoveSection(index)}>Remove</Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  options={sections.map((s: any) => ({ value: s._id, label: s.section }))}
                  value={sections.map((s: any) => ({ value: s._id, label: s.section })).find((o: any) => o.value === item.sectionId)}
                  onChange={(val: any) => handleFieldChange(index, "sectionId", val?.value)}
                  placeholder="Select Section"
                />
                <Select
                  isMulti
                  options={topicOptions}
                  value={topicOptions.filter((o: any) => item.topic?.includes(o.value))}
                  onChange={(sel: any) => handleFieldChange(index, "topic", sel.map((s: any) => s.value))}
                  placeholder="Select Topics"
                />
                <Input
                  type="number"
                  value={item.noOfQuestions}
                  onChange={(e) => handleFieldChange(index, "noOfQuestions", e.target.value)}
                  placeholder="No. of Questions"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddSection} className="bg-black text-white hover:bg-gray-800">+ Add Section</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Input type="number" value={noOfQuestions} onChange={(e) => setNoOfQuestions(e.target.value)} placeholder="Total Questions" />
          <Input type="number" value={correctMark} onChange={(e) => setCorrectMark(e.target.value)} placeholder="Correct Mark" />
          <Input type="number" value={negativeMark} onChange={(e) => setNegativeMark(e.target.value)} placeholder="Negative Mark" />
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Button onClick={handleSubmit} disabled={loading} className="bg-[#FF5635] text-white px-8">
          {loading ? "Processing..." : editingId ? "Update Exam" : "Create Exam"}
        </Button>
        <Button onClick={handleCancleSubmit} variant="outline" className="px-8">Cancel</Button>
      </div>
    </div>
  );
};

export default ExamForm;