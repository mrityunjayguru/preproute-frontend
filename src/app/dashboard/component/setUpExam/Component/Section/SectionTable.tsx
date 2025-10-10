"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsection, handlesetUpdatesection } from "@/api/Section";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";

const SectionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sections = useSelector((state: any) => state?.section?.section || []);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload:any={}
    await dispatch(getsection(payload));
  };

  useEffect(() => {
    getData();
  }, []);


  const columns = [
    { header: "Section Name", accessor: "section" },
   {
        header: "Created At",
        accessor: (row: any) =>
          row.createdAt ? formatDateTime(row.createdAt) : "-",
      },
  ];
const handleEdit=(data:any)=>{
  dispatch(handlesetUpdatesection(data))
}
  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search by Section or Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable */}
        
      <CommonTable data={sections} columns={columns} onEdit={handleEdit}/>
    </div>
  );
};

export default SectionTable;
