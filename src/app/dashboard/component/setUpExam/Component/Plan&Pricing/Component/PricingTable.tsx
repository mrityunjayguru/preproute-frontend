"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getPlanandPricing, setUpdatePlanData } from "@/api/Plan&Pricing";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { Search } from "lucide-react";
import { getCollege } from "@/api/college";

const PricingTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const palnAndpricing = useSelector(
    (state: any) => state?.palnAndpricing?.plandetail || []
  );

  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload: any = {};
    await dispatch(getPlanandPricing(payload));
    await dispatch(getCollege(payload));

  };

  useEffect(() => {
    getData();
  }, []);
 
  // Filter Logic
  const filteredData = palnAndpricing.filter((item: any) => {
    const searchLower = search.toLowerCase();
console.log(item,"itemitem")
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
        row?.exams?.length
          ? row.exams.map((ex: any) => ex.examInfo?.examname).join(", ")
          : "-",
    },

    { header: "Price", accessor: "price" },

    {
      header: "Created At",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];
  const handleEdit = (val: any) => {
    dispatch(setUpdatePlanData(val))
  };
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-md font-poppins font-medium text-[#1570EF] mb-4">
          Plan List
        </h2>
        {/* Search box */}
        <div className=" w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-3 border border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search plan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>
      <div>
        <CommonTable
          data={filteredData}
          columns={columns}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default PricingTable;
