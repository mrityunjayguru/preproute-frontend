"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Search } from "lucide-react";
import CommonTable from "@/Common/CommonTable";
import { getcoupon, setUpdatecoupon, updatecoupon } from "@/api/coupon";
import { formatDateTime } from "@/Common/ComonDate";

function CouponTable() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(
    (state: any) => state?.coupon?.coupon?.data || []
  );


  const [search, setSearch] = useState<string>("");

  /* ================= Fetch Coupons ================= */
  const fetchCoupons = async () => {
    const payload: any = {};
    await dispatch(getcoupon(payload));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* ================= Table Columns ================= */
  const columns = [
    { header: "Code", accessor: "discountCode" },
    {
      header: "Discount ",
      accessor: (row: any) => `${row.discountValue}`,
    },
    {
      header: "Start Date",
      accessor: (row: any) =>
        row.discountStart ? formatDateTime(row.discountStart) : "-",
    },
    {
      header: "End Date",
      accessor: (row: any) =>
        row.discountEnd ? formatDateTime(row.discountEnd) : "-",
    },
  ];

  /* ================= Search ================= */
  const filteredData = data.filter((item: any) =>
    item.discountCode
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= Actions ================= */
  const handleEdit = async (val: any) => {
    await dispatch(setUpdatecoupon(val));
  };

  const handleToggle = async (coupon: any) => {
    try {
      await dispatch(
        updatecoupon({
          ...coupon,
          isDeleted: !coupon.isDeleted,
        })
      );
      await fetchCoupons();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          Discount Coupon List
        </h2>

        {/* Search */}
        <div className="w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-2 border border-gray-200">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search coupon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>
<div className=" mb-10">
      <CommonTable
        data={filteredData}
        columns={columns}
        onEdit={handleEdit}
        actionLabel="Edit"
      />
        </div>
    </div>
  );
}

export default CouponTable;
