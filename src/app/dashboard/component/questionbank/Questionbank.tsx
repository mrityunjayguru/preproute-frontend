"use client";

import React, { useEffect, useMemo, useState } from "react";
import QuestionBankTable from "./Component/QuestionBankTable";
import { useRouter } from "next/navigation";
import { Plus, Users, RotateCcw } from "lucide-react";
import Group from "./Component/Group";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getQuestionBank } from "@/api/Question";
import { AppDispatch } from "@/store/store";
import { getAllUsers } from "@/api/Users";

function Questionbank() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const users = useSelector((state: any) => state?.user?.user || []);
  const group = useSelector((state: any) => state?.group?.group || []);

  const dispatch = useDispatch<AppDispatch>();
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

  /* ================= SELECT STYLE ================= */

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

  /* ================= API CALL ================= */

  const fetchQuestionBank = async (groupId: string = "", userId: string = "") => {
    const payload: any = {};

    if (groupId) payload.groupId = groupId;
    if (userId) payload.createdBy = userId;

    await dispatch(getQuestionBank(payload));
  };

  /* ================= FILTER CHANGE ================= */

  useEffect(() => {
    fetchQuestionBank(selectedGroup?.value || "", selectedUser?.value || "");
  }, [selectedGroup, selectedUser]);

  /* ================= RESET FILTER ================= */

  const handleReset = () => {
    setSelectedGroup(null);
    setSelectedUser(null);
    fetchQuestionBank("", "");
  };

  /* ================= GET USERS ================= */

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, []);

  return (
    <>
      {/* ================= GROUP MODAL ================= */}

      <Group isOpen={open} onClose={() => setOpen(false)} />

      <div className="min-h-screen bg-gray-50 p-6">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Question Bank
          </h1>

          <div className="flex gap-3 items-center">

            {/* ================= GROUP SELECT ================= */}

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

            {/* ================= USER SELECT ================= */}

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

            {/* ================= MANAGE GROUP ================= */}

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
            >
              <Users size={18} />
              Manage Groups
            </button>

            {/* ================= CREATE QUESTION ================= */}

            <button
              onClick={() => router.push("questionbank/create")}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} />
              Create Question
            </button>

            {/* ================= RESET FILTER ================= */}

            <button
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
              title="Reset Filter"
            >
              <RotateCcw size={18} />
            </button>

          </div>
        </div>

        {/* ================= TABLE ================= */}

        <QuestionBankTable />

      </div>
    </>
  );
}

export default Questionbank;