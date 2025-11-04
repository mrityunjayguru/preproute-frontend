
"use client"
import React, { useEffect, useState } from 'react'
import SummaryTabs from './component/SummaryTabs'
import { useSelector } from 'react-redux';
import { getTopic } from '@/api/Topic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

function UserResult() {
  const examResult = useSelector((state: any) => state.question?.result?.data);

  const dispatch=useDispatch<AppDispatch>()
  const [search, setSearch] = useState("");
  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
 <div className="min-h-screen bg-gray-50 p-6">
      <SummaryTabs data={examResult} />
    </div>
  )
}

export default UserResult
