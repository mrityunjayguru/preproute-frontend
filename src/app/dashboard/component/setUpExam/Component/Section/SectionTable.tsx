"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsection, handlesetUpdatesection } from "@/api/Section";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";

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
   <div className="">
      <div className="flex justify-between items-center pb-3">
      <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">Section List</h2>
      {/* Search box */}
      <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search by Section or Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />
  </div>
      </div>
      {/* CommonTable */}
        
      <CommonTable data={sections} columns={columns} onEdit={handleEdit}/>
    </div>
  );
};

export default SectionTable;
