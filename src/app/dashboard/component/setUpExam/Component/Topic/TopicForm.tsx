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
const data:any=null
    // Reset Redux edit state and refetch
    dispatch(handlesetUpdateTopc(data));
    await fetchData();

    setTopicName("");
    setEditingId(null);
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6 w-full">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update Topic" : "Create Topic"}
      </h2>

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
          <Button
            onClick={handleAddOrUpdate}
            variant="orange"
            className="w-full h-10"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
