"use client";

import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import {
  createCollege,
  getCollege,
  handleSetUpdateCollege,
  handleUpdateCollege,
} from "@/api/college";
import { getExamType } from "@/api/ExamType";

const CollegeForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const examTypeData =
    useSelector((state: any) => state.examType.examType) || [];

  const collegeData = useSelector(
    (state: any) => state.college.collegeProgress,
  );

  const [collegeName, setCollegeName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedExamTypes, setSelectedExamTypes] = useState<any[]>([]);

  /* ---------------- FETCH DATA ---------------- */

  const getData = async () => {
    const payload: any = {};
    await dispatch(getCollege(payload));
    await dispatch(getExamType(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  /* ---------------- EXAM TYPE OPTIONS ---------------- */

  const examTypeOptions = useMemo(() => {
    return examTypeData.flatMap((item: any) => {
      if (item.subMenuExists && item.subMenus?.length) {
        return item.subMenus.map((sub: any) => ({
          label: sub.subExamType,
          value: sub._id,
          parentId: item._id,
        }));
      }

      return {
        label: item.examType,
        value: item._id,
      };
    });
  }, [examTypeData]);

  /* ---------------- EDIT MODE ---------------- */

  useEffect(() => {
    if (collegeData && collegeData._id) {
      setCollegeName(collegeData.examname);
      setEditingId(collegeData._id);

      if (collegeData.examTypes?.length) {
        const preSelected = examTypeOptions.filter((opt: any) =>
          collegeData.examTypes.includes(opt.value),
        );
        setSelectedExamTypes(preSelected);
      }
    }
  }, [collegeData?._id, examTypeOptions]);

  /* ---------------- SUBMIT ---------------- */

  const handleAddOrUpdateCollege = async () => {
    if (!collegeName.trim()) {
      alert("Please enter a college name.");
      return;
    }

    const payload: any = {
      college: collegeName,
      examname: collegeName,
      examTypes: selectedExamTypes.map((e) => e.value),
    };

    if (editingId) {
      await dispatch(
        handleSetUpdateCollege({
          id: editingId,
          ...payload,
        }),
      );
    } else {
      await dispatch(createCollege(payload));
    }

    dispatch(handleUpdateCollege(null));
    await getData();

    setCollegeName("");
    setEditingId(null);
    setSelectedExamTypes([]);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 mb-6">
      <div className="flex justify-center gap-4 flex-col">
        <div className="flex-1">
          <Label className="mb-2 block font-dm-sans text-md">
            College Name
          </Label>
          <Input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-0"
          />
        </div>

        <div className="flex-1 max-w-md">
          <Label className="mb-2 block font-dm-sans text-md">
            Exam Types
          </Label>
          <Select
            isMulti
            options={examTypeOptions}
            value={selectedExamTypes}
            onChange={(val: any) => setSelectedExamTypes(val)}
            placeholder="Select Exam Types"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleAddOrUpdateCollege}
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeForm;
