"use client";
import React from 'react'
import Exam from '../component/Exam/Exam'
import SelectExamForm from '../component/SelectExam/SelectExam';
function page() {
  return (
    <div className='mt-20'>
      {/* <Exam/> */}
      <SelectExamForm/>
    </div>
  )
}

export default page
