"use client";

import React, { useEffect, useMemo } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";
import { getsection } from "@/api/Section";
import { getSubTopicByTopicId } from "@/api/subTopic";
import { getgroup } from "@/api/group";

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
    dispatch(getgroup ({})); // 2. Fetch groups on mount
  }, [dispatch]);

  // Fetch SubTopic when Topic changes
  useEffect(() => {
    if (selectedTopic?.value) {
      dispatch(getSubTopicByTopicId({ topicId: selectedTopic.value }));
      setSelectedSubTopic(null);
    }
  }, [selectedTopic, dispatch, setSelectedSubTopic]);

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

  // Common styles for React Select to keep UI consistent
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: '#e5e7eb', // gray-200
      boxShadow: 'none',
      '&:hover': { borderColor: '#4f46e5' } // indigo-600
    })
  };
console.log(selectedGroup,"selectedGroupselectedGroup")
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
      
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

      {/* Group Select */}
      <Select
        placeholder="Select Group"
        options={groupOptions}
        value={selectedGroup}
        styles={selectStyles}
        onChange={(opt) => setSelectedGroup(opt)} 
      />

    </div>
  );
}

export default QuestionBankHeader;