"use client";

import { getComments, getForums, singleForum } from "@/api/forum";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const tabs = [
  { id: "forum", label: "Forum" },
  { id: "my-doubts", label: "My Doubts" },
  { id: "my-discussions", label: "My Discussions" },
];

const forumData = [
  {
    id: 1,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ex mi, id facilisis dui finibus ac.",
    topic: "Arithmetic",
    user: "Chitresh Chaudhary",
    avatar: "https://i.pravatar.cc/40?img=1",
    date: "26/01/2026 1:41",
    type: "forum",
  },
  {
    id: 2,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ex mi, id facilisis dui finibus ac.",
    topic: "Reasoning",
    user: "Vikash Pandey",
    avatar: "https://i.pravatar.cc/40?img=2",
    date: "26/01/2026 1:41",
    type: "my-doubts",
  },
  {
    id: 3,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ex mi, id facilisis dui finibus ac.",
    topic: "Quantum Physics",
    user: "Hetvi Shah",
    avatar: "https://i.pravatar.cc/40?img=3",
    date: "26/01/2026 1:41",
    type: "my-discussions",
  },
  {
    id: 4,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ex mi, id facilisis dui finibus ac.",
    topic: "General Relativity",
    user: "Niraj Tiwari",
    avatar: "https://i.pravatar.cc/40?img=4",
    date: "26/01/2026 1:41",
    type: "forum",
  },
];

const Community = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forum = useSelector((state: any) => state.forum.forums);
  console.log(forum, "forumforum");
  const [activeTab, setActiveTab] = useState("forum");
  const router = useRouter();
  const filteredData =
    activeTab === "forum"
      ? forumData
      : forumData.filter((item) => item.type === activeTab);

  const getForum = async () => {
    const payload: any = {};
    dispatch(getForums(payload));
  };
  useEffect(() => {
    getForum();
  }, []);
  const handleDiscussion = async (val: any) => {
    const payload: any = {
      postId: val?._id,
    };
    await dispatch(singleForum(payload));
    await dispatch(getComments(payload));
    router.push(`Community/Discussion`);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 font-medium transition ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Select Question, Topic, Subtopic..."
          className="w-2/3 px-4 py-2 border rounded-md outline-none"
        />
        <button
          onClick={() => router.push("Community/Post")}
          className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600"
        >
          Post a Question
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="grid grid-cols-12 bg-blue-700 text-white p-3 font-semibold">
          <div className="col-span-7">Forum</div>
          <div className="col-span-2">Topic</div>
          <div className="col-span-3">Posted by</div>
        </div>

        {/* Rows */}
        {forum?.length > 0 ? (
          forum?.map((item: any, index: any) => (
            <div
              onClick={() => handleDiscussion(item)}
              key={item.id}
              className="grid grid-cols-12 p-4 border-b last:border-none hover:bg-gray-50"
            >
              <div className="col-span-7 text-gray-700">{item?.title}</div>

              {/* <div className="col-span-2 font-medium text-gray-600">
                {item.topic}
              </div> */}

              <div className="col-span-3 flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-full"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.user?.image}`}
                  alt="user"
                />

                <div>
                  <p className="text-sm font-medium">{item?.user?.username}</p>
                  <p className="text-xs text-gray-500">{item?.createdAt}</p>
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
