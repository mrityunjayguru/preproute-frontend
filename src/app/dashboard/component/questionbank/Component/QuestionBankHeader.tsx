"use client";

import React, { useEffect, useMemo } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";
import { getsection } from "@/api/Section";
import { getSubTopicByTopicId } from "@/api/subTopic";

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
}: any) {
  const dispatch = useDispatch<AppDispatch>();

  const sections = useSelector((state: any) => state?.section?.section || []);
  const subTopics = useSelector(
    (state: any) => state?.subTopic?.subTopic || [],
  );
  const examTypeData = useSelector(
    (state: any) => state?.examType?.examType || [],
  );
  const topics = useSelector((state: any) => state?.topic?.topic || []);

  // Initial Fetch
  useEffect(() => {
    dispatch(getExamType({}));
    dispatch(getsection({}));
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
    () =>
      examTypeData.map((item: any) => ({
        label: item.examType,
        value: item._id,
        subMenus: item.subMenus || [],
        subMenuExists: item.subMenuExists,
      })),
    [examTypeData],
  );

  const subExamOptions = useMemo(() => {
    if (!selectedExamType?.subMenus) return [];
    return selectedExamType.subMenus.map((sub: any) => ({
      label: sub.subExamType,
      value: sub._id,
    }));
  }, [selectedExamType]);

  const sectionOptions = useMemo(
    () =>
      sections.map((item: any) => ({
        label: item.section,
        value: item._id,
      })),
    [sections],
  );

  const topicOptions = useMemo(
    () =>
      topics.map((item: any) => ({
        label: item.topic,
        value: item._id,
      })),
    [topics],
  );

  const subTopicOptions = useMemo(
    () =>
      subTopics.map((item: any) => ({
        label: item.subtopic,
        value: item._id,
      })),
    [subTopics],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Exam Type */}
      <Select
        placeholder="Exam Type"
        options={examTypeOptions}
        value={selectedExamType}
        onChange={(opt) => {
          setSelectedExamType(opt);
          setSelectedSubExam(null);
        }}
      />

      {/* Sub Exam */}
      <Select
        placeholder="Sub Exam Type"
        options={subExamOptions}
        value={selectedSubExam}
        onChange={(opt) => setSelectedSubExam(opt)}
        isDisabled={!selectedExamType?.subMenuExists}
      />

      {/* Section */}
      <Select
        placeholder="Section"
        options={sectionOptions}
        value={selectedSection}
        onChange={(opt) => setSelectedSection(opt)}
      />

      {/* Topic */}
      <Select
        placeholder="Topic"
        options={topicOptions}
        value={selectedTopic}
        onChange={(opt) => setSelectedTopic(opt)}
      />

      {/* Sub Topic */}
      <Select
        placeholder="Sub Topic"
        options={subTopicOptions}
        value={selectedSubTopic}
        onChange={(opt) => setSelectedSubTopic(opt)}
        isDisabled={!selectedTopic}
      />
    </div>
  );
}

export default QuestionBankHeader;
