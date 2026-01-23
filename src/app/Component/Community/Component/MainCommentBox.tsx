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
    : USER;
const commentPost=async()=>{
  const payload:any={
    content:comment,
    postId:postdetail?.[0]?._id
  }
  await dispatch(addComment(payload))
  setComment("")
  await dispatch(getComments(payload))
}
  return (
    <div className="flex gap-3 mt-6">
      {/* Avatar */}
      <img
        src={imageUrl}
        className="w-9 h-9 rounded-full object-cover"
      />

      {/* Input */}
      <div className="flex-1 flex items-center gap-2 border rounded-full px-4 py-2 bg-white">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="add comment"
          className="flex-1 text-sm outline-none"
        />

        <button
        onClick={commentPost}
          disabled={!comment.trim()}
          className={`text-sm px-3 py-1 rounded-full transition
            ${
              comment.trim()
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default MainCommentBox;
