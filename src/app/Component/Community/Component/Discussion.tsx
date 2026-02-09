"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CommentTree from "./CommentTree";
import { MessageCircle, ThumbsUp } from "lucide-react";
import MainCommentBox from "./MainCommentBox";
import { AppDispatch } from "@/store/store";
import { getComments, likePost, singleForum } from "@/api/forum";
import RenderPreview from "@/Common/CommonLatex";
import { getSocket } from "@/socket";
import USER from "@/assets/vectors/user.svg";
import Heart from "@/assets/vectors/heart.svg";
import Report from "@/assets/vectors/warning.svg";
import Image from "next/image";
import Iconcommunity from "@/assets/images/community.png";
import Iconforum from "@/assets/vectors/forum.svg";
import Iconmydoubts from "@/assets/vectors/warning.svg";
import Iconmydiscussions from "@/assets/vectors/messages.svg";
import avatar from "@/assets/vectors/user.svg";
import SocialMedia from "../../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";


const tabs = [
  { id: "forum", label: "Forum", icon: Iconforum },
  { id: "my-doubts", label: "My Doubts", icon: Iconmydoubts },
  { id: "my-discussions", label: "My Discussions", icon: Iconmydiscussions },
];

const Discussion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const postdetail = useSelector((state: any) => state.forum.singleForum);
  const comments = useSelector((state: any) => state?.forum?.comments);
  const [activeTab, setActiveTab] = useState("forum");

  const post = postdetail?.[0];
  const [showComments, setShowComments] = useState(false);
  const handlelike = async (post: any) => {
    const payload: any = {
      forumId: post._id,
      postId: post._id,
    };
    await dispatch(likePost(payload));
    await dispatch(singleForum(payload));

    // console.log("like clicked",post)
  };
  useEffect(() => {
    if (!post?._id) return;

    const socket = getSocket();
    socket.connect();

    // join post room
    socket.emit("join-post", post?._id);

    // listen for new comment
    socket.on("new-comment", (comment) => {
      const payload: any = {
        postId: post._id,
      };
      dispatch(singleForum(payload));
      dispatch(getComments(payload));
    });

    return () => {
      socket.off("new-comment");
      socket.emit("leave-room", post?._id);
    };
  }, [post?._id, dispatch]);
  return (
    <div>
    <div className="min-h-screen bg-white px-6 sm:px-8 md:px-12 lg:px-28">
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
      {/* ================= POST ================= */}
      {post && (
        <div className="bg-white p-8 mb-6">
          {/* Header with Title and Back Button */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
            <h1 className="text-2xl font-normal text-[#005EB6] flex-1 pr-4">{post.title}</h1>
            <button
              onClick={() => window.history.back()}
              className="bg-[#6366F1] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#5558E3] transition self-start md:self-auto"
            >
              Back
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={
                post.user?.image
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${post.user.image}`
                  : USER.src
              }
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-sm text-[#1A1D1F] font-medium">{post.user?.username}</p>
              <p className="text-xs text-[#6B7280]">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-[#000000] font-dm-sans leading-relaxed mb-6">
            <RenderPreview content={post.description} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-between items-center gap-4 my-6">
            <button
              onClick={() => handlelike(post)}
              className={`flex items-center gap-2 cursor-pointer transition ${post.isLiked ? "text-[#005EB6]" : "text-[#6B7280]"
                }`}
            >
              <div className={`p-2 rounded-full flex items-center justify-center ${post.isLiked ? "bg-[#5071FF]" : "bg-gray-100"}`}>
                <Image
                  src={Heart}
                  alt="Like"
                  height={10}
                  width={10}
                  className={post.isLiked ? "" : "invert opacity-50"}
                />
              </div>
              <span className="text-xs text-[#585859] font-medium">{post.likeCount} Likes</span>
            </button>

            <button className="flex items-center cursor-pointer justify-center gap-2 text-[#6B7280]">
              <span className="text-sm">
                <Image
                  src={Report}
                  alt="Like"
                  height={15}
                  width={15}
                />
              </span>
              <span className="text-sm">Report this topic</span>
            </button>
          </div>

          {/* ================= ANSWERS SECTION ================= */}
          <div className="border-b-1 border-[#C8DCFE] pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-poppins font-medium text-[#1A1D1F] self-start md:self-auto">
                {comments?.length || 0} Answers
              </h2>
              <button
                onClick={() => setShowComments(!showComments)}
                className="bg-[#FF5635] w-full md:w-[200px] cursor-pointer text-white px-6 py-2 rounded-[2px] hover:bg-[#FF5635]/80 whitespace-nowrap font-dm-sans"
              >
                Reply this Doubt
              </button>
            </div>


            {/* Comment Input */}
            {showComments && (
              <div className="mb-6">
                <MainCommentBox />
              </div>
            )}
          </div>
          <div>

            {/* Comments List */}
            {comments?.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment: any) => (
                  <CommentTree key={comment._id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center font-poppins py-8">No answers yet. Be the first to answer!</p>
            )}
          </div>
        </div>
      )}
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

export default Discussion;
