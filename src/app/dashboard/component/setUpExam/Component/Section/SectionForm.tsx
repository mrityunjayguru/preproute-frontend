"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createsection, getsection, handlesetUpdatesection, handleUpdateData } from "@/api/Section"; // 👈 import update

const SectionForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sectionData = useSelector(
    (state: any) => state.section.updatesection || []
  );
  const [sectionName, setSectionName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load sections initially
  const getData = async () => {
    const payload:any={}
    await dispatch(getsection(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle submit
  const handleAddOrUpdateSection = async () => {
    const payload: any = { section: sectionName };

    if (editingId) {
      // 👇 Update existing section
      await dispatch(handleUpdateData({ id: editingId, ...payload }));
    } else {
      // 👇 Create new section
      await dispatch(createsection(payload));
    }
    let data:any=null
  dispatch(handlesetUpdatesection(data))

    await getData();
    setSectionName("");
    setEditingId(null);
  };

  // Check if section exists when user types
  const handleSectionChange = (value: string) => {
    setSectionName(value);
  };

  useEffect(()=>{
      setSectionName(sectionData.section);
      setEditingId(sectionData._id);


  },[sectionData])

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update Section" : "Create Section"}
      </h2>

      <div className="flex flex-col md:flex-row gap-4 md:w-3/4">
        {/* Section Name */}
        <div className="flex-1">
          <Label className="mb-2 block">Enter Section Name</Label>
          <Input
            type="text"
            placeholder="Enter Section Name"
            value={sectionName}
            onChange={(e) => handleSectionChange(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <Button
            onClick={handleAddOrUpdateSection}
            variant="orange"
            className="h-10"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
