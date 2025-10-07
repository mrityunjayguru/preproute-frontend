"use client";
import React, { useState, useEffect } from "react";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createexam, getexam } from "@/api/Exam";
import { getExamType } from "@/api/ExamType";
import { getsection, getSectionByExamId } from "@/api/Section";
import { getalltopicsbysectionid, getTopic } from "@/api/Topic";
import { getallsubtopicsbytopicid, getsubTopic } from "@/api/subTopic";

const ExamForm: React.FC = () => {
  const [examName, setExamName] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [isSwitchable, setIsSwitchable] = useState("yes");
  const [noofquestion, setNoOfQuestion] = useState("");
  const [sectionNoOfQuestion, setSectionNoOfQuestion] = useState("");

  // Dropdown selections
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  // Redux store data
  const examTypes = useSelector((state: any) => state?.examType?.examType) || [];
  const sections = useSelector((state: any) => state?.section?.section) || [];
  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const subtopics = useSelector((state: any) => state?.subTopic?.subTopic) || [];

  // fetch data
  const loadData = async () => {
    const payload: any = {};
    await dispatch(getExamType(payload));
    await dispatch(getsection(payload));
    await dispatch(getTopic(payload));
    await dispatch(getsubTopic(payload));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (
      !examName.trim() ||
      !examDuration.trim() ||
      !noofquestion.trim() ||
      !selectedExamType ||
      !selectedSection ||
      !selectedTopic ||
      !selectedSubTopic
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }
    
    const payload: any = {
      examname: examName,
      examduration: examDuration,
      switchable: isSwitchable == "yes" ? true : false,
      sectionnumberofquestion: sectionNoOfQuestion,
      examType: { id: selectedExamType },
      sections: { id: selectedSection },
      topic: { id: selectedTopic },
      subtopic: { id: selectedSubTopic },
      noofquestion: Number(noofquestion),
    };
    await dispatch(createexam(payload));
    const val:any={}
    await dispatch(getexam(val));
    setSelectedSection("");
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

  useEffect(()=>{
if(selectedTopic){
  const payload:any={
    id:selectedTopic
  }
  dispatch(getallsubtopicsbytopicid(payload))
}
},[selectedTopic])




  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Exam</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end w-full">
        {/* Exam Type */}
        <div>
          <Label>Select Exam Type</Label>
          <Select value={selectedExamType} onValueChange={setSelectedExamType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Exam Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {examTypes.map((exam: any) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Section */}
        <div>
          <Label>Select Section</Label>
          <Select value={selectedSection} disabled={!selectedExamType} onValueChange={setSelectedSection}>
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

        {/* Section Number of Questions */}
        <div>
          <Label>Section Number of Questions</Label>
          <Input
            type="number"
            placeholder="Enter Section Questions"
            value={sectionNoOfQuestion}
            onChange={(e) => setSectionNoOfQuestion(e.target.value)}
          />
        </div>

        {/* Topic */}
        <div>
          <Label>Select Topic</Label>
          <Select value={selectedTopic} disabled={!selectedSection}  onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Topic" />
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

        {/* Subtopic */}
        <div>
          <Label>Select Subtopic</Label>
          <Select value={selectedSubTopic} disabled={!selectedTopic}  onValueChange={setSelectedSubTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Subtopic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subtopics.map((sub: any) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.subtopictype}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Exam Name */}
        <div>
          <Label>Exam Name</Label>
          <Input
            type="text"
            placeholder="Enter Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>

        {/* Exam Duration */}
        <div>
          <Label>Exam Duration</Label>
          <Input
            type="text"
            placeholder="Enter Exam Time"
            value={examDuration}
            onChange={(e) => setExamDuration(e.target.value)}
          />
        </div>

        {/* Exam Total Number of Questions */}
        <div>
          <Label>Total Number of Questions</Label>
          <Input
            type="number"
            placeholder="Enter Total Questions"
            value={noofquestion}
            onChange={(e) => setNoOfQuestion(e.target.value)}
          />
        </div>

        {/* Switchable */}
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
