"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createTopic, getTopic } from "@/api/Topic";
import { getsection, getSectionByExamId } from "@/api/Section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicForm = () => {
  const [topicName, setTopicName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const examTypeData = useSelector((state: any) => state.examType.examType) || [];

  const getData = async () => {
    const payload: any = {};
    await dispatch(getsection(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  const handleAddTopic = async () => {
    if (!selectedSection || !topicName.trim() || !selectedExamType) {
      alert("Please select section, exam type and enter a topic name.");
      return;
    }

    const payload: any = {
      topictype: topicName,
      sections: {
        id:selectedSection
      },
      examType: {
        id:1
      },
    };

    await dispatch(createTopic(payload));
    await fetchData();
    setTopicName("");
    setSelectedSection("");
    setSelectedExamType("");
  };
  useEffect(()=>{
 if(selectedExamType){
 const payload:any={
    id:selectedExamType
  }
  dispatch(getSectionByExamId(payload))
 }
  },[selectedExamType])

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Create Topic</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
         {/* Exam Type Select */}
        <div className="w-full">
          <Label className="mb-2 block">Select Exam Type</Label>
          <Select value={selectedExamType} onValueChange={setSelectedExamType}>
            <SelectTrigger className="w-full">
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
          {/* Section Select */}
        <div className="w-full">
          <Label className="mb-2 block">Select Section</Label>
          <Select value={selectedSection} disabled={!selectedExamType}  onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sections.map((section: any) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.sectiontype}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Topic Name */}
        <div className="w-full">
          <Label className="mb-2 block">Enter Topic</Label>
          <Input
            type="text"
            placeholder="Enter Topic"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="w-full"
          />
        </div>

      
       

        {/* Submit Button */}
        <div className="flex items-end w-full">
          <Button onClick={handleAddTopic} variant="orange" className="w-full h-10">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
