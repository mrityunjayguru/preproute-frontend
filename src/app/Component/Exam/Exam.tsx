import React from 'react'
import UserExam from './Component/Exam'
import TopPratices from './Component/TopPratices'
import { ExamHeader } from './Component/ExamHeader'


function Exam() {
  return (
    <div>
      <ExamHeader/> 
      <UserExam/>
      <TopPratices/>
    </div>
  )
}

export default Exam
