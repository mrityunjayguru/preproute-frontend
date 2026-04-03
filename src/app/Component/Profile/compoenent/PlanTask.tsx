import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createtodo, gettodo, handleUpdateData } from '@/api/task';

const TaskDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todo = useSelector((state: any) => state?.todo?.todo || []);

  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    totalQuestions: '',
  });

  // ✅ Fetch tasks
  useEffect(() => {
    dispatch(gettodo({}));
  }, [dispatch]);

  // ✅ Create Task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const payload = {
      title: formData.title,
      duration: Number(formData.duration),
      totalQuestions: Number(formData.totalQuestions),
      type: 'practice',
      isCompleted: true,
    };

    await dispatch(createtodo(payload));
    await dispatch(gettodo({}));

    setFormData({ title: '', duration: '', totalQuestions: '' });
    setIsModalOpen(false);
  };

  // ✅ Toggle Task
  const handleChange = async (task: any) => {
    const payload = {
      _id: task._id,
      isCompleted: !task.isCompleted,
    };

    await dispatch(handleUpdateData(payload));
    await dispatch(gettodo({}));
  };

  const completedCount = todo.filter((t: any) => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 flex justify-center">
      
      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">

        {/* HEADER */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Today's Tasks
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
          {todo.length === 0 ? (
            <p className="text-center text-slate-400 text-sm">
              No tasks available
            </p>
          ) : (
            todo.map((task: any) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition group"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full transition ${
                      task.isCompleted
                        ? 'bg-indigo-100 text-indigo-500'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    <CheckCircle2
                      size={20}
                      fill={!task.isCompleted ? 'currentColor' : 'none'}
                    />
                  </div>

                  <div>
                    <h4
                      className={`font-semibold transition ${
                        !task.isCompleted
                          ? 'line-through text-slate-400'
                          : 'text-slate-700'
                      }`}
                    >
                      {task.title}
                    </h4>

                    <p className="text-xs text-slate-400">
                      {task.duration} min • {task.totalQuestions} questions
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <input
                  type="checkbox"
                  checked={!task.isCompleted}
                  onChange={() => handleChange(task)}
                  className="h-5 w-5 accent-indigo-500 cursor-pointer"
                />
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-50 flex justify-between text-sm text-slate-600 font-medium">
          <span>
            {completedCount} of {todo.length} completed
          </span>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* MODAL */}
          <div className="relative bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl animate-in fade-in zoom-in">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold mb-4 text-slate-800">
              Create Task
            </h3>

            <form onSubmit={addTask} className="space-y-3">
              
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-3 rounded-xl bg-slate-100 focus:bg-white border focus:border-indigo-500 outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full p-3 rounded-xl bg-slate-100 focus:bg-white border focus:border-indigo-500 outline-none"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Total Questions"
                className="w-full p-3 rounded-xl bg-slate-100 focus:bg-white border focus:border-indigo-500 outline-none"
                value={formData.totalQuestions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalQuestions: e.target.value,
                  })
                }
              />

              <button className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition mt-2">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;