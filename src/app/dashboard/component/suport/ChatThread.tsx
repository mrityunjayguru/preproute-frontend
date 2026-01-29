import React from "react";

interface User {
  _id?: string;
  email?: string;
  name?: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user?: User;
  replies?: Comment[];
}

interface ChatThreadProps {
  comment: Comment;
  level?: number;
}

const ChatThread: React.FC<ChatThreadProps> = ({
  comment,
  level = 0,
}) => {
  return (
    <div className="mt-3" style={{ marginLeft: level * 16 }}>
      {/* Comment Box */}
      <div className="border rounded-lg p-3 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span className="font-medium">
            {comment?.user?.email || "Unknown user"}
          </span>
          <span>
            {comment?.createdAt
              ? new Date(comment.createdAt).toLocaleString()
              : "-"}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-800 whitespace-pre-wrap">
          {comment?.content || "-"}
        </p>
      </div>

      {/* Recursive Replies */}
      {Array.isArray(comment?.replies) &&
        comment.replies.length > 0 && (
          <div className="mt-2 space-y-2">
            {comment.replies.map((reply) => (
              <ChatThread
                key={reply._id}
                comment={reply}
                level={level + 1}
              />
            ))}
          </div>
        )}
        
    </div>
  );
};

export default ChatThread;
