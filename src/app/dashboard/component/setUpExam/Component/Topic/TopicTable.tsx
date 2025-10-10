"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsection } from "@/api/Section";
import CommonTable from "@/Common/CommonTable";
import { useSelector } from "react-redux";
import { getTopic, handlesetUpdateTopc } from "@/api/Topic";

const TopicTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sections = useSelector((state: any) => state?.topic?.topic);

  
  const [search, setSearch] = useState("");
  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    { header: "Topic Name", accessor: "topic" },


    { header: "Created At", accessor: "createdAt" },
  ];
  const handleEdit=(val:any)=>{
    dispatch(handlesetUpdateTopc(val))
  }
  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable */}
        
      <CommonTable data={sections} columns={columns} onEdit={handleEdit}/>
    </div>
  );
};

export default TopicTable;
