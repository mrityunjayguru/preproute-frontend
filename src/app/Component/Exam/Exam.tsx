import React, { useEffect } from 'react'
// import TopPratices from './_component/TopPratices'
import MergedExamPage from './_component/Exam'
import { handleSetLoder } from '@/api/Exam'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';


function Exam() {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
  setTimeout(()=>{
     const loderPayload:any=false
   dispatch(handleSetLoder(loderPayload));
  })
    },[])
  return (
    <div className='mx-auto'>
      <MergedExamPage/>
    </div>
  )
}

export default Exam
