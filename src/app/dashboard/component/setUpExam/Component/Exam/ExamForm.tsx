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

interface SectionData {
  sectionId?: string;
  topic?: string[];
  noOfQuestions: string;
  duration: string;
  correctMark: string;
  negativeMark: string;
}

const ExamForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updateExamData = useSelector((state: any) => state?.exam?.updateexam);
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const topics = useSelector((state: any) => state?.topic?.topic) || [];

  const [examName, setExamName] = useState("");
  const [fullExamDuration, setFullExamDuration] = useState("");
  const [isSwitchable, setIsSwitchable] = useState("yes");
  const [isSection, setIsSection] = useState("true");
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
  const [loading, setLoading] = useState(false);

  const topicOptions = topics.map((t: any) => ({
    value: t._id,
    label: t.topic,
  }));

  // Load sections
  useEffect(() => {
    const payload: any = {};
    dispatch(getsection(payload));
  }, [dispatch]);

  // Prefill form in update mode
  useEffect(() => {
    if (updateExamData && updateExamData._id) {
      setExamName(updateExamData.examname || "");
      setIsSwitchable(updateExamData.switchable ? "yes" : "no");
      setIsSection(updateExamData.isSection ? "true" : "false");
      setFullExamDuration(updateExamData.fullExamduration?.toString() || "");

      if (updateExamData.isSection) {
        setSectionsData(
          updateExamData.sections?.map((s: any) => ({
            sectionId: s.sectionId || "",
            topic: s.topic || [],
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
      }

      setEditingId(updateExamData._id);
    }
  }, [updateExamData]);

  // Handle section updates
  const handleFieldChange = (
    index: number,
    field: keyof SectionData,
    value: string | string[]
  ) => {
    const updated = [...sectionsData];
    (updated[index] as any)[field] = value;
    setSectionsData(updated);
  };

  const handleAddSection = () => {
    setSectionsData([
      ...sectionsData,
      {
        sectionId: "",
        topic: [],
        noOfQuestions: "",
        duration: "",
        correctMark: "",
        negativeMark: "",
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setSectionsData(sectionsData.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!examName.trim()) {
      alert("Exam name is required!");
      return;
    }

    const payload: any = {
      examname: examName.trim(),
      switchable: isSwitchable === "yes",
      isSection: isSection === "true",
      fullExamduration: Number(fullExamDuration) || undefined,
    };

    try {
      setLoading(true);

      if (isSection === "true") {
        if (!sectionsData.length) {
          alert("Please add at least one section!");
          return;
        }

        payload.sections = sectionsData.map((s) => ({
          sectionId: s.sectionId,
          topic: s.topic,
          noOfQuestions: s.noOfQuestions,
          duration: Number(s.duration),
          correctMark: Number(s.correctMark),
          negativeMark: Number(s.negativeMark),
        }));

        payload.fullExamduration =
          Number(fullExamDuration) ||
          sectionsData.reduce((sum, s) => sum + Number(s.duration || 0), 0);
      } else {
        if (!noOfQuestions || !correctMark || !negativeMark) {
          alert("Please fill all non-section exam fields!");
          return;
        }
        payload.noOfQuestions = noOfQuestions;
        payload.correctMark = Number(correctMark);
        payload.negativeMark = Number(negativeMark);
      }

      if (editingId) {
        await dispatch(handleUpdateExam({ id: editingId, ...payload }));
      } else {
        await dispatch(createexam(payload));
      }
      const data: any = null;
      await dispatch(getexam(data));
      dispatch(handlesetUpdateExam(data));

      // Reset form
      setExamName("");
      setFullExamDuration("");
      setIsSwitchable("yes");
      setIsSection("true");
      setSectionsData([
        {
          sectionId: "",
          topic: [],
          noOfQuestions: "",
          duration: "",
          correctMark: "",
          negativeMark: "",
        },
      ]);
      setNoOfQuestions("");
      setCorrectMark("");
      setNegativeMark("");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving exam!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mb-6 font-dm-sans">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex-1">
          <Label className="mb-4 block font-dm-sans text-md">Exam Name</Label>
          <Input
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Enter Exam Name (Ex. IPMAT, NPAT etc)"
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none "
          />
        </div>
        <div>
          <Label className="mb-4 block font-dm-sans text-md">
            Exam Duration (In Minutes)
          </Label>
          <Input
            type="number"
            value={fullExamDuration}
            onChange={(e) => setFullExamDuration(e.target.value)}
            placeholder="0"
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none "
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="mb-4 block font-dm-sans text-md">
            Section Based
          </Label>
          <RadioGroup
            onValueChange={setIsSection}
            value={isSection}
            className="flex items-center gap-6 mt-2"
          >
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
          <Label className="mb-4 block font-dm-sans text-md">
            Switchable Sections
          </Label>
          <RadioGroup
            onValueChange={setIsSwitchable}
            value={isSwitchable}
            className="flex items-center gap-6 mt-2"
          >
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

      {/* Section-based exam */}
      {isSection === "true" ? (
        <>
          <div className="space-y-4">
            {sectionsData.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] px-5 py-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-md font-medium text-[#FF5635]">
                    Add Section {index + 1}
                  </p>
                  {sectionsData.length > 1 && (
                    <Button
                      variant="destructive"
                      className="bg-transparent cursor-pointer font-poppins text-red-500 border border-red-300 hover:bg-red-50"
                      onClick={() => handleRemoveSection(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">Select Section</Label>
                    <Select
                      options={sections.map((s: any) => ({
                        value: s._id,
                        label: s.section,
                      }))}
                      value={sections
                        .map((s: any) => ({
                          value: s._id,
                          label: s.section,
                        }))
                        .find((o: any) => o.value === item.sectionId)}
                      onChange={(val: any) =>
                        handleFieldChange(index, "sectionId", val?.value)
                      }
                      placeholder="Select Section"
                    />
                  </div>
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">Select Topics</Label>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      components={makeAnimated()}
                      options={topicOptions}
                      value={topicOptions.filter((o: any) =>
                        item.topic?.includes(o.value)
                      )}
                      onChange={(selected: any) =>
                        handleFieldChange(
                          index,
                          "topic",
                          selected.map((s: any) => s.value)
                        )
                      }
                      placeholder="Select Relevant Topic(s)"
                    />
                  </div>
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">No. of Questions</Label>
                    <Input
                      type="number"
                      value={item.noOfQuestions}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "noOfQuestions",
                          e.target.value
                        )
                      }
                      placeholder="Ex. 20"
                      className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">Section Duration (In Minutes)</Label>
                    <Input
                      type="number"
                      value={item.duration}
                      onChange={(e) =>
                        handleFieldChange(index, "duration", e.target.value)
                      }
                      placeholder="0"
                      className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "
                    />
                  </div>
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">Correct Marks</Label>
                    <Input
                      type="number"
                      value={item.correctMark}
                      onChange={(e) =>
                        handleFieldChange(index, "correctMark", e.target.value)
                      }
                      placeholder="Ex. 4"
                      className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "  
                    />
                  </div>
                  <div>
                    <Label className="mb-4 block font-dm-sans text-md">Negative Marks</Label>
                    <Input
                      type="number"
                      value={item.negativeMark}
                      onChange={(e) =>
                        handleFieldChange(index, "negativeMark", e.target.value)
                      }
                      placeholder="Ex. -1"
                      className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "  
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex cursor-pointer justify-end">
              <Button
                type="button"
                onClick={handleAddSection}
                className="bg-black text-white hover:bg-gray-900"
              >
                + Add Section
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Non-section based exam
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <Label className="mb-4 block font-dm-sans text-md">No. of Questions</Label>
            <Input
              type="number"
              value={noOfQuestions}
              onChange={(e) => setNoOfQuestions(e.target.value)}
              placeholder="Enter total number of questions"
              className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "
            />
          </div>
          <div>
            <Label className="mb-4 block font-dm-sans text-md">Correct Mark</Label>
            <Input
              type="number"
              value={correctMark}
              onChange={(e) => setCorrectMark(e.target.value)}
              placeholder="Marks for each correct answer (e.g. 4)"
              className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "
            />
          </div>
          <div>
            <Label className="mb-4 block font-dm-sans text-md">Negative Mark</Label>
            <Input
              type="number"
              value={negativeMark}
              onChange={(e) => setNegativeMark(e.target.value)}
              placeholder="Negative mark (e.g. -1)"
              className="max-w-md px-4 py-2 border border-[#D0D5DD] bg-white rounded-[2px] font-dm-sans font-normal focus:ring-none "
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          disabled={loading}
                     className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer"

        >
          {loading ? "Saving..." : editingId ? "Update Exam" : "Create Exam"}
        </Button>
      </div>
    </div>
  );
};

export default ExamForm;
