"use client";

import { conversation, getreport } from "@/api/Report";
import CommonTable from "@/Common/CommonTable";
import { formatDateTime } from "@/Common/ComonDate";
import { AppDispatch } from "@/store/store";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "lucide-react";
import SupportPopup from "./suportPopup";

function SuportTable() {
  const dispatch = useDispatch<AppDispatch>();
  const rawData = useSelector((state: any) => state?.Report?.Report || []);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("report");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [chat,setChat]=useState<any>(null)
  const truncate = (text: string, max = 30) =>
    text?.length > max ? text.slice(0, max) + "..." : text;

  const fetchReport = async () => {
    await dispatch(getreport({ type }));
  };

  useEffect(() => {
    fetchReport();
  }, [type]);

  /**
   * ✅ Normalize data
   */
  const formattedData = useMemo(() => {
    return rawData.map((item: any) => {
      const isCommentReport = item?.type === "commentReport";
      const content = item?.comment?.content || "-";

      return {
        ...item,
        displayTitle: isCommentReport ? content : item?.title || "-",
        displayMessage: isCommentReport ? content : item?.message || "-",
      };
    });
  }, [rawData]);

  /**
   * ✅ Search
   */
  const filteredData = useMemo(() => {
    return formattedData.filter((item: any) =>
      item.displayTitle?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [formattedData, search]);

  /**
   * ✅ Dynamic Columns
   */
  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: "Title",
        accessor: (row: any) => truncate(row.displayTitle),
      },
      {
        header: "Message",
        accessor: (row: any) => truncate(row.displayMessage, 50),
      },
    ];

    // ❌ Hide Exam Detail for commentReport
    if (type !== "commentReport") {
      baseColumns.push({
        header: "Exam Detail",
        accessor: (row: any) => {
          const paperName =
            row?.questionPaper?.questionPapername || "-";
          const examName =
            row?.questionPaper?.exam?.examname || "-";
          const questionNo = row?.question?.questionNo || "-";
          return `${paperName} | ${examName} | Q.${questionNo}`;
        },
      });
    }

    baseColumns.push(
      {
        header: "Email",
        accessor: (row: any) => row?.user?.email || "-",
      },
      {
        header: "Created On",
        accessor: (row: any) =>
          row?.createdAt ? formatDateTime(row.createdAt) : "-",
      },
    );

    return baseColumns;
  }, [type]);

  const handleEdit = async(row: any) => { 
    if(row?.commentId){
  //  alert(row?.commentId)

 const payload:any={
      id:row?.commentId
    }  
   let responce:any=await dispatch(conversation(payload))
   console.log(responce.payload)
   setChat(responce.payload)
    }
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <SupportPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        data={selectedRow}
        chat={chat} 
      />

      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          Support List
        </h2>

        {/* Search & Filter */}
        <div className="w-[90%] md:w-[420px] bg-white rounded-lg flex items-center px-4 py-2 border border-gray-200 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <div className="h-6 w-px bg-gray-200 mx-3" />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent text-sm outline-none cursor-pointer"
          >
            <option value="support">Support</option>
            <option value="report">Report</option>
            <option value="feedback">Feedback</option>
            <option value="commentReport">Comment Report</option>
          </select>
        </div>
      </div>

      <CommonTable
        data={filteredData}
        columns={columns}
        onEdit={handleEdit}
        actionLabel="View"
      />
    </div>
  );
}

export default SuportTable;
