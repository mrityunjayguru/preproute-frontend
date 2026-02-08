"use client";

import { getComments, getForums, singleForum } from "@/api/forum";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageCircle, HelpCircle, Users } from "lucide-react";
import Image from "next/image";
import Iconcommunity from "@/assets/images/community.png";
import Iconforum from "@/assets/vectors/forum.svg";
import Iconmydoubts from "@/assets/vectors/warning.svg";
import Iconmydiscussions from "@/assets/vectors/messages.svg";
import avatar from "@/assets/vectors/user.svg";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../Home/_componets/social-media";


const tabs = [
  { id: "forum", label: "Forum", icon: Iconforum },
  { id: "my-doubts", label: "My Doubts", icon: Iconmydoubts },
  { id: "my-discussions", label: "My Discussions", icon: Iconmydiscussions },
];

const Community = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const forum = useSelector((state: any) => state.forum.forums || []);
  const [activeTab, setActiveTab] = useState("forum");

  useEffect(() => {
    dispatch(getForums({}));
  }, [dispatch]);

  const handleDiscussion = async (item: any) => {
    const payload = { postId: item?._id };
    await dispatch(singleForum(payload));
    await dispatch(getComments(payload));
    router.push("/Community/Discussion");
  };

  return (
    <div>
      <div className="min-h-screen bg-white px-6 sm:px-8 md:px-12 lg:px-28">
        {/* ===== HEADER ===== */}
        <div className="bg-[#E8F4F8] rounded-lg px-8 py-3 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-[#FF5635] text-sm md:text-2xl lg:text-3xl font-medium font-poppins mb-2 text-center md:text-left">
              <span className="text-[#FF5635]">Community</span>{" "}
              <span className="text-[#005EB6]">| Discussion Forum</span>
            </h1>
            <p className="text-sm md:text-md text-gray-700 font-dm-sans max-w-xl text-center md:text-left">
              Ask. Discuss. Learn Together.
            </p>
          </div>
          <Image src={Iconcommunity} alt="community" className="hidden md:block" />
        </div>

        {/* ===== TABS ===== */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center cursor-pointer gap-2 pb-3 font-medium transition relative ${isActive
                  ? "text-[#FF5635]"
                  : "text-[#1A1D1F]"
                  }`}
              >
                <img
                  src={tab.icon.src}
                  alt={tab.label}
                  width={18}
                  height={18}
                  style={{
                    filter: isActive
                      ? 'invert(42%) sepia(93%) saturate(2878%) hue-rotate(346deg) brightness(101%) contrast(102%)'
                      : 'invert(7%) sepia(8%) saturate(1018%) hue-rotate(169deg) brightness(96%) contrast(92%)'
                  }}
                />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5635]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* ===== SEARCH + POST BUTTON ===== */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Select Question, Topic, Subtopic..."
            className="w-full md:flex-1 px-4 py-2 border rounded-[2px] outline-none font-dm-sans"
          />
          <button
            onClick={() => router.push("/Community/Post")}
            className="bg-[#FF5635] w-full md:w-[200px] cursor-pointer text-white px-6 py-2 rounded-[2px] hover:bg-[#FF5635]/80 whitespace-nowrap font-dm-sans "
          >
            Post a Doubt
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-[4px] overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#005EB6] text-white">
                <th className="text-left px-4 py-3 font-medium font-poppins" style={{ width: '50%' }}>
                  Forum
                </th>
                <th className="text-left px-4 py-3 font-medium font-poppins" style={{ width: '25%' }}>
                  Topic
                </th>
                <th className="text-left px-4 py-3 font-medium font-poppins" style={{ width: '25%' }}>
                  Posted by
                </th>
              </tr>
            </thead>
            <tbody>
              {forum.length > 0 ? (
                forum.map((item: any) => (
                  <tr
                    key={item._id}
                    onClick={() => handleDiscussion(item)}
                    className="border-b hover:bg-gray-50 cursor-pointer transition"
                  >
                    {/* Forum Title */}
                    <td className="py-1 px-4 text-black font-dm-sans">
                      <div className="line-clamp-2">
                        {item?.title || "—"}
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="px-4 py-1 text-black font-medium font-dm-sans">
                      {item?.topic?.name || "—"}
                    </td>

                    {/* Posted By */}
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={
                            item?.user?.image
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.user.image}`
                              : avatar.src
                          }
                          alt="user"
                        />
                        <div>
                          <p className="text-md text-black font-medium font-dm-sans">
                            {item?.user?.username || "Unknown"}
                          </p>
                          <p className="text-xs text-[#999A9D]">
                            {item?.createdAt
                              ? `${new Date(item.createdAt).toLocaleDateString()} ${new Date(
                                item.createdAt
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <section className=" bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
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
};

export default Community;
