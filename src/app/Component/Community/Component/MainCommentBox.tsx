"use client";
import { addComment, getComments } from "@/api/forum";
import { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import USER from "@/assets/vectors/user.svg";

const MainCommentBox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postdetail = useSelector(
    (state: any) => state.forum.singleForum
  );
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);

  const [comment, setComment] = useState("");
  const imageUrl = userLogin?.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${userLogin.image}`
    : USER.src;
  const commentPost = async () => {
    if (userLogin?.community) return
    const payload: any = {
      content: comment,
      postId: postdetail?.[0]?._id
    }
    await dispatch(addComment(payload))
    setComment("")
    await dispatch(getComments(payload))
  }
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      {/* Avatar */}
      <img
        src={imageUrl}
        className="w-10 h-10 rounded-full object-cover hidden md:block"
      />

      {/* Input */}
      <div className="flex-1 flex flex-col md:flex-row items-center gap-3 w-full">
        <input
          value={comment}
          disabled={userLogin?.community}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 text-sm outline-none border border-gray-300 rouneded-[2px] px-4 py-2.5 focus:border-[#005EB6] w-full"
        />

        <button
          onClick={commentPost}
          disabled={!comment.trim()}
          className={`text-sm w-full md:w-[200px] px-6 py-2.5 font-medium transition ${comment.trim()
            ? "bg-[#005EB6] text-white hover:bg-[#004A8F]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default MainCommentBox;
