"use client";

import React, { useMemo, useState } from "react";
import QuestionBankTable from "./Component/QuestionBankTable";
import { useRouter } from "next/navigation";
import { Plus, Users, RotateCcw } from "lucide-react";
import Group from "./Component/Group";
import { useSelector } from "react-redux";
import Select from "react-select";

function Questionbank() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const users = useSelector((state: any) => state?.user?.user || []);
  const group = useSelector((state: any) => state?.group?.group || []);

  const router = useRouter();

  /* ================= GROUP OPTIONS ================= */

  const groupOptions = useMemo(
    () =>
      group.map((item: any) => ({
        label: item.groupName,
        value: item._id,
      })),
    [group]
  );

  /* ================= USER OPTIONS ================= */

  const userOptions = useMemo(
    () =>
      users.map((item: any) => ({
        label: item.username,
        value: item._id,
      })),
    [users]
  );

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: "#e5e7eb",
      boxShadow: "none",
      minHeight: "42px",
      "&:hover": { borderColor: "#4f46e5" },
    }),
  };

  const handleReset = () => {
    setSelectedGroup(null);
    setSelectedUser(null);
  };

  return (
    <>
      <Group isOpen={open} onClose={() => setOpen(false)} />

      <div className="min-h-screen bg-gray-50 p-6">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Question Bank
          </h1>

          <div className="flex gap-3 items-center">

            {/* GROUP FILTER */}

            <div className="w-64">
              <Select
                placeholder="Select Group"
                options={groupOptions}
                value={selectedGroup}
                styles={selectStyles}
                onChange={(opt) => setSelectedGroup(opt)}
                isClearable
              />
            </div>

            {/* USER FILTER */}

            <div className="w-64">
              <Select
                placeholder="Select User"
                options={userOptions}
                value={selectedUser}
                styles={selectStyles}
                onChange={(opt) => setSelectedUser(opt)}
                isClearable
              />
            </div>

            {/* MANAGE GROUP */}

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <Users size={18} />
              Manage Groups
            </button>

            {/* CREATE QUESTION */}

            <button
              onClick={() => router.push("questionbank/create")}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg"
            >
              <Plus size={18} />
              Create Question
            </button>

            {/* RESET */}

            <button
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-white border rounded-lg"
            >
              <RotateCcw size={18} />
            </button>

          </div>
        </div>

        {/* TABLE */}

        <QuestionBankTable
          groupId={selectedGroup?.value}
          createdBy={selectedUser?.value}
        />

      </div>
    </>
  );
}

export default Questionbank;