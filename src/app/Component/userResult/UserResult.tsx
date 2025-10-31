
"use client"
import React from 'react'
import SummaryTabs from './component/SummaryTabs'
import { useSelector } from 'react-redux';

function UserResult() {
  const examResult = useSelector((state: any) => state.question?.result?.data);

console.log(examResult,"examResult")
  return (
 <div className="min-h-screen bg-gray-50 p-6">
      <SummaryTabs data={examResult} />
    </div>
  )
}

export default UserResult
