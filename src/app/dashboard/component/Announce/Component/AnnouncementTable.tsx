"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Search } from "lucide-react";
import CommonTable from "@/Common/CommonTable";

import { formatDateTime } from "@/Common/ComonDate";
import { getAnnouncement, handleUpdateAnnouncement, updateAnnouncement } from "@/api/Auth/Annoucement";

function AnnouncementTable() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(
    (state: any) => state?.announcement?.announcement || []
  );


  const [search, setSearch] = useState<string>("");

  /* ================= Fetch Announcements ================= */
  const fetchAnnouncements = async () => {
    const payload: any = {};
    await dispatch(getAnnouncement(payload));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /* ================= Table Columns ================= */
  const columns = [
    { header: "Title", accessor: "title" },
    {
      header: "Message",
      accessor: (row: any) =>
        row.message?.length > 40
          ? row.message.slice(0, 40) + "..."
          : row.message,
    },
    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
    {
      header: "Status",
      accessor: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.isDeleted
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {row.isDeleted ? "Inactive" : "Active"}
        </span>
      ),
    },
  ];

  /* ================= Search ================= */
  const filteredData = data.filter((item: any) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= Actions ================= */

  const handleEdit = async (val: any) => {
    await dispatch(handleUpdateAnnouncement(val));
  };

  const handleToggle = async (announcement: any) => {
    try {
      await dispatch(
        updateAnnouncement({
          ...announcement,
          isDeleted: !announcement.isDeleted,
        })
      );
      await fetchAnnouncements();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          Announcement List
        </h2>

        {/* Search */}
        <div className="w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-2 border border-gray-200">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search announcement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      <div className="mb-10">
        <CommonTable
          data={filteredData}
          columns={columns}
          onEdit={handleEdit}
          onToggle={handleToggle}
          actionLabel="Edit"
        />
      </div>
    </div>
  );
}

export default AnnouncementTable;
