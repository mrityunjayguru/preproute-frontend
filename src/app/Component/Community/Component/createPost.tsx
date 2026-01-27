"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LatexForSoluction from "@/app/dashboard/component/Exam/Component/LatexForSoluction";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { AppDispatch, RootState } from "@/store/store";
import { createForum } from "@/api/forum";
import { getTopic } from "@/api/Topic";

function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();

  /* ===================== STATE ===================== */
  const [title, setTitle] = useState("");
  const [hintText, setHintText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  /* ===================== REDUX ===================== */
  const topicList = useSelector(
    (state: RootState) => state?.topic?.topic || []
  );

  /* ===================== HANDLERS ===================== */
  const handleSubmit = async () => {
    if (!title || !hintText || !selectedTopic) return;

    setLoading(true);

    const payload = {
      title,
      description: hintText,
      topicId: selectedTopic,
    };

    try {
      await dispatch(createForum(payload)).unwrap();
      setTitle("");
      setHintText("");
      setSelectedTopic("");
    } catch (error) {
      console.error("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    const payload:any={}
    await dispatch(getTopic(payload));
  };

  /* ===================== EFFECT ===================== */
  useEffect(() => {
    fetchTopics();
  }, []);

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      {/* ===== Title ===== */}
      <h1 className="text-xl font-semibold mb-2">Title</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {/* ===== Topic Dropdown ===== */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Topic
        </label>

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none"
        >
          <option value="">-- Select Topic --</option>
          {topicList.map((t: any) => (
            <option key={t._id} value={t._id}>
              {t.topic}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Latex Editor ===== */}
      <div className="rounded-lg p-1 border">
        <LatexForSoluction value={hintText} onChange={setHintText} />
      </div>

      {/* ===== Submit Button ===== */}
      <div className="my-5">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
