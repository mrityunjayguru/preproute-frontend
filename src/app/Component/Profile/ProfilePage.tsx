"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import axios from "axios";
import { updateUserInfo, userProfileData } from "@/api/Users";
import PurchasedPlanSection from "./PurchasedPlanSection";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useSelector((state: any) => state?.Auth?.loginUser);
  console.log(user,"useruseruser")
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [profileImage, setProfileImage] = useState(user?.image || "/profile-avatar.png");
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/home");
    window.location.reload();
  };

  React.useEffect(() => {
    if (!token) {
      router.push("/Auth/signin");
    }
  }, [token, router]);

  // 📤 Upload Profile Image
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const payload:any={
      image:file,
      _id:user?._id
    };
    try {
      setUploading(true);
   await dispatch(updateUserInfo(payload))
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };
  const getuserData=async()=>{
    const payload:any={_id:user?._id}
    dispatch(userProfileData(payload))
  }


 useEffect(()=>{
getuserData()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl max-w-2xl w-full overflow-hidden border border-orange-100">
        {/* 🌈 Banner */}
        <div className="h-32 bg-gradient-to-r from-orange-500 to-pink-500 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {/* 📸 Profile Image Upload */}
            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
             <img
  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.image}`}
  alt="Profile"
  className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
/>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">
                  {uploading ? "Uploading..." : "Change"}
                </span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* 🧑 Info Section */}
        <div className="mt-16 px-8 pb-10 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            {user?.username || "User Name"}
          </h1>
          <p className="text-gray-500">{user?.email || "user@example.com"}</p>
          <div className="mt-2 inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
            {user?.role || "Student"}
          </div>

          {/* 💡 Info Cards */}
          <div className="mt-10 grid grid-cols-2 gap-6 text-left">
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
              <p className="text-gray-500 text-sm mb-1">Full Name</p>
              <p className="text-gray-800 font-medium">
                {user?.username || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="text-gray-800 font-medium">
                {user?.email || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
              <p className="text-gray-500 text-sm mb-1">Role</p>
              <p className="text-gray-800 font-medium">
                {user?.role || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
              <p className="text-gray-500 text-sm mb-1">Phone</p>
              <p className="text-gray-800 font-medium">
                {user?.phone || "Not Provided"}
              </p>
            </div>
          </div>
<PurchasedPlanSection user={user}/>
          {/* ⚙️ Buttons */}
          <div className="mt-10 flex justify-center gap-6">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-full"
              onClick={() => router.push("/profile/edit")}
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-full shadow-md"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
