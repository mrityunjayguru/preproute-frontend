"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createTopic, getTopic } from "@/api/Topic";

const TopicForm = () => {
  const [topicName, setTopicName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const topicsData = useSelector((state: any) => state?.topic?.updatetopic);
console.log(topicsData,"topicsDatatopicsData")
  const fetchData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  const handleAddTopic = async () => {
    if (!topicName.trim()) {
      alert("Please enter a topic name.");
      return;
    }

    const payload: any = {
      topic: topicName,
    };

    await dispatch(createTopic(payload));
    await fetchData();
    setTopicName("");
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Create Topic</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Topic Name */}
        <div className="w-full">
          <Label className="mb-2 block">Enter Topic</Label>
          <Input
            type="text"
            placeholder="Enter Topic"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end w-full">
          <Button onClick={handleAddTopic} variant="orange" className="w-full h-10">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
