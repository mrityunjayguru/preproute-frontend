"use client";

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserInfo } from "@/api/Users";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { Plus } from "lucide-react";
import Image from "next/image";
import USER from "@/assets/vectors/user-profile.svg";
import SocialMedia from "../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useSelector((state: any) => state?.Auth?.loginUser);

  // Split username into first and last name if available
  const nameParts = user?.username?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    nickname: user?.nickname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    parentPhone: user?.parentPhone || "",
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
        username: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        nickname: formData.nickname,
        parentPhone: formData.parentPhone,
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
    <div className="min-h-screen  flex items-center justify-between flex-col ">
      <div></div>
      <div className="bg-gradient-to-t from-[#F0F9FF] to-white border border-[#E6F4FF] rounded-[8px] px-8 py-16 max-w-4xl w-full">
        <div className="flex gap-8">
          {/* Left Side - Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div
                className="relative w-32 h-32 rounded-[8px]  overflow-hidden bg-gray-200 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                ) : (
                  <>
                    <Image
                      src={USER}
                      alt="user"
                      className="w-16 h-16 p-8 text-gray-400"
                    />
                    <span className="absolute -right-1 w-5 h-5 bg-[#FF5635] text-white  rounded-full flex items-center justify-center">
                      <Plus size={12} />
                    </span>
                  </>
                )}
              </div>

              {/* Orange circle with plus sign */}
              {/* <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -right-4 bottom-2 w-5 h-5 bg-[#FF5635] text-white  rounded-full flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button> */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Right Side - Form Fields */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {/* First Name */}
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-normal font-poppins  text-gray-700 mb-1 block"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInput}
                    className="w-full rounded-[2px] font-dm-sans"
                    placeholder="First Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-normal font-poppins text-gray-700 mb-1 block"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-gray-100 rounded-[2px] font-dm-sans"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-normal font-poppins text-gray-700 mb-1 block"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="number"
                    name="phone"
                    disabled
                    value={formData.phone}
                    onChange={handleInput}
                    className="w-full rounded-[2px] font-dm-sans"
                    placeholder="Phone"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-normal font-poppins text-gray-700 mb-1 block"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInput}
                    className="w-full rounded-[2px] font-dm-sans"
                    placeholder="Last Name"
                  />
                </div>
                {/* Nickname */}
                <div>
                  <Label
                    htmlFor="nickname"
                    className="text-sm font-normal font-poppins text-gray-700 mb-1 block"
                  >
                    Nickname
                  </Label>
                  <Input
                    id="nickname"
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInput}
                    className="w-full rounded-[2px] font-dm-sans"
                    placeholder="Nickname"
                  />
                </div>

                {/* Parent Phone */}
                <div>
                  <Label
                    htmlFor="parentPhone"
                    className="text-sm font-normal font-poppins text-gray-700 mb-1 block"
                  >
                    Parent Phone
                  </Label>
                  <Input
                    id="parentPhone"
                    type="number"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInput}
                    className="w-full rounded-[2px] font-dm-sans"
                    placeholder="Parent Phone"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center gap-4 justify-center">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer font-normal font-poppins text-white px-16 py-2 rounded-[2px]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/Profile")}
                className=" text-orange-500 hover:bg-white cursor-pointer font-normal font-poppins  px-16 py-2 rounded-[2px] "
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <SocialMedia />
          </div>
        </div>
      </section>
    </div>
  );
}
