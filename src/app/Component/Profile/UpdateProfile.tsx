"use client";

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { updateUserInfo } from "@/api/Users";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useSelector((state: any) => state?.Auth?.loginUser);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    password: "",
  });

  const [imagePreview, setImagePreview] = useState(
    user?.image
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.image}`
      : "/profile-avatar.png"
  );

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🌄 Select Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  // 📝 Input Change
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Submit Updated Data
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload: any = {
        ...formData,
        _id: user?._id,
      };

      if (file) payload.image = file;

      await dispatch(updateUserInfo(payload));

      alert("Profile Updated Successfully!");
      router.push("/Profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white/80 backdrop-blur-xl border border-orange-100 shadow-2xl rounded-3xl p-10 max-w-xl w-full">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Update Profile
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                alt="profile"
              />
            ) : (
              <FaRegUserCircle className="w-28 h-28 text-gray-400" />
            )}

            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <span className="text-white text-sm">Change</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-orange-400 focus:border-orange-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              value={user?.email}
              disabled
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInput}
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-orange-400 focus:border-orange-400"
              placeholder="Enter phone number"
            />
          </div>

          {/* Password */}
          {/* <div>
            <label className="text-sm text-gray-500">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-orange-400 focus:border-orange-400"
              placeholder="Enter new password"
            />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <Button
            variant="outline"
            className="border-orange-500 text-orange-600 px-6 py-2 rounded-full"
            onClick={() => router.push("/Profile")}
          >
            Cancel
          </Button>

          <Button
            className="bg-[#FF5635] hover:bg-[#e34d2e] text-white px-6 py-2 rounded-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
