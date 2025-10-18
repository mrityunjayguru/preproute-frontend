import React from 'react'
import UserExam from './Component/Exam'
import TopPratices from './Component/TopPratices'
import { ExamHeader } from './Component/ExamHeader'


function Exam() {
  return (
    <div className='bg-[#fff] lg:px-20'>
      <ExamHeader/> 
      <UserExam/>
    </div>
  )
}

export default Exam
