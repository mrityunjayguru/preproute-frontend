"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsubTopic, setUpdateSubTopic } from "@/api/subTopic";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";

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
      item?.subtopic?.toLowerCase().includes(searchLower) ||
      item?.topic.topic?.toLowerCase().includes(searchLower) 
    );
  });

  const columns = [
    { header: "subtopic Name", accessor: "subtopic" },
    { header: "Section Name", accessor: "topic.topic" },
   {
       header: "Created At",
       accessor: (row: any) =>
         row.createdAt ? formatDateTime(row.createdAt) : "-",
     },
  ];

  const handleEdit=(val:any)=>{
    dispatch(setUpdateSubTopic(val))
  }

  return (
      <div className="">
      <div className="flex justify-between items-center pb-3">
      <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">SubTopic List</h2>
      {/* Search box */}
      <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
        < Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search by Exam / Section / Topic / Subtopic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"

      />
 </div>
      </div>
      {/* CommonTable */}
      <CommonTable data={filteredSubTopics} columns={columns}  onEdit={handleEdit}
      
      />
    </div>
  );
};

export default SubTopicTable;
