"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createexam, getexam } from "@/api/Exam";
import { getsection } from "@/api/Section";

const ExamForm: React.FC = () => {
  const [examName, setExamName] = useState("");
  const [isSwitchable, setIsSwitchable] = useState("yes");

  const [sectionsData, setSectionsData] = useState([
    { sectionId: "", noOfQuestions: "" },
  ]);

  const dispatch = useDispatch<AppDispatch>();
  const sections = useSelector((state: any) => state?.section?.section) || [];

  useEffect(() => {
    const loadSections = async () => {
      const payload: any = {};
      await dispatch(getsection(payload));
    };
    loadSections();
  }, [dispatch]);

  const handleAddMore = () => {
    setSectionsData([
      ...sectionsData,
      { sectionId: "", noOfQuestions: "" },
    ]);
  };

  const handleSectionChange = (index: number, value: string) => {
    const updated = [...sectionsData];
    updated[index].sectionId = value;
    setSectionsData(updated);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...sectionsData];
    updated[index].noOfQuestions = value;
    setSectionsData(updated);
  };

  const handleSubmit = async () => {
    if (!examName.trim()) {
      alert("Please enter exam name before submitting.");
      return;
    }

    const validSections = sectionsData.filter(
      (s) => s.sectionId && s.noOfQuestions
    );

    if (validSections.length === 0) {
      alert("Please select at least one section and enter questions.");
      return;
    }

    const payload: any = {
      examname: examName,
      switchable: isSwitchable === "yes" ? true : false,
      sections: validSections,
    };
    console.log(payload,"payloadpayload")
    await dispatch(createexam(payload));
    const val: any = {};
    await dispatch(getexam(val));

    // reset form
    setExamName("");
    setIsSwitchable("yes");
    setSectionsData([{ sectionId: "", noOfQuestions: "" }]);
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Exam</h2>

      {/* Exam Basic Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Exam Name</Label>
          <Input
            type="text"
            placeholder="Enter Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>

        <div>
          <Label>Switchable</Label>
          <RadioGroup
            onValueChange={setIsSwitchable}
            value={isSwitchable}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Section Fields */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Sections</Label>
        {sectionsData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end"
          >
            <div>
              <Label>Select Section</Label>
              <Select
                value={item.sectionId}
                onValueChange={(val) => handleSectionChange(index, val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sections.map((section: any) => (
                      <SelectItem key={section._id} value={section._id}>
                        {section.section}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Number of Questions</Label>
              <Input
                type="number"
                placeholder="Enter No. of Questions"
                value={item.noOfQuestions}
                onChange={(e) =>
                  handleQuestionChange(index, e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {/* Add More Button */}
        <Button
          type="button"
          onClick={handleAddMore}
          className="bg-green-500 hover:bg-green-600 mt-2"
        >
          + Add More
        </Button>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 w-full"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ExamForm;
