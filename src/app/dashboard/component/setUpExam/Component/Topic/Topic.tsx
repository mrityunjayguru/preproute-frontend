"use client";
import React, { useEffect, useState } from "react";
import TopicForm from "./TopicForm";
import TopicTable from "./TopicTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getExamType } from "@/api/ExamType";


const Topic = () => {
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
    <div className="flex-1 ">
      <TopicForm  />
      <TopicTable />
    </div>
  );
};

export default Topic;
