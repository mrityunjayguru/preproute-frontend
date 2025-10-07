"use client";
import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createexamType, getExamType } from "@/api/ExamType";

const ExamTypeForm = () => {
  const [examTypeName, setExamTypeName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = async () => {
    const payload: any = {};
    await dispatch(getExamType(payload));
  };
  const handleAddExamType = async () => {
    if (examTypeName.trim()) {
      const payload: any = {
        name: examTypeName,
      };
      await dispatch(createexamType(payload));
      await fetchData();
      setExamTypeName("");
    }
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Exam Type</h2>

      <div className="flex w-1/2 gap-4">
        <div className="flex-1">
          <Label className="my-2">Enter Exam Type</Label>
          <div className="flex justify-center items-center gap-4">
            <Input
              type="text"
              placeholder="Enter Exam Type"
              value={examTypeName}
              onChange={(e) => setExamTypeName(e.target.value)}
            />
            <Button onClick={handleAddExamType} variant="orange">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTypeForm;
