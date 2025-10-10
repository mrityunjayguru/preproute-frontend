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
console.log(subTopics,"subTopicssubTopics")
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
      item?.subtopic?.toLowerCase().includes(searchLower) ||
      item?.topic.topic?.toLowerCase().includes(searchLower) 
    );
  });

  const columns = [
    { header: "subtopic Name", accessor: "subtopic" },
    { header: "Section Name", accessor: "topic.topic" },
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
