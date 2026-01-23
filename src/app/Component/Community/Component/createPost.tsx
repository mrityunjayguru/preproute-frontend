"use client";
import React, { useState } from "react";
import LatexForSoluction from "@/app/dashboard/component/Exam/Component/LatexForSoluction";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createForum } from "@/api/forum";
import { Loader2 } from "lucide-react";
import { FaLessThanEqual } from "react-icons/fa";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [hintText, setHintText] = useState("");
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (!title || !hintText) return;
    setloading(true);
    const payload = {
      title,
      description: hintText,
    };

    await dispatch(createForum(payload));
    setloading(false);
    setHintText("");
    setTitle("");
  };

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Title</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <div className="rounded-lg p-1 border">
        <LatexForSoluction value={hintText} onChange={setHintText} />
      </div>

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
