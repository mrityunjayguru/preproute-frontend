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
  topicIds?: string[];
  noOfQuestions: string;
  duration: string;
  correctMark: string;
  negativeMark: string;
}

const ExamForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateExamData = useSelector(
    (state: any) => state?.exam?.updateexam || null
  );
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const topic = useSelector((state: any) => state?.topic?.topic) || [];

  const [examName, setExamName] = useState("");
  const [fullExamDuration, setFullExamDuration] = useState("");
  const [isSwitchable, setIsSwitchable] = useState("yes");
  const [isSection, setIsSection] = useState("true");
  const [sectionsData, setSectionsData] = useState<SectionData[]>([
    {
      sectionId: "",
      topicIds: [],
      noOfQuestions: "",
      duration: "",
      correctMark: "",
      negativeMark: "",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const topicOptions = topic?.map((t: any) => ({
    value: t._id,
    label: t.topic,
  }));

  // Load sections
  useEffect(() => {
    dispatch(getsection({}));
  }, [dispatch]);

  // Prefill update data
  useEffect(() => {
    if (updateExamData && updateExamData._id) {
      setExamName(updateExamData.examname);
      setIsSwitchable(updateExamData.switchable ? "yes" : "no");
      setIsSection(updateExamData.isSection ? "true" : "false");
      setFullExamDuration(updateExamData.fullExamduration || "");

      setSectionsData(
        updateExamData.sections?.map((s: any) => ({
          sectionId: s.sectionId || "",
          topicIds: s.topic || [],
          noOfQuestions: s.noOfQuestions || "",
          duration: s.duration || "",
          correctMark: s.currectMark || "",
          negativeMark: s.negativeMark || "",
        })) || [
          {
            sectionId: "",
            topicIds: [],
            noOfQuestions: "",
            duration: "",
            correctMark: "",
            negativeMark: "",
          },
        ]
      );
      setEditingId(updateExamData._id);
    }
  }, [updateExamData]);

  // Add new section
  const handleAddMore = () => {
    setSectionsData([
      ...sectionsData,
      {
        sectionId: "",
        topicIds: [],
        noOfQuestions: "",
        duration: "",
        correctMark: "",
        negativeMark: "",
      },
    ]);
  };

  // Handle field changes
  const handleFieldChange = (
    index: number,
    field: keyof SectionData,
    value: string | string[]
  ) => {
    const updated = [...sectionsData];
    (updated[index] as any)[field] = value;
    setSectionsData(updated);
  };

  const handleSectionChange = (index: number, value: string) => {
    const updated = [...sectionsData];
    updated[index].sectionId = value;
    updated[index].topicIds = [];
    setSectionsData(updated);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!examName.trim()) {
      alert("Please enter exam name before submitting.");
      return;
    }

    const payload: any = {
      examname: examName.trim(),
      switchable: isSwitchable === "yes",
      isSection: isSection === "true",
    };

    if (isSection === "true") {
      const validSections = sectionsData.filter(
        (s) => s.noOfQuestions && s.duration
      );

      if (validSections.length === 0) {
        alert("Please fill all required section fields.");
        return;
      }

      payload.sections = validSections.map((s) => ({
        sectionId: s.sectionId,
        noOfQuestions: s.noOfQuestions,
        duration: Number(s.duration),
        currectMark: Number(s.correctMark),
        negativeMark: Number(s.negativeMark),
        topic: s.topicIds || [],
      }));
    } else {
      const main = sectionsData[0];
      if (!main.noOfQuestions || !main.duration) {
        alert("Please fill all required fields.");
        return;
      }

      payload.noOfQuestions = main.noOfQuestions;
      payload.fullExamduration = Number(main.duration);
      payload.currectMark = Number(main.correctMark);
      payload.negativeMark = Number(main.negativeMark);
    }

    if (editingId) {
      await dispatch(handleUpdateExam({ id: editingId, ...payload }));
    } else {
      await dispatch(createexam(payload));
    }

    await dispatch(getexam(null));
    dispatch(handlesetUpdateExam(null));

    // Reset form
    setExamName("");
    setFullExamDuration("");
    setIsSwitchable("yes");
    setIsSection("true");
    setSectionsData([
      {
        sectionId: "",
        topicIds: [],
        noOfQuestions: "",
        duration: "",
        correctMark: "",
        negativeMark: "",
      },
    ]);
    setEditingId(null);
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update Exam" : "Create Exam"}
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <Label>Exam Name</Label>
          <Input
            type="text"
            placeholder="Enter Exam Name (e.g., IPMAT Indore)"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>

        <div>
          <Label>Full Exam Duration (minutes)</Label>
          <Input
            type="number"
            placeholder="Enter total duration (e.g., 120)"
            value={fullExamDuration}
            onChange={(e) => setFullExamDuration(e.target.value)}
          />
        </div>

        <div>
          <Label>Switchable Sections</Label>
          <RadioGroup
            onValueChange={setIsSwitchable}
            value={isSwitchable}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="switchable-yes" />
              <Label htmlFor="switchable-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="switchable-no" />
              <Label htmlFor="switchable-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Section Based Exam?</Label>
          <RadioGroup
            onValueChange={setIsSection}
            value={isSection}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="section-true" />
              <Label htmlFor="section-true">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="section-false" />
              <Label htmlFor="section-false">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* SECTION BASED EXAM */}
      {isSection === "true" ? (
        <>
          <Label className="text-lg font-semibold">Sections & Topics</Label>
          <div className="space-y-4 mt-2">
            {sectionsData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end"
              >
                <div>
                  <Label>Section</Label>
                  <Select
                    options={sections.map((s: any) => ({
                      value: s._id,
                      label: s.section,
                    }))}
                    onChange={(val: any) =>
                      handleSectionChange(index, val?.value)
                    }
                    value={sections
                      .map((s: any) => ({
                        value: s._id,
                        label: s.section,
                      }))
                      .find((o) => o.value === item.sectionId)}
                    placeholder="Select Section"
                  />
                </div>

                <div>
                  <Label>Topics</Label>
                  <Select
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    isMulti
                    options={topicOptions}
                    value={topicOptions.filter((o) =>
                      item.topicIds?.includes(o.value)
                    )}
                    onChange={(selected: any) =>
                      handleFieldChange(
                        index,
                        "topicIds",
                        selected.map((s: any) => s.value)
                      )
                    }
                    placeholder="Select Topics"
                  />
                </div>

                <div>
                  <Label>No. of Questions</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 40"
                    value={item.noOfQuestions}
                    onChange={(e) =>
                      handleFieldChange(index, "noOfQuestions", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Correct Mark</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 4"
                    value={item.correctMark}
                    onChange={(e) =>
                      handleFieldChange(index, "correctMark", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Negative Mark</Label>
                  <Input
                    type="number"
                    placeholder="e.g. -1"
                    value={item.negativeMark}
                    onChange={(e) =>
                      handleFieldChange(index, "negativeMark", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 60"
                    value={item.duration}
                    onChange={(e) =>
                      handleFieldChange(index, "duration", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={handleAddMore}
              className="bg-green-500 hover:bg-green-600 mt-2"
            >
              + Add Section
            </Button>
          </div>
        </>
      ) : (
        // NON-SECTION BASED EXAM
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <Label>No. of Questions</Label>
            <Input
              type="number"
              placeholder="e.g. 60"
              value={sectionsData[0]?.noOfQuestions || ""}
              onChange={(e) =>
                handleFieldChange(0, "noOfQuestions", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Correct Mark</Label>
            <Input
              type="number"
              placeholder="e.g. 1"
              value={sectionsData[0]?.correctMark || ""}
              onChange={(e) =>
                handleFieldChange(0, "correctMark", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Negative Mark</Label>
            <Input
              type="number"
              placeholder="e.g. 0"
              value={sectionsData[0]?.negativeMark || ""}
              onChange={(e) =>
                handleFieldChange(0, "negativeMark", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              placeholder="e.g. 90"
              value={sectionsData[0]?.duration || ""}
              onChange={(e) =>
                handleFieldChange(0, "duration", e.target.value)
              }
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 w-full"
        >
          {editingId ? "Update Exam" : "Create Exam"}
        </Button>
      </div>
    </div>
  );
};

export default ExamForm;
