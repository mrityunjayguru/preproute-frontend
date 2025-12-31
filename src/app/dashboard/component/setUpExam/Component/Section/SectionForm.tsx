"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createsection,
  getsection,
  handlesetUpdatesection,
  handleUpdateData,
} from "@/api/Section";

const SectionForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sectionData = useSelector((state: any) => state.section.updatesection);
  const [sectionName, setSectionName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all sections initially
  const getData = async () => {
    const payload: any = {};
    await dispatch(getsection(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Only run when sectionData actually contains a record
  useEffect(() => {
    if (sectionData && sectionData._id) {
      setSectionName(sectionData.section);
      setEditingId(sectionData._id);
    }
  }, [sectionData?._id]); // ✅ only run when ID changes

  const handleAddOrUpdateSection = async () => {
    const payload: any = { section: sectionName };

    if (!sectionName.trim()) {
      alert("Please enter a section name.");
      return;
    }

    if (editingId) {
      await dispatch(handleUpdateData({ id: editingId, ...payload }));
    } else {
      await dispatch(createsection(payload));
    }
    const data: any = null;
    // ✅ Reset Redux and local form after save
    dispatch(handlesetUpdatesection(data));
    await getData();

    setSectionName("");
    setEditingId(null);
  };

  return (
    <div className="p-6 mb-6">
      <div className="flex justify-center gap-3 flex-col">
        <div className="flex-1">
          <Label className="mb-4 block font-dm-sans text-md">
            Section Name
          </Label>
          <Input
            type="text"
            placeholder="Enter Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none "
          />
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleAddOrUpdateSection}
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
