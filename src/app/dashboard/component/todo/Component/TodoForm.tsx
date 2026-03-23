import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createtodo,  handlesetUpdatetodo, handleUpdateData } from "@/api/todo";

interface TaskFormData {
  title: string;
  type: string;
  duration: number;
  totalQuestions: number;
  startDate?: string;
  endDate?: string;
  _id?: any;
}

const schema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  type: yup.string().required("Task type is required"),
  duration: yup
    .number()
    .typeError("Must be a number")
    .min(1, "Minimum is 1 minute")
    .required("Duration is required"),
  totalQuestions: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Minimum is 0")
    .required("Total questions required"),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
});

function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();

  const updatedData = useSelector(
    (state: any) => state?.todo?.updatetodo
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
  });

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (!updatedData) {
      reset({
        title: "",
        type: "",
        duration: 0,
        totalQuestions: 0,
        startDate: "",
        endDate: "",
      });
      return;
    }

    reset({
      title: updatedData.title || "",
      type: updatedData.type || "",
      duration: updatedData.duration || 0,
      totalQuestions: updatedData.totalQuestions || 0,
      startDate: updatedData.startDate?.slice(0, 10) || "",
      endDate: updatedData.endDate?.slice(0, 10) || "",
    });
  }, [updatedData, reset]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: TaskFormData) => {
    try {
      let response: any;

      if (updatedData?._id) {
        // ✅ UPDATE API
        response = await dispatch(
          handleUpdateData({
            ...data,
            _id: updatedData._id,
          })
        );
      } else {
        // ✅ CREATE API
        response = await dispatch(createtodo(data));
      }

      // reset edit state
      await dispatch(handlesetUpdatetodo(null));

      if (response?.payload) {
        reset();
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium mb-3">
        <h1 className="text-[#FF5635] text-2xl f font-poppins">
          {updatedData ? "Update Task" : "Create Task"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 space-y-4 max-w-md"
      >
        {/* Title */}
        <div className="col-span-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Title</label>
            <input
              type="text"
              placeholder="Enter Task Title"
              {...register("title")}
              className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        {/* Task Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Task Type</label>
          <select
            {...register("type")}
            className="w-full mb-4 px-4 py-2 rounded-[8px] bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] focus:outline-none"
          >
            <option value="">Choose Task Type</option>
            <option value="test">Test</option>
            <option value="practice">Practice</option>
            <option value="revision">Revision</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (minutes)</label>
          <input
            type="number"
            {...register("duration")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Total Questions */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Total Questions</label>
          <input
            type="number"
            {...register("totalQuestions")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.totalQuestions && (
            <p className="text-red-500 text-sm">
              {errors.totalQuestions.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            {...register("endDate")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF5635] text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
        >
          {isSubmitting
            ? "Submitting..."
            : updatedData
            ? "Update Task"
            : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;