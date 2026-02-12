import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createAnnouncement, getAnnouncement, handleUpdateAnnouncement, updateAnnouncement } from "@/api/Auth/Annoucement";


interface AnnouncementFormData {
  title: string;
  message: string;
  _id?: any;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters"),
  _id: yup.mixed().optional(),
});

function AnnouncementForm() {
  const dispatch = useDispatch<AppDispatch>();

  const updateAnnouncementRecord = useSelector(
    (state: any) => state?.announcement?.singleAnnouncement
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementFormData>({
    resolver: yupResolver(schema),
  });

  /* ================= Fetch Announcements ================= */
  const fetchAnnouncements = async () => {
    const payload: any = {};
    await dispatch(getAnnouncement(payload));
  };

  /* ================= Edit Mode ================= */
  useEffect(() => {
    if (!updateAnnouncementRecord) {
      reset({
        title: "",
        message: "",
      });
      return;
    }

    if (updateAnnouncementRecord) {
      reset({
        title: updateAnnouncementRecord.title || "",
        message: updateAnnouncementRecord.message || "",
      });
    }
  }, [updateAnnouncementRecord, reset]);

  /* ================= Submit ================= */
  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      let response: any;

      if (updateAnnouncementRecord?._id) {
        response = await dispatch(
          updateAnnouncement({
            ...data,
            _id: updateAnnouncementRecord._id,
          })
        );
      } else {
        response = await dispatch(createAnnouncement(data));
      }

      await dispatch(handleUpdateAnnouncement(null));

      if (response?.payload === true) {
        reset();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Failed to add/update announcement:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium mb-3">
        <h1 className="text-[#FF5635] text-2xl font-poppins">
          {updateAnnouncementRecord
            ? "Update Announcement"
            : "Create Announcement"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 space-y-4 max-w-md"
      >
        {/* Title */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">Title</label>

          <input
            type="text"
            placeholder="Enter Announcement Title"
            {...register("title")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">Message</label>

          <textarea
            rows={4}
            placeholder="Enter Announcement Message"
            {...register("message")}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF5635] text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer col-span-2"
        >
          {isSubmitting
            ? "Submitting..."
            : updateAnnouncementRecord
            ? "Update Announcement"
            : "Add Announcement"}
        </button>
      </form>
    </div>
  );
}

export default AnnouncementForm;
