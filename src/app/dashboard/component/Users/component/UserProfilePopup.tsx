import React from "react";

interface Props {
  user: any;
  onClose: () => void;
}

const UserProfilePopup: React.FC<Props> = ({ user, onClose }) => {
  if (!user) return null;

  const heardFrom =
    user.profile?.heardFrom?.flat?.().join(", ") || "-";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white  rounded-xl shadow-lg p-6 relative w-[500px]   overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>

        {/* User Info */}
        <div className="space-y-2 text-sm">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Nickname:</b> {user.nickname}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Google Login:</b> {user.isGoogle ? "Yes" : "No"}</p>
          <p><b>Status:</b> {user.status ? "Active" : "Inactive"}</p>
          <p><b>Stream:</b> {user.profile?.stream || "-"}</p>
          <p><b>Year:</b> {user.profile?.year || "-"}</p>
          <p><b>Heard From:</b> {heardFrom}</p>
        </div>

        {/* Exam Details */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Exam Details</h3>

          {user.examDetails?.length ? (
            <div className="space-y-2">
              {user.examDetails.map((exam: any) => (
                <div
                  key={exam._id}
                  className="border rounded-lg p-3 text-sm bg-gray-50"
                >
                  <p><b>Name:</b> {exam.examname}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No exams assigned</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;
