"use client";
import { getUsers, handleUpdateUserData } from "@/api/Users";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getblog, handlesetUpdateBlog } from "@/api/Blog";
import { getreport } from "@/api/Report";
import SupportPopup from "./suportPopup";

function SuportTable() {
const truncate = (text: string, max = 30) =>
  text?.length > max ? text.slice(0, max) + "..." : text;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.Report?.Report || []);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState("report");
  const fetchReport = async () => {
    const payload: any = {
      type
    };
    await dispatch(getreport(payload));
  };

  useEffect(() => {
    fetchReport();
  }, [type]);
  
const columns = [
  {
    header: "Title",
    accessor: (row: any) => truncate(row?.title || "-"),
  },
  { header: "Message", accessor: "message" },
  {
    header: "Exam Detail",
    accessor: (row: any) => {
      const paperName = row?.questionPaper?.questionPapername || "-";
      const examName = row?.questionPaper?.exam?.examname || "-";
      const questionNo = row?.question?.questionNo || "-";
      return `${paperName} | ${examName} | Q.${questionNo}`;
    },
  },
  {
    header: "Email",
    accessor: (row: any) => row?.user?.email || "-",
  },
  {
    header: "Created On",
    accessor: (row: any) =>
      row.createdAt ? formatDateTime(row.createdAt) : "-",
  },
];


  const filteredData = data?.filter((item: any) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );
  const [userpassword, setuserpassword] = useState<any>("");

  const handleEdit = async (val: any) => {
    //  router.push("users/create");
  setSelectedRow(val);
  setOpen(true);
    // console.log(val,"valvalvalval")
    // await dispatch(handlesetUpdateBlog(val));
    // router.push("users/create");

  };
  const [open, setOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState<any>(null);

// on row click
const handleOpen = (row: any) => {
  setSelectedRow(row);
  setOpen(true);
};
  return (
    <div className="p-6">
     <SupportPopup
  isOpen={open}
  onClose={() => setOpen(false)}
  data={selectedRow}
/>

      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          Support List
        </h2>
        {/* Search box */}
<div className="w-[90%] md:w-[420px] bg-white rounded-lg flex items-center justify-between px-4 py-2 border border-gray-200 shadow-sm">
  {/* Search */}
  <div className="flex items-center gap-2 flex-1">
    <Search className="w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 font-poppins"
    />
  </div>

  {/* Divider */}
  <div className="h-6 w-px bg-gray-200 mx-3" />

  {/* Dropdown */}
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="bg-transparent text-sm text-gray-700 font-poppins outline-none cursor-pointer"
  >
    {/* <option value="">All</option> */}
    <option value="support">Support</option>
    <option value="report">Report</option>
    <option value="feedback">Feedback</option>
  </select>
</div>


      </div>
      <CommonTable
        data={filteredData}
        columns={columns}
        onEdit={handleEdit}
        actionLabel="Edit"
        
      />
    </div>
  );
}

export default SuportTable;
