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

import CreatableSelect from "react-select/creatable";

const ExamTypeForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updatedData =
    useSelector((state: any) => state.examType?.updateexamType) || null;

  const [examTypeName, setExamTypeName] = useState("");
  const [subMenus, setSubMenus] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // ========================
  // PREFILL EDIT MODE DATA
  // ========================
  useEffect(() => {
    if (updatedData?._id) {
      setExamTypeName(updatedData.examType);

      setSubMenus(
        (updatedData.subMenus || []).map((item: any) => ({
          label: item.subExamType,
          value: item.subExamType,
        }))
      );

      setIsEditMode(true);
    } else {
      resetForm();
    }
  }, [updatedData]);

  // ========================
  // RESET FORM
  // ========================
  const resetForm = () => {
    setExamTypeName("");
    setSubMenus([]);
    setIsEditMode(false);
  };

  // ========================
  // FETCH LIST
  // ========================
  const fetchData = async () => {
    await dispatch(getExamType({}));
  };

  // ========================
  // SUBMIT HANDLER
  // ========================
  const handleSubmit = async () => {
    if (!examTypeName.trim()) return;

    const uniqueSubMenus = Array.from(
      new Set(subMenus.map((item) => item.value.trim()))
    );

    const payload: any = {
      examType: examTypeName.trim(),
      subMenus: uniqueSubMenus,
    };

    if (isEditMode && updatedData?._id) {
      payload.id = updatedData._id;
      await dispatch(handleupdateExamTypes(payload));
    } else {
      await dispatch(createexamType(payload));
    }

    await dispatch(handleUpdateExamType(null));
    await fetchData();
    resetForm();
  };

  // ========================
  // UI
  // ========================
  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col gap-6 w-full">

        {/* FIELDS */}
        <div className="flex gap-10 flex-wrap">

          {/* EXAM TYPE */}
          <div className="flex flex-col gap-2 min-w-[260px]">
            <Label className="font-dm-sans text-md">
              Exam Type
            </Label>
            <Input
              type="text"
              placeholder="Enter Exam Type"
              value={examTypeName}
              onChange={(e) => setExamTypeName(e.target.value)}
              className="border border-[#D0D5DD] rounded-[2px]"
            />
          </div>

          {/* SUB MENUS */}
          <div className="flex flex-col gap-2 min-w-[300px]">
            <Label className="font-dm-sans text-md">
              Sub Exam Types
            </Label>
            <CreatableSelect
              isMulti
              value={subMenus}
              onChange={(value) => setSubMenus(value as any)}
              placeholder="Add sub exam types..."
            />
          </div>
        </div>

        {/* ACTION */}
        <Button
          onClick={handleSubmit}
          disabled={!examTypeName.trim()}
          className="h-10 bg-[#FF5635] text-white px-10 font-poppins w-fit"
        >
          {isEditMode ? "Update" : "Submit"}
        </Button>

      </div>
    </div>
  );
};

export default ExamTypeForm;
