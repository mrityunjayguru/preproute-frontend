import React from "react";
import { X } from "lucide-react";

interface SupportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const SupportPopup: React.FC<SupportPopupProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) return null;

  const type = data?.type?.toLowerCase();

  const paperName = data?.questionPaper?.questionPapername || "-";
  const examName = data?.questionPaper?.exam?.examname || "-";
  const questionNo = data?.question?.questionNo || "-";
  const email = data?.user?.email || "-";

  const isSupport = type === "suport";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg relative">
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
        <div className="p-6 space-y-4 text-sm">
          {/* Title */}
        <div className="min-w-0">
  <span className="font-medium">Title:</span>
  <p className="text-gray-700 break-words">
    {data?.title || "-"}
  </p>
</div>


          {/* Message */}
          <div>
            <span className="font-medium">Message:</span>
            <p className="text-gray-700 whitespace-pre-wrap">
              {data?.message || "-"}
            </p>
          </div>

          {/* Exam Detail (hidden for support) */}
          {!isSupport && (
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
            <p className="text-gray-700">{email}</p>
          </div>

          {/* Created On */}
          <div>
            <span className="font-medium">Created On:</span>
            <p className="text-gray-700">
              {data?.createdAt
                ? new Date(data.createdAt).toLocaleString()
                : "-"}
            </p>
          </div>
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
