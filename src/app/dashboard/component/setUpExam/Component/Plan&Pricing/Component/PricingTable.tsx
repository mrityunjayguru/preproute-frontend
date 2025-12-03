"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getPlanandPricing } from "@/api/Plan&Pricing";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";

const PricingTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || []
  );

  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload: any = {};
    await dispatch(getPlanandPricing(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter Logic
  const filteredData = palnAndpricing.filter((item: any) => {
    const searchLower = search.toLowerCase();

    return (
      item?.title?.toLowerCase().includes(searchLower) ||
      item?.price?.toString().includes(searchLower) ||
      item?.examDetails?.some((ex: any) =>
        ex?.examname?.toLowerCase().includes(searchLower)
      )
    );
  });

  const columns = [
    { header: "Title", accessor: "title" },

    {
      header: "Exam Names",
      accessor: (row: any) =>
        row?.examDetails?.length
          ? row.examDetails.map((ex: any) => ex.examname).join(", ")
          : "-",
    },

    { header: "Price", accessor: "price" },

    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];
const handleEdit=(val:any)=>{
console.log(val,"lllll")
}
  return (
    <div className="bg-[#F7F7F5] p-6 rounded-lg">
      <Input
        type="text"
        placeholder="Search by Title / Exam / Price"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 bg-white"
      />

      <CommonTable data={filteredData} columns={columns} onEdit={handleEdit} />
    </div>
  );
};

export default PricingTable;
