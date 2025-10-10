"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createexamType, getExamType, handleUpdateExamType, handleupdateExamTypes } from "@/api/ExamType";

const ExamTypeForm = () => {
  const [examTypeName, setExamTypeName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const updatedData = useSelector(
    (state: any) => state.examType?.updateexamType
  ) || null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (updatedData && updatedData?._id) {
      setExamTypeName(updatedData.examType);
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
      setExamTypeName("");
    }
  }, [updatedData]);

  const fetchData = async () => {
    const payload:any={}
    await dispatch(getExamType(payload));
  };

  const handleSubmit = async () => {
    if (!examTypeName.trim()) return;

    if (isEditMode && updatedData?._id) {
      // Update existing exam type
      const payload: any = {
        id: updatedData._id,
        examType: examTypeName,
      };
      await dispatch(handleupdateExamTypes(payload));
    } else {
      // Create new exam type
      const payload: any = { examType: examTypeName };
      await dispatch(createexamType(payload));
    }
    const data:any=null
    await dispatch(handleUpdateExamType(data))

    await fetchData();
    setExamTypeName("");
    setIsEditMode(false);
  };

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? "Update Exam Type" : "Create Exam Type"}
      </h2>

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
            <Button onClick={handleSubmit} variant="orange">
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTypeForm;
