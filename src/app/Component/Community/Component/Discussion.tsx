"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CommentTree from "./CommentTree";
import { MessageCircle, ThumbsUp } from "lucide-react";
import MainCommentBox from "./MainCommentBox";
import { AppDispatch } from "@/store/store";
import { getComments, likePost, singleForum } from "@/api/forum";
import RenderPreview from "@/Common/CommonLatex";
import { getSocket } from "@/socket";

const Discussion = () => {
  const dispatch = useDispatch<AppDispatch>();

  const postdetail = useSelector((state: any) => state.forum.singleForum);
  const comments = useSelector((state: any) => state.forum.comments);

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
    if (!post._id) return;

    const socket = getSocket();
    socket.connect();

    // join post room
    socket.emit("join-post", post._id);

    // listen for new comment
    socket.on("new-comment", (comment) => {
      console.log(comment, "commentcomment");
      const payload: any = {
        postId: post._id,
      };
      dispatch(singleForum(payload));
      dispatch(getComments(payload));
    });

    return () => {
      socket.off("new-comment");
      socket.emit("leave-room", post._id);
    };
  }, [post._id, dispatch]);
  return (
    <div className="max-w-4xl mx-24 min-h-screen p-6 bg-[#fff]">
      {/* ================= POST ================= */}
      {post && (
        <div className=" p-5 ">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-[#005EB6]">{post.title}</h1>

          {/* User */}
          <div className="flex items-center gap-3 mt-3">
            <img
              src={
                post.user?.image
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${post.user.image}`
                  : "/default-avatar.png"
              }
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm text-[#000000] font-medium">{post.user?.username}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>

            {post.user?.role === "Expert" && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                Expert
              </span>
            )}

            <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
              {post?.topic?.topic}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm font-[400] text-[#000000] leading-relaxed">
            {/* {post.description} */}
            <RenderPreview content={post.description} />
          </p>

          {/* Actions */}
          <div className="flex items-center gap-6 mt-5 text-gray-600">
            <button
              onClick={() => handlelike(post)}
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <span>{post.isLiked ? "👍" : "👍🏻"}</span>
              <span>{post.likeCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <MessageCircle size={18} />
              <span>{comments?.length || 0} Comments</span>
            </button>
          </div>

          {/* ================= COMMENTS ================= */}
          {true && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Discussion</h2>
              <MainCommentBox />
              {comments?.length > 0 ? (
                comments.map((comment: any) => (
                  <CommentTree key={comment._id} comment={comment} />
                ))
              ) : (
                <p className="text-gray-500">No comments yet</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Discussion;
