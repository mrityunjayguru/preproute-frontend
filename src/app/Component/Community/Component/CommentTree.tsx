import React, { useState } from "react";
import { LogIn, MoreHorizontal } from "lucide-react";
import USER from "@/assets/vectors/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addComment, getComments, likeComment } from "@/api/forum";
import hert from "@/assets/images/hert.png"; // Keeping existing if needed, though likely unused now
import Heart from "@/assets/vectors/heart.svg";
import Image from "next/image";
import Popup from "../../ManageExam/Component/Report";
import { createReport } from "@/api/Users";
import Report from "@/assets/vectors/warning.svg";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import SocialMedia from "../../Home/_componets/social-media";

const CommentTree = ({ comment }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const [commentId, setCommentId] = useState<any>(null)
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [commentData, setCommentData] = useState<any>(null);
  const [report, setReport] = useState(false);
  const [val, setVal] = useState("");

  const imageUrl = userLogin?.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${userLogin.image}`
    : USER;

  // 👍 Like Comment
  const handleLikeComment = async (comment: any) => {
    const payload = {
      forumId: comment.forumId,
      postId: comment.postId,
      commentId: comment._id,
    };
    await dispatch(likeComment(payload));
    await dispatch(getComments(payload));
  };

  // 💬 Toggle Reply Input + Replies
  const handleReplyClick = (comment: any) => {
    setCommentData(comment);
    setShowReplyInput((prev) => !prev);
    setShowReplies(true);
  };

  // ➕ Submit Reply
  const handleSubmit = async () => {

    if (userLogin?.community) return
    if (!val.trim()) return;

    const payload = {
      postId: commentData.postId,
      parentCommentId: commentData._id,
      content: val,
    };

    await dispatch(addComment(payload));
    await dispatch(getComments(payload));

    setVal("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  const handleReport = (comment: any) => {
    setCommentId(comment)
    setReport(true)
    // Implement report functionality here
  }
  const handleSubmitReport = async (val: any) => {
    // console.log("report value",commentId)
    const payload: any = {
      title: val,
      commentId: commentId?._id,
      userId: userLogin?._id,
      type: "commentReport"
    }
    await dispatch(createReport(payload))
    setReport(false)
  }

  return (
    <>
      <Popup
        isOpen={report}
        onClose={() => setReport(false)}
        onSubmit={handleSubmitReport}
        title="Report Comment"
        question=""
      />
      <div className={`bg-white py-6 mb-6 ${comment.length >= 2 ? "border-b border-gray-100" : ""}`}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            {/* Left: User Avatar and Info */}
            <div className="flex gap-3 items-start w-full md:w-auto">
              <img
                src={
                  comment?.user?.image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${comment.user.image}`
                    : USER.src
                }
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="min-w-[120px]">
                <p className="font-medium text-sm text-[#1A1D1F]">
                  {comment.user?.username}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }).replace(',', '')}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto justify-between md:justify-start">
              <button
                onClick={() => handleLikeComment(comment)}
                className={`flex items-center gap-2  cursor-pointer transition ${comment?.isLiked ? "text-[#005EB6]" : "text-[#6B7280]"}`}
              >
                <div className={`p-1.5 rounded-full flex items-center justify-center ${comment?.isLiked ? "bg-[#5071FF]" : "bg-gray-100"}`}>
                  <Image
                    src={Heart}
                    alt="Like"
                    height={14}
                    width={14}
                    className={comment?.isLiked ? "" : "invert opacity-50"}
                  />
                </div>
                <span className="text-sm">{comment?.likeCount ?? 0} Likes</span>
              </button>

              <button
                onClick={() => handleReport(comment)}
                className="text-xs  text-[#6B7280] hover:text-red-500 transition cursor-pointer flex items-center gap-2"
              >
                <span className="text-sm">
                  <Image
                    src={Report}
                    alt="Report"
                    height={15}
                    width={15}
                  />
                </span>
                <span className="text-sm">Report this topic</span>
              </button>
            </div>
          </div>

          {/* Bottom: Content */}
          <div className="pl-[52px]">
            {comment.isBestAnswer && (
              <span className="inline-block bg-[#D4F4DD] text-[#22C55E] text-xs font-medium px-3 py-1 rounded-sm mb-3">
                Best Answer
              </span>
            )}

            <p className="text-sm text-[#374151] leading-relaxed mb-2">
              {comment.content}
            </p>

            {comment.link && (
              <a
                href={comment.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#005EB6] hover:underline block"
              >
                {comment.link}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="flex flex-col md:flex-row gap-3 mb-6 ml-4 md:ml-14">
          <img src={imageUrl} className="w-8 h-8 rounded-full object-cover hidden md:block" />
          <input
            disabled={userLogin?.community}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:border-[#005EB6] w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#005EB6] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#004A8F] transition w-full md:w-auto"
          >
            Reply
          </button>
        </div>
      )}

      {/* Nested Replies (hidden until click) */}
      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-4 md:ml-14 space-y-4 mb-6">
          {comment.replies.map((reply: any) => (
            <CommentTree key={reply._id} comment={reply} />
          ))}
        </div>
      )}
 
      
    </>
  );
};

export default CommentTree;
