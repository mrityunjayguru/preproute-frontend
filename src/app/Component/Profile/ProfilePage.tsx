"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import axios from "axios";
import { updateUserInfo, userProfileData } from "@/api/Users";
import PurchasedPlanSection from "./PurchasedPlanSection";
import { FaRegUserCircle } from "react-icons/fa";
import { Download, Plus, User2 } from "lucide-react";
import Image from "next/image";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../Home/_componets/social-media";
import USERDATA from "@/assets/vectors/user-profile.svg";
import InvoicePrint from "./InvoicePDF.client";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useSelector((state: any) => state?.Auth?.loginUser);
  const getuserData = async () => {
    const payload: any = { _id: user?._id };
    dispatch(userProfileData(payload));
  };
  
  useEffect(() => {
    getuserData();
  }, []);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [profileImage, setProfileImage] = useState(
    user?.image || "/profile-avatar.png"
  );

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
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const payload: any = {
      image: file,
      _id: user?._id,
    };
    try {
      setUploading(true);
      await dispatch(updateUserInfo(payload));
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };



  console.log(user, "useruseruser");
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <div className="mx-auto space-y-6 px-6 sm:px-8 md:px-12 lg:px-28">
          {/* 🔹 PROFILE HEADER */}
          <div className="bg-[#F0F9FF] rounded-[8px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <div
                className="relative cursor-pointer  bg-[#ffffff] rounded-[8px]"
                onClick={() => fileInputRef.current?.click()}
              >
                {user?.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}`}
                    alt="Profile"
                    onError={(e) => {
                      e.currentTarget.src = "/default-user.png";
                    }}
                    className=" object-cover w-32 h-32 rounded-lg"
                  />
                ) : (
                  <>
                    <Image
                      src={USERDATA}
                      alt="user"
                      className="w-32 h-32 p-8 text-gray-400"
                    />
                    <span className="absolute bottom-1 -right-3 w-5 h-5 bg-[#FF5635] text-white  rounded-full flex items-center justify-center">
                      <Plus size={12} />
                    </span>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Info */}
              <div className="flex flex-col font-poppins">
                <p className="text-xs text-[#1A1D1F]">Greetings,</p>
                <span className="text-md font-semibold text-[#1A1D1F]">
                  {user?.username || "User Name"}!
                </span>
                <p className="text-xs text-[#727EA3]">
                  Nikname :{user?.nickname || "N/A"}
                </p>
                <p className="text-xs text-[#FF5635]">
                  {user?.email} {user?.phone && `| +91 ${user.phone}`}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex gap-3">
              <Button
                className="bg-black rounded-[8px] font-poppins font-thin cursor-pointer text-white hover:bg-[#ff5635] hover:text-white"
                onClick={() => router.push("/Profile/edit")}
              >
                Edit Details
              </Button>
              <Button
                className="bg-[#FF5635] rounded-[8px] hover:bg-black font-thin font-poppins cursor-pointer text-white hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* 🔹 USER DETAILS */}
          <div className="bg-white rounded-xl p-8 font-poppins grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
            <div className="flex border-b pb-2 gap-24">
              <span className="text-[#727EA3]">Parent Contact:</span>
              <span className="">{user?.parentPhone || "—"}</span>
            </div>

            <div className="flex border-b pb-2 gap-24">
              <span className="text-[#727EA3]">Attempt Year:</span>
              <span className="">{user?.profile.year}</span>
            </div>

            <div className="flex border-b pb-2 gap-24">
              <span className="text-[#727EA3]">Stream:{}</span>
              <span className="">
                {user?.profile?.stream == "Other"
                  ? user?.profile?.otherStream
                  : user?.profile?.stream}
              </span>
            </div>

            <div className="flex border-b pb-2 gap-24">
              <span className="text-[#727EA3]">Preparing For:</span>
              <span className=" text-right">
                {user?.examdetail?.map((exam: any) => exam.examname).join(", ")}
              </span>
            </div>
          </div>

          {/* 🔹 ACTIVE SUBSCRIPTION */}
          <div>
            <h3 className="text-xl font-poppins font-normal text-gray-800 mb-4 ml-4">
              Active Subscription
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Free Plan */}
              {!user?.purchaseDetails?.[0]?.planId ?(  <div
                className="bg-gradient-to-t from-[#F0F9FF] to-white 
                 border border-[#E6F4FF] rounded-xl p-6 "
              >
                <h4 className="text-[#ff5635] font-poppins font-medium text-2xl">
                  Free Plan
                </h4>
                <p className="text-md text-[#ff5635] mb-4">Limited Access</p>

                <div className="text-[14px] space-y-1 font-poppins">
                  {/* <p>
                    <span className="text-[#1A1D1F]">Created on:</span>{" "}
                  </p> */}
                  <p className="flex gap-2 items-center">
                    <h1 className="flex gap-2 items-center">
                      <span className="text-[#1A1D1F]">Price</span>{" "}
                      
                    </h1>
                    <span className="text-[#ff5635] font-medium">₹0</span>
                  </p>
                  {/* <span className="text-[#1A1D1F] text-[8px]">
                        inclusive of all taxes
                      </span> */}
                </div>
              </div>):(null)}
            

              {/* Paid Plan */}
              {Array.isArray(user?.purchaseDetails) &&
                user.purchaseDetails.length > 0 &&
                user.purchaseDetails[0]?.planId &&
                user.purchaseDetails.map((item: any, index: number) => (
                  <div
                    key={item?.orderId || index}
                    className="bg-gradient-to-t from-[#F0F9FF] to-white 
       border border-[#E6F4FF] rounded-xl p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[#ff5635] font-semibold text-2xl">
                          {item?.plan?.title}
                        </h4>
                        <p className="text-md text-[#ff5635] mb-4">
                          Full Access
                        </p>
                      </div>

                      <Button className="text-white bg-black text-sm">
                        <Download className="h-5 w-5" />
                        <InvoicePrint invoice={item} />
                      </Button>
                    </div>

                    <div className="text-[14px] space-y-1 font-poppins">
                      <p>
                        <span className="text-[#1A1D1F]">Created on:</span>{" "}
                        {item?.otherdetsil?.orderedAt
                          ? new Date(
                              item.otherdetsil.orderedAt
                            ).toLocaleDateString()
                          : item?.plan?.createdAt
                          ? new Date(item.plan.createdAt).toLocaleDateString()
                          : "—"}
                      </p>

                      <p className="flex gap-2 items-center">
                        <span className="text-[#1A1D1F]">Price</span>
                        <span className="text-[#ff5635] font-medium">
                          ₹{item?.amount || item?.plan?.price || "0"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Keep your existing section */}
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
