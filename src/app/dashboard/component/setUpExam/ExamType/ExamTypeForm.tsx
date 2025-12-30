"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createexamType,
  getExamType,
  handleUpdateExamType,
  handleupdateExamTypes,
} from "@/api/ExamType";

const ExamTypeForm = () => {
  const [examTypeName, setExamTypeName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const updatedData =
    useSelector((state: any) => state.examType?.updateexamType) || null;

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
    const payload: any = {};
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
    const data: any = null;
    await dispatch(handleUpdateExamType(data));

    await fetchData();
    setExamTypeName("");
    setIsEditMode(false);
  };

  return (
    <div className="p-6 mb-6">
      <div className="flex justify-center gap-3 flex-col">
        <div className="flex-1">
          <Label className="mb-4 block font-dm-sans text-md">
            Enter Exam Type
          </Label>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Enter Exam Type"
              value={examTypeName}
              onChange={(e) => setExamTypeName(e.target.value)}
              className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none "
            />
            <Button
              onClick={handleSubmit}
              className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer w-fit"
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTypeForm;
