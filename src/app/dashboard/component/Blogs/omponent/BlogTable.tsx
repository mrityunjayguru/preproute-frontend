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

function BlogTable() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.blog?.Blog || []);
  const [search, setSearch] = useState<string>("");
  const fetchUsers = async () => {
    const payload: any = {};
    await dispatch(getblog(payload));
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const columns = [
    { header: "title", accessor: "title" },
    // { header: "description", accessor: "description" },

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
    // console.log(val,"valvalvalval")
    await dispatch(handlesetUpdateBlog(val));
    // router.push("users/create");

    // console.log(val)
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          User List
        </h2>
        {/* Search box */}
        <div className="w-[90%] md:w-96 bg-white rounded-[2px] flex items-center px-4 py-2 border border-gray-200">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 font-poppins"
          />
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

export default BlogTable;
