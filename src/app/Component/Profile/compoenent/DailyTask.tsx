"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { AppDispatch } from "@/store/store";
import { gettodo, handleUpdateData, createtodo } from "@/api/task";

function DailyTask() {
  const dispatch = useDispatch<AppDispatch>();

  // --- State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  // --- Redux Selectors ---
  const todo = useSelector((state: any) => state?.todo?.todo || []);

  // --- Handlers ---
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const payload = {
      title: formData.title,
      message: formData.message,
      type: "practice",
      isCompleted: false,
    };

    // Trigger API Actions
    await dispatch(createtodo(payload));
    await dispatch(gettodo({}));

    // Reset Form
    setFormData({ title: "", message: "" });
    setIsModalOpen(false);
  };

  const handleToggleComplete = async (task: any) => {
    const payload = {
      _id: task._id,
      isCompleted: !task.isCompleted,
    };
    
    // Trigger API Actions
    await dispatch(handleUpdateData(payload));
    await dispatch(gettodo({}));
  };

  return (
    <>
      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* MODAL CONTENT */}
          <div className="relative bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl animate-in fade-in zoom-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold mb-4 text-slate-800">Create Task</h3>

            <form onSubmit={addTask} className="space-y-3">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-3 rounded-xl bg-slate-100 focus:bg-white border focus:border-indigo-500 outline-none text-black"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <textarea
                placeholder="Message / Description"
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-100 focus:bg-white border focus:border-indigo-500 outline-none text-black resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition mt-2"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN UI */}
      <div className="p-6 border-none rounded-[8px] bg-[#EBFAFF] md:h-[300px] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-medium text-[#2B5CE7] font-poppins">
            Today's Tasks
          </h3>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2D80FB] text-white text-xs px-6 py-2 rounded-full font-medium tracking-tight whitespace-nowrap hover:bg-blue-600 transition"
          >
            + Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {todo.length > 0 ? (
            todo.map((item: any, index: number) => (
              <div
                key={item?._id || index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-blue-100 pb-3 last:border-0"
              >
                {/* Section Info */}
                <div className="flex-1">
                  <h4 className={`font-medium text-lg text-gray-800 font-dm-sans ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {item.title}
                  </h4>
                  {item.message && (
                    <p className={`text-sm font-dm-sans ${item.isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                      {item.message}
                    </p>
                  )}
                </div>

                {/* Completion Checkbox */}
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggleComplete(item)}
                  className="h-5 w-5 accent-indigo-500 cursor-pointer flex-shrink-0"
                />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 font-dm-sans">
              No Daily Tasks available for today
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DailyTask;