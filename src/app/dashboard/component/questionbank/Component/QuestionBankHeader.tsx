"use client";

import React, { useEffect, useMemo } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";
import { getsection } from "@/api/Section";
import { getSubTopicByTopicId } from "@/api/subTopic";
import { getgroup } from "@/api/group";
import { getQuestionBank } from "@/api/Question";
import { RotateCcw } from "lucide-react"; // Optional: Adding an icon for the reset button

function QuestionBankHeader({
  selectedExamType,
  setSelectedExamType,
  selectedSubExam,
  setSelectedSubExam,
  selectedSection,
  setSelectedSection,
  selectedTopic,
  setSelectedTopic,
  selectedSubTopic,
  setSelectedSubTopic,
  setSelectedGroup,
  selectedGroup,
}: any) {
  const dispatch = useDispatch<AppDispatch>();

  const sections = useSelector((state: any) => state?.section?.section || []);
  const subTopics = useSelector((state: any) => state?.subTopic?.subTopic || []);
  const examTypeData = useSelector((state: any) => state?.examType?.examType || []);
  const topics = useSelector((state: any) => state?.topic?.topic || []);
  const group = useSelector((state: any) => state?.group?.group || []);

  // Initial Fetching
  useEffect(() => {
    dispatch(getExamType({}));
    dispatch(getsection({}));
    dispatch(getgroup({}));
  }, [dispatch]);

  // Fetch SubTopic when Topic changes
  useEffect(() => {
    if (selectedTopic?.value) {
      dispatch(getSubTopicByTopicId({ topicId: selectedTopic.value }));
      setSelectedSubTopic(null);
    }
  }, [selectedTopic, dispatch, setSelectedSubTopic]);

  const getQuestionBankData = async () => {
    const payload: any = {
      groupId: selectedGroup?.value || selectedGroup?._id,
      sectionId: selectedSection?.value || selectedSection?._id,
      topicId: selectedTopic?.value || selectedTopic?._id,
      status:true
    };
    await dispatch(getQuestionBank(payload));
  };

  useEffect(() => {
    if (selectedGroup) {
      getQuestionBankData();
    }
  }, [selectedGroup]);

  // ================= RESET HANDLER =================
  const handleReset = () => {
    setSelectedExamType(null);
    setSelectedSubExam(null);
    setSelectedSection(null);
    setSelectedTopic(null);
    setSelectedSubTopic(null);
    setSelectedGroup(null);
    // Optionally trigger a fetch for all questions again or clear the list
    dispatch(getQuestionBank({})); 
  };

  // ================= OPTIONS =================
  const examTypeOptions = useMemo(
    () => examTypeData.map((item: any) => ({
      label: item.examType,
      value: item._id,
      subMenus: item.subMenus || [],
      subMenuExists: item.subMenuExists,
    })),
    [examTypeData]
  );

  const groupOptions = useMemo(
    () => group.map((item: any) => ({
      label: item.groupName,
      value: item._id,
    })),
    [group]
  );

  const subExamOptions = useMemo(() => {
    if (!selectedExamType?.subMenus) return [];
    return selectedExamType.subMenus.map((sub: any) => ({
      label: sub.subExamType,
      value: sub._id,
    }));
  }, [selectedExamType]);

  const sectionOptions = useMemo(
    () => sections.map((item: any) => ({
      label: item.section,
      value: item._id,
    })),
    [sections]
  );

  const topicOptions = useMemo(
    () => topics.map((item: any) => ({
      label: item.topic,
      value: item._id,
    })),
    [topics]
  );

  const subTopicOptions = useMemo(
    () => subTopics.map((item: any) => ({
      label: item.subtopic,
      value: item._id,
    })),
    [subTopics]
  );

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: '#e5e7eb',
      boxShadow: 'none',
      '&:hover': { borderColor: '#4f46e5' }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 items-center">
      
      <Select
        placeholder="Exam Type"
        options={examTypeOptions}
        value={selectedExamType}
        styles={selectStyles}
        onChange={(opt) => {
          setSelectedExamType(opt);
          setSelectedSubExam(null);
        }}
      />

      <Select
        placeholder="Sub Exam"
        options={subExamOptions}
        value={selectedSubExam}
        styles={selectStyles}
        onChange={(opt) => setSelectedSubExam(opt)}
        isDisabled={!selectedExamType?.subMenuExists}
      />

      <Select
        placeholder="Section"
        options={sectionOptions}
        value={selectedSection}
        styles={selectStyles}
        onChange={(opt) => setSelectedSection(opt)}
      />

      <Select
        placeholder="Topic"
        options={topicOptions}
        value={selectedTopic}
        styles={selectStyles}
        onChange={(opt) => setSelectedTopic(opt)}
      />

      <Select
        placeholder="Sub Topic"
        options={subTopicOptions}
        value={selectedSubTopic}
        styles={selectStyles}
        onChange={(opt) => setSelectedSubTopic(opt)}
        isDisabled={!selectedTopic}
      />

      <Select
        placeholder="Select Group"
        options={groupOptions}
        value={selectedGroup}
        styles={selectStyles}
        onChange={(opt) => setSelectedGroup(opt)} 
      />

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 font-medium"
      >
        <RotateCcw size={16} />
        Reset
      </button>

    </div>
  );
}

export default QuestionBankHeader;