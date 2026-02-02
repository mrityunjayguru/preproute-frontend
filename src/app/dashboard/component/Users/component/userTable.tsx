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
import Pagination from "@/Common/Pagination";
import DownloadUserPDF from "./DownloadUserPDF";

function userTable() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.user?.user || []);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState("Expert");
  const [page, setPage] = useState(1);
  const [userpassword, setuserpassword] = useState<any>("");
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  let limit = 10;
  const fetchUsers = async () => {
    const payload: any = {
      role,
      search,
      offset: (page - 1) * limit,
      limit,
    };
  let responce:any=  await dispatch(getUsers(payload));
  // console.log(responce.payload.data.total,"responceresponce")
  setTotalPages(Math.ceil(responce?.payload?.data?.total/limit));
  };

  useEffect(() => {
    fetchUsers();
  }, [role, page, search]);
  const baseColumns = [
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Mobile No.", accessor: "phone" },
    {
      header: "Created On",
      accessor: (row: any) =>
        row.createdAt ? formatDateTime(row.createdAt) : "-",
    },
  ];
  const purchaseStatusColumn = {
    header: "purchasedStatus",
    accessor: "purchasedStatus",
  };
  const columns = React.useMemo(() => {
    if (role === "User") {
      return [...baseColumns, purchaseStatusColumn];
    }
    return baseColumns;
  }, [role]);

  const handleEdit = async (val: any) => {
    //  router.push("users/create");
    await dispatch(handleUpdateUserData(val));
    // router.push("users/create");

    // console.log(val)
  };
  const handleDownload = async (val: any) => {
    // console.log("Downloaded user data:", val);
    setSelectedUser(val);
  };
  const handleDelete=()=>{
    console.log("Deleted user data:");
  }
  return (
  <>
    {selectedUser && (
  <DownloadUserPDF
    invoice={{
      plan: selectedUser?.planInfo?.[0],
      otherdetsil: {
        receipt: selectedUser?.completedOrders?.[0]?.receipt,
        invoiceNo: selectedUser?.completedOrders?.[0]?.invoiceNo,
        amount: selectedUser?.completedOrders?.[0]?.amount,
        updatedAt: selectedUser?.completedOrders?.[0]?.updatedAt,
      },
      user: selectedUser,
    }}
    autoDownload
    onDone={() => setSelectedUser(null)}
  />
)}

    <div className="p-6">
      <div className="flex justify-between items-center pb-4 px-4">
        <h2 className="text-md font-poppins font-medium text-[#1570EF]">
          User List
        </h2>
        <div className="w-[90%] md:w-96 bg-white border border-gray-200 rounded-sm flex items-center px-3 py-2 gap-2">
          {/* Role Select */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-sm text-gray-600 bg-transparent outline-none border-r pr-2 cursor-pointer"
          >
            <option value="Expert">Expert</option>
            <option value="User">User</option>
          </select>

          {/* Search Icon */}
          <Search className="w-4 h-4 text-gray-400" />

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 font-poppins"
          />
        </div>
      </div>
      <CommonTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDownload={handleDownload}
      />
      <div className="flex justify-end">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  </>
  );
}

export default userTable;
