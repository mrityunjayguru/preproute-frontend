"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsection } from "@/api/Section";
import CommonTable from "@/Common/CommonTable";
import { useSelector } from "react-redux";
import { deleteTopic, getTopic, handlesetUpdateTopc } from "@/api/Topic";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";
import { confirmDelete } from "@/Common/confirmDelete";
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
    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];
  const handleEdit=(val:any)=>{
    dispatch(handlesetUpdateTopc(val))
  }
  const handleDelete=async(val:any)=>{
    const payload:any={
      id:val._id
    }
    let checkconform=await confirmDelete()
    if(!checkconform) return
    console.log(checkconform,"checkconformcheckconform")
   await  dispatch(deleteTopic(payload))
    getData();

  }
  return (
     <div className="">
      <div className="flex justify-between items-center pb-3">
      <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">Topic List</h2>
      {/* Search box */}
      <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />

      {/* CommonTable */}
        </div>
      </div>
      <CommonTable data={sections} columns={columns} onEdit={handleEdit}   onDelete={handleDelete}/>
    </div>
  );
};

export default TopicTable;
