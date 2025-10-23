"use client"
import { getUsers, handleUpdateUserData } from '@/api/Users';
import CommonTable from '@/Common/CommonTable';
import { formatDateTime } from '@/Common/ComonDate';
import { AppDispatch } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";

function userTable() {
    const router = useRouter();
    const dispatch=useDispatch<AppDispatch>()
    const data=useSelector((state:any)=>state.user.user)
    const [search,setSearch]=useState<string>("")
    const fetchUsers = async () => {
      const payload:any={}
      await dispatch(getUsers(payload));
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
      const columns = [
        { header: "Name", accessor: "username" },
        { header: "Email", accessor: "email" },
        { header: "Phone", accessor: "phone" },

         {
              header: "Created At",
              accessor: (row: any) =>
              row.createdAt ? formatDateTime(row.createdAt) : "-",
         },
      ];
        const filteredData = data.filter((item: any) =>
    item.username?.toLowerCase().includes(search.toLowerCase())
  );
  const handleEdit=async(val:any)=>{
      //  router.push("users/create");
      await dispatch(handleUpdateUserData(val))
       router.push("users/create");

    // console.log(val)
  }
  return (
    <div>
        <CommonTable
        data={filteredData}
        columns={columns}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default userTable
