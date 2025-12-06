"use client"
import React, { useEffect, useState } from 'react'
import SummaryTabs from './component/SummaryTabs'
import { useSelector, useDispatch } from 'react-redux';
import { getTopic } from '@/api/Topic';
import { AppDispatch } from '@/store/store';

function UserResult() {
  const examResult = useSelector(
    (state: any) => state.question?.result?.data
  );

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-30 py-10">

      {/* Top Heading */}
      <h1 className="text-3xl font-bold text-[#FF5635] mb-3">
        Performance Analytics
      </h1>
  <h1 className="text-xl mb-6">
       Understand where you stand: your insights, your test performance, and your preparation trends.
      </h1>
      {/* Summary Tabs */}
      <SummaryTabs 
        data={examResult} 
        examName={examResult?.examName} 
      />
    </div>
  );
}

export default UserResult;
