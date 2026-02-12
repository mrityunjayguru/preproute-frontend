"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";

import { AppDispatch } from "@/store/store";
import { getCollege, handleUpdateCollege } from "@/api/college";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";

const CollegeTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 🔹 Redux state
  const colleges = useSelector(
    (state: any) => state?.college.college
 || []
  );

  const [search, setSearch] = useState("");

  // 🔹 Fetch colleges
  const getData = async () => {
    const payload: any = {};
    await dispatch(getCollege(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // 🔹 Table columns
  const columns = [
    { header: "College Name", accessor: "examname" },
    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];

  // 🔹 Edit handler
  const handleEdit = (data: any) => {
    dispatch(handleUpdateCollege(data));
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">
          College List
        </h2>

        {/* 🔍 Search box */}
        <div className="w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by College Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* 📊 Common Table */}
      <CommonTable
        data={colleges}
        columns={columns}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CollegeTable;
