"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createsection, getsection } from "@/api/Section";
import { getExamType } from "@/api/ExamType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SectionForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux exam types
  const examTypeData = useSelector((state: any) => state.examType.examType) || [];
console.log(examTypeData,"examTypeDataexamTypeData")
  const [sectionName, setSectionName] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");

  // Fetch exam types
  const fetchData = async () => {
    const payload:any={}
    await dispatch(getExamType(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    const payload:any={}
    await dispatch(getsection(payload));
  };

  const handleAddSection = async () => {
    if (!selectedExamType || !sectionName) {
      alert("Please select exam type and enter section name.");
      return;
    }

    const payload: any = {
      sectiontype: sectionName,
      examType:{
        id:selectedExamType
      }
    };

    await dispatch(createsection(payload));
    await getData();
    setSectionName("");
    setSelectedExamType("");
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Sections</h2>

      <div className="flex flex-col md:flex-row gap-4 md:w-3/4">
        {/* Exam Type Select */}
        <div className="flex-1 ">
          <Label className="mb-2 block">Select Exam Type</Label>
          <Select
            value={selectedExamType}
            onValueChange={setSelectedExamType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Exam Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {examTypeData.map((exam: any) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Section Name */}

        <div className="flex-1">
          <Label className="mb-2 block">Enter Section Name</Label>
          <Input
            type="text"
            placeholder="Enter Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
        </div>

      
        {/* Submit Button */}
        <div className="flex items-end">
          <Button onClick={handleAddSection} variant="orange" className="h-10">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
