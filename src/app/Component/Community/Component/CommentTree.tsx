import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import USER from "@/assets/vectors/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addComment, getComments, likeComment } from "@/api/forum";
import hert from "@/assets/images/hert.png";
import Popup from "../../ManageExam/Component/Report";
import { createReport } from "@/api/Users";
const CommentTree = ({ comment }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: any) => state?.Auth?.loginUser);
  const [commentId,setCommentId]=useState<any>(null)
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [commentData, setCommentData] = useState<any>(null);
  const [report,setReport]=useState(false);
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
  
const handleReport = (comment:any) => {
  setCommentId(comment)
setReport(true)
  // Implement report functionality here
}
const handleSubmitReport=async(val:any)=>{
  // console.log("report value",commentId)
  const payload:any={
    title:val,
    commentId:commentId?._id,
    userId:userLogin?._id,
    type:"commentReport"
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
<div className="mt-4 bg-[#fff]">
      {/* COMMENT CARD */}
      <div className="flex gap-3">
        <img
          src={
            comment?.user?.image
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${comment.user.image}`
              : USER
          }
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex-1  rounded-xl px-4 py-3">
          {/* Header */}
          <div className="flex justify-between">
            <div className="text-sm">
              <span className="font-semibold">{comment.user?.username}</span>
              <span className="text-xs text-gray-500 ml-2">
                · {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            {/* <MoreHorizontal size={16} className="text-gray-400" /> */}

            <span onClick={()=>handleReport(comment)} className="cursor-pointer">Report</span>
          </div>

          {/* Content */}
          <p className="text-sm font-[400] text-[#000000] mt-1">{comment.content}</p>

          {/* Actions */}
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            {/* Like */}
          <div
  onClick={() => handleLikeComment(comment)}
  className={`cursor-pointer flex items-center gap-1 px-2 py-1 rounded-full shadow transition
    ${comment?.isLiked ? "bg-blue-50 text-blue-600" : "bg-blue-600 text-gray-600"}
  `}
>
  <img
    src={comment?.isLiked ? hert.src : hert.src}
    alt="like"
    className="w-4 h-4 object-contain"
  />

  <span className="text-xs text-[#fff] font-medium">
    {comment?.likeCount ?? 0}
  </span>
</div>


            {/* Reply Toggle */}
            <div
              onClick={() => handleReplyClick(comment)}
              className="cursor-pointer hover:text-blue-600"
            >
              Reply {comment.replyCount > 0 && `(${comment.replyCount})`}
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="flex gap-3 mt-3 ml-12">
          <img src={imageUrl} className="w-8 h-8 rounded-full" />
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSubmit}
            className="border rounded-full px-4 text-sm"
          >
            Reply
          </button>
        </div>
      )}

      {/* Nested Replies (hidden until click) */}
      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-12 mt-3 space-y-3">
          {comment.replies.map((reply: any) => (
            <CommentTree key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
</>

    
  );
};

export default CommentTree;
