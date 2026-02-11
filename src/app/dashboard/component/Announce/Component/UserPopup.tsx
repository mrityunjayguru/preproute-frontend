import React from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import CommonTable from "@/Common/CommonTable";

interface UserPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ isOpen, onClose }) => {
  const purchasedUsers = useSelector(
    (state: any) => state.coupon.purchasedCoupon || []
  );

  if (!isOpen) return null;

  const columns = [
    {
      header: "Coupon Code",
      accessor: (row: any) => row.coupon?.code || "-",
    },
    {
      header: "Discount",
      accessor: (row: any) =>
        row.coupon?.discountValue
          ? `₹${row.coupon.discountValue}`
          : "-",
    },
    {
      header: "User Name",
      accessor: (row: any) => row.userName || "-",
    },
    {
      header: "User Email",
      accessor: (row: any) => row.userEmail || "-",
    },
  ];

  return (
    /* BACKDROP */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* MODAL */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl relative">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Purchased Coupon Users:) <strong className="text-[#FF5635]">{purchasedUsers.length}</strong>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {purchasedUsers.length === 0 ? (
            <p className="text-center text-gray-500">
              No users found for this coupon
            </p>
          ) : (
            <CommonTable
                data={purchasedUsers}
                columns={columns} onDelete={function (row: any): void {
                  throw new Error("Function not implemented.");
                } }            />
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#FF5635] text-white rounded-md hover:bg-[#e14c2f]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
