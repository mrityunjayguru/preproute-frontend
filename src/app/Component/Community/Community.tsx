"use client";

import { getComments, getForums, singleForum } from "@/api/forum";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageCircle, HelpCircle, Users } from "lucide-react";
import Image from "next/image";
import Iconcommunity from "@/assets/images/community.png";
const tabs = [
  { id: "forum", label: "Forum", icon: MessageCircle },
  { id: "my-doubts", label: "My Doubts", icon: HelpCircle },
  { id: "my-discussions", label: "My Discussions", icon: Users },
];

const Community = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forum = useSelector((state: any) => state.forum.forums);
  const [activeTab, setActiveTab] = useState("forum");
  const router = useRouter();

  useEffect(() => {
    dispatch(getForums({}));
  }, []);

  const handleDiscussion = async (item: any) => {
    const payload = { postId: item?._id };
    await dispatch(singleForum(payload));
    await dispatch(getComments(payload));
    router.push("/Community/Discussion");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="bg-[#F0F9FF] rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            <span className="text-[#FF5635]">Community</span>{" "}
            <span className="text-[#005EB6]">| Discussion Forum</span>
          </h1>
          <p className="text-[#333333] mt-1">
            Ask. Discuss. Learn Together.
          </p>
        </div>
        <div>
          <Image src={Iconcommunity} alt="community" />
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-8 border-b mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 font-medium transition ${
                activeTab === tab.id
                  ? "text-[#FF5635] border-b-2 border-[#FF5635]"
                  : "text-[#1A1D1F]"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===== SEARCH + POST BUTTON ===== */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Select Question, Topic, Subtopic..."
          className="flex-1 px-4 py-2 border rounded-md outline-none"
        />
        <button
          onClick={() => router.push("/Community/Post")}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 whitespace-nowrap"
        >
          Post a Doubt
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="grid grid-cols-12 bg-[#005EB6] text-[#fff] px-4 py-3 font-semibold rounded-t-md">
          <div className="col-span-6">Forum</div>
          <div className="col-span-3">Topic</div>
          <div className="col-span-3">Posted by</div>
        </div>

        {/* Rows */}
        {forum?.length ? (
          forum.map((item: any) => (
            <div
              key={item._id}
              onClick={() => handleDiscussion(item)}
              className="grid grid-cols-12 px-4 py-2 border-b hover:bg-gray-50 cursor-pointer transition"
            >
              {/* Forum Title */}
              <div className="col-span-6 text-[#000000] line-clamp-2">
                {item?.title}
              </div>

              {/* Topic */}
              <div className="col-span-3 text-[#000000] font-medium">
                {item?.topic || "—"}
              </div>

              {/* Posted By */}
              <div className="col-span-3 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.user?.image}`}
                  alt="user"
                />
                <div>
                  <p className="text-sm text-[#000000] font-medium">
                    {item?.user?.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item?.createdAt).toLocaleDateString()}{" "}
                    {new Date(item?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-500">No data found</p>
        )}
      </div>
    </div>
  );
};

export default Community;
