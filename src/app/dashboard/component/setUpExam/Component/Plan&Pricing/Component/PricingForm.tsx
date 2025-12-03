"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getTopic } from "@/api/Topic";
import {
  createsubTopic,
  getsubTopic,
  setUpdateSubTopic,
  handlesetUpdatesubTopic,
} from "@/api/subTopic";
import { getexam } from "@/api/Exam";
import { createPlanAndPricing } from "@/api/Plan&Pricing";

const PricingForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const exam = useSelector((state: any) => state?.exam?.exam) || [];

  const updatesubTopic =
    useSelector((state: any) => state?.subTopic?.updatesubTopic) || null;

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selected, setSelected] = useState<any[]>([]);
  const [editingId, seteditingId] = useState<string | null>(null);

  // Fetch Topics
//   const fetchTopics = async () => {
//     const payload: any = {};
//     await dispatch(getTopic(payload));
//   };

//   const fetchSubTopics = async () => {
//     const payload: any = {};
//     await dispatch(getsubTopic(payload));
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, []);

  const getData = async () => {
    const payload: any = {};
    await dispatch(getexam(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Prefill form when editing
  useEffect(() => {
    if (updatesubTopic && updatesubTopic._id) {
      setTitle(updatesubTopic.subtopic);
      setPrice(updatesubTopic.topic?._id || "");
    }
  }, [updatesubTopic?._id]);

  // Submit
  const handleSubmit = async () => {
    const examIdArray = selected.map((item: any) => item.value); 
    // 👉 Converts react-select value objects into plain ObjectId array

    const payload: any = {
      title: title,
      price: price,
      examId: examIdArray, // ⭐ PASSED IN ARRAY FORMAT (ObjectIds)
    };

    await dispatch(createPlanAndPricing(payload));

    setTitle("");
    setPrice("");
    setSelected([]);
    const data: any = null;
    dispatch(handlesetUpdatesubTopic(data));

    // await fetchSubTopics();
  };

  // Options for react-select
  const options: any = exam.map((topic: any) => ({
    label: topic.examname,
    value: topic._id, // ⭐ ObjectId passed correctly
  }));

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update Sub-Topic" : "Create Plan"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        
        {/* Select Exam */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Choose Exam</label>

          <Select
            isMulti
            options={options}
            value={selected}
            onChange={(val: any) => setSelected(val)} // ⭐ stores full react-select objects
            className="w-full"
          />
        </div>

        {/* Enter Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Enter Title</label>
          <Input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Enter Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Enter Price</label>
          <Input
            type="number"
            placeholder="Enter Price"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <Button onClick={handleSubmit} variant="orange">
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
