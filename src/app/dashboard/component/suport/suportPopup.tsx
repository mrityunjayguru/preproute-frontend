import React from "react";
import { X } from "lucide-react";
import ChatThread from "./ChatThread";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { blockCommunity } from "@/api/forum";

interface SupportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  chat: any;
}

const SupportPopup: React.FC<SupportPopupProps> = ({
  isOpen,
  onClose,
  data,
  chat,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  if (!isOpen || !data) return null;

  const type = data?.type?.toLowerCase();
  const isCommentReport = type === "commentreport";

  // ---------- Normal Data ----------
  const normalTitle = data?.title || "-";
  const normalMessage = data?.message || "-";
  const normalEmail = data?.user?.email || "-";
  const normalCreatedAt = data?.createdAt;

  // ---------- Comment Report Data ----------
  const commentContent = data?.comment?.content || "-";
  const commentEmail = data?.comment?.user?.email || "-";
  const commentCreatedAt = data?.comment?.createdAt;

  // ---------- Exam Detail ----------
  const paperName = data?.questionPaper?.questionPapername || "-";
  const examName = data?.questionPaper?.exam?.examname || "-";
  const questionNo = data?.question?.questionNo || "-";
  const blockUser=()=>{
    const payload:any={
      userId:data?.comment?.userId,
    }
    dispatch(blockCommunity(payload))
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold capitalize">
            {type || "Detail"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <span className="font-medium">Title:</span>
            <p className="text-gray-700 break-words">
              {isCommentReport ? commentContent : normalTitle}
            </p>
          </div>

          {/* Message */}
          <div>
            <span className="font-medium">Message:</span>
            <p className="text-gray-700 whitespace-pre-wrap">
              {isCommentReport ? commentContent : normalMessage}
            </p>
          </div>

          {/* Exam Detail */}
          {!isCommentReport && (
            <div>
              <span className="font-medium">Exam Detail:</span>
              <p className="text-gray-700">
                {paperName} | {examName} | Q.{questionNo}
              </p>
            </div>
          )}

          {/* User Email */}
          <div>
            <span className="font-medium">User Email:</span>
            <p className="text-gray-700">
              {isCommentReport ? commentEmail : normalEmail}
            </p>
          </div>

          {/* Created On */}
          <div>
            <span className="font-medium">Created On:</span>
            <p className="text-gray-700">
              {(isCommentReport ? commentCreatedAt : normalCreatedAt)
                ? new Date(
                    isCommentReport
                      ? commentCreatedAt
                      : normalCreatedAt
                  ).toLocaleString()
                : "-"}
            </p>
          </div>

          {/* 🔥 Conversation Thread */}
          {chat && (
            <div>
              <h3 className="font-semibold text-base mb-2">
                Conversation
              </h3>

              <ChatThread comment={chat} />
              <div>
            <Button onClick={blockUser} className="cursor-pointer">Block User</Button>
        </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPopup;
