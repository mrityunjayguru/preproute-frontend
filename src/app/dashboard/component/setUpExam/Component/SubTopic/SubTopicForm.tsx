"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getTopic } from "@/api/Topic";
import {
  createsubTopic,
  getsubTopic,
  setUpdateSubTopic, // 👈 update API call
  handlesetUpdatesubTopic, // 👈 to clear redux after update
} from "@/api/subTopic";

const SubTopicForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const topics = useSelector((state: any) => state?.topic?.topic) || [];
  const updatesubTopic =
    useSelector((state: any) => state?.subTopic?.updatesubTopic) || null;

  const [subtopicInput, setSubtopicInput] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Fetch all topics
  const fetchTopics = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  const fetchSubTopics = async () => {
    const payload: any = {};
    await dispatch(getsubTopic(payload));
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // ✅ Prefill form when editing a subtopic
  useEffect(() => {
    if (updatesubTopic && updatesubTopic._id) {
      setSubtopicInput(updatesubTopic.subtopic);
      setSelectedTopic(updatesubTopic.topic?._id || "");
      setEditingId(updatesubTopic._id);
    }
  }, [updatesubTopic?._id]);

  // ✅ Handle submit (create or update)
  const handleSubmit = async () => {
    if (!subtopicInput.trim() || !selectedTopic) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const payload: any = {
      topic: selectedTopic,
      subtopic: subtopicInput,
    };

    if (editingId) {
      // 🔁 Update existing subtopic
      await dispatch(handlesetUpdatesubTopic({ id: editingId, ...payload }));
    } else {
      // 🆕 Create new subtopic
      await dispatch(createsubTopic(payload));
    }

    // ✅ Reset
    setSubtopicInput("");
    setSelectedTopic("");
    setEditingId(null);
    const data:any=null
    dispatch(handlesetUpdatesubTopic(data));

    // Refresh list
    await fetchSubTopics();
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update Sub-Topic" : "Create Sub-Topic"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        {/* Select Topic */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Choose Topic</label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {topics.map((topic: any) => (
                  <SelectItem key={topic._id} value={topic._id}>
                    {topic.topic}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Enter Subtopic */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Enter Sub-Topic</label>
          <Input
            type="text"
            placeholder="E.g. Algebra Basics"
            value={subtopicInput}
            onChange={(e) => setSubtopicInput(e.target.value)}
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

export default SubTopicForm;
