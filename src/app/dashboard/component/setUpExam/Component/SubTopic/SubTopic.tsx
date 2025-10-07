"use client";
import React, { useEffect, useState } from "react";
import SubTopicForm from "./SubTopicForm";
import SubTopicTable from "./SubTopicTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";


interface Section {
  name: string;
  createdOn: string;
}

const SubTopic = () => {
 const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  // Fetch exam types
  const fetchData = async () => {
    const payload:any={}
    await dispatch(getExamType(payload));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1  bg-[#ffffff]">
      <SubTopicForm  />
      <SubTopicTable  />
    </div>
  );
};

export default SubTopic;
