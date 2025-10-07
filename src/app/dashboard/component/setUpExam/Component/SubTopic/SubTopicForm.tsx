"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getalltopicsbysectionid, getTopic } from "@/api/Topic";
import { createsubTopic } from "@/api/subTopic";
import { getSectionByExamId } from "@/api/Section";

const SubTopicForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const examTypeData = useSelector((state: any) => state?.examType?.examType) || [];

  const [topicsInput, setTopicsInput] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedExamType, setSelectedExamType] = useState<string>("");

  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    if (!topicsInput.trim() || !selectedTopic || !selectedSection || !selectedExamType) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const payload: any = {
      subtopictype: topicsInput,
      topic: {
        id: selectedTopic,
      },
      sections: {
        id:selectedSection
      },
      examType: {
        id:selectedExamType
      },
    };

    await dispatch(createsubTopic(payload));

    // reset form
    setTopicsInput("");
    setSelectedTopic("");
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
  useEffect(()=>{
if(selectedSection){
  const payload:any={
    id:selectedSection
  }
  dispatch(getalltopicsbysectionid(payload))
}
},[selectedSection])
  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Sub-Topic</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
           {/* Select Exam Type */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-sm font-medium">Choose Exam Type</label>
          <Select value={selectedExamType} onValueChange={setSelectedExamType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Exam Type" />
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
          {/* Select Section */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Choose Section</label>
          <Select value={selectedSection} disabled={!selectedExamType} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Section" />
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
        {/* Select Topic */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Choose Topic</label>
          <Select value={selectedTopic} disabled={!selectedSection} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {topics.map((topic: any) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.topictype}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      

     
   <div className="mt-1">
        <label className="text-sm font-medium">Enter Sub-Topics (separated by commas)</label>
        <Input
          type="text"
          placeholder="E.g. Algebra, Geometry, Probability"
          value={topicsInput}
          onChange={(e) => setTopicsInput(e.target.value)}
          className="mt-2 w-full"
        />
      </div>
        {/* Submit Button */}
        <div className="">
          <Button onClick={handleSubmit} variant="orange">
            Submit
          </Button>
        </div>
      </div>

      {/* Sub-Topic Input */}
   
    </div>
  );
};

export default SubTopicForm;
