"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  createUser,
  getUsers,
  handleSetUpdateUser,
  handleUpdateUserData,
} from "@/api/Users";
import { decrypt } from "@/Utils/Crypto";
import Blogeditor from "./Blogeditor";
import { createblog, getblog, handleUpdateData } from "@/api/Blog";

interface BlogForm {
  title: string;
  description: string;
  image: File | null;
}

const BlogForm: React.FC = () => {
    const data = useSelector((state: any) => state?.blog?.Blog || []);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const updateBlog = useSelector((state: any) => state?.blog?.updateBlog);
  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    description: "",
    image: null,
  });


  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ================= Fetch Users ================= */
  const fetchUsers = async () => {
    await dispatch(getblog({}));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= Edit Mode ================= */
  useEffect(() => {
    if (updateBlog && updateBlog._id) {
      setFormData({
        title: updateBlog.title || "",
        description: updateBlog.description || "",
        image: null,
      });
      setEditingId(updateBlog._id);
        setImagePreview(
      updateBlog.image
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${updateBlog.image}`
        : null
    );
    }
  }, [updateBlog]);

  /* ================= Handlers ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, title: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddOrUpdate = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }
 

    const payload: any = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
    };
    try {
      if (editingId) {
        await dispatch(handleUpdateData({ id: editingId, ...payload }));
      } else {
        await dispatch(createblog(payload));
      }

      dispatch(handleUpdateUserData(null));
      await fetchUsers();
      // router.push("/dashboard/users");

      setFormData({ title: "", description: "", image: null });
      setImagePreview(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 max-[80%] gap-4">

        {/* Title */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label className="font-dm-sans text-md font-medium">Title</Label>
          <Input
            type="text"
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px]"
          />
        </div>

        {/* Description */}
        <div className="my-5 md:col-span-2">
          <Blogeditor
            value={formData.description}
            onChange={(html: string) =>
              setFormData((prev) => ({ ...prev, description: html }))
            }
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <Label className="font-dm-sans text-md font-medium">
            Upload Image
          </Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="md:col-span-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-40 rounded border"
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center w-full md:col-span-2 mt-2">
          <Button
            onClick={handleAddOrUpdate}
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer w-fit rounded-[4px]"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default BlogForm;
