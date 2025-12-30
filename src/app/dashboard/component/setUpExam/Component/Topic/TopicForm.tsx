"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createTopic,
  getTopic,
  handlesetUpdateTopc,
  handleUpdateData,
  // 👈 make sure this action exists
} from "@/api/Topic";

const TopicForm = () => {
  const [topicName, setTopicName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // The topic selected for editing
  const updateTopic = useSelector((state: any) => state.topic.updatetopic);
  const topicList = useSelector((state: any) => state.topic.topicList || []);

  // Fetch topics initially
  const fetchData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (updateTopic && updateTopic._id) {
      setTopicName(updateTopic.topic);
      setEditingId(updateTopic._id);
    }
  }, [updateTopic?._id]);

  // Handle submit (Add or Update)
  const handleAddOrUpdate = async () => {
    if (!topicName.trim()) {
      alert("Please enter a topic name.");
      return;
    }

    const payload: any = { topic: topicName };

    if (editingId) {
      // Update existing topic
      await dispatch(handleUpdateData({ id: editingId, ...payload }));
    } else {
      // Create new topic
      await dispatch(createTopic(payload));
    }
    const data: any = null;
    // Reset Redux edit state and refetch
    dispatch(handlesetUpdateTopc(data));
    await fetchData();

    setTopicName("");
    setEditingId(null);
  };

  return (
    <div className="p-6 mb-6">
      <div className="flex justify-center gap-3 flex-col">
        <div className="flex-1">
          <Label className="mb-4 block font-dm-sans text-md">Enter Topic</Label>
          <Input
            type="text"
            placeholder="Enter Topic"                       
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none "
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <Button
            onClick={handleAddOrUpdate}
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
