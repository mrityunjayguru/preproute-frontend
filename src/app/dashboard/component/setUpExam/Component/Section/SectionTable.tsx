"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getsection } from "@/api/Section";
import CommonTable from "@/Common/CommonTable";

const SectionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sections = useSelector((state: any) => state?.section?.section || []);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload:any={}
    await dispatch(getsection(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Apply filtering logic
  const filteredSections = sections.filter((section: any) => {
    const searchLower = search.toLowerCase();
    return (
      section?.sectiontype?.toLowerCase().includes(searchLower) ||
      section?.examType?.name?.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    { header: "Section Name", accessor: "sectiontype" },
    { header: "Exam Type Name", accessor: "examType.name" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      {/* Search box */}
      <Input
        type="text"
        placeholder="Search by Section or Exam Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-[#ffffff]"
      />

      {/* CommonTable */}
      <CommonTable data={filteredSections} columns={columns} />
    </div>
  );
};

export default SectionTable;
