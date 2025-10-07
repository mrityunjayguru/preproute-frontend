"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsubTopic } from "@/api/subTopic";
import CommonTable from "@/Common/CommonTable";

const SubTopicTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subTopics = useSelector((state: any) => state?.subTopic?.subTopic || []);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload:any={}
    await dispatch(getsubTopic(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Apply filtering logic
  const filteredSubTopics = subTopics.filter((item: any) => {
    const searchLower = search.toLowerCase();
    return (
      item?.examType?.name?.toLowerCase().includes(searchLower) ||
      item?.sections?.sectiontype?.toLowerCase().includes(searchLower) ||
      item?.topic?.topictype?.toLowerCase().includes(searchLower) ||
      item?.subtopictype?.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    { header: "Exam Type Name", accessor: "examType.name" },
    { header: "Section Name", accessor: "sections.sectiontype" },
    { header: "Topic Name", accessor: "topic.topictype" },
    { header: "Subtopic Name", accessor: "subtopictype" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search by Exam / Section / Topic / Subtopic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable */}
      <CommonTable data={filteredSubTopics} columns={columns} />
    </div>
  );
};

export default SubTopicTable;
