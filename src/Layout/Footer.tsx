"use client"
import { createReport } from "@/api/Users";
import Popup from "@/app/Component/ManageExam/Component/Report"
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export const Footer=()=>{
  const dispatch=useDispatch()
  const routes=useRouter()
  const [showPopup, setShowPopup] = useState(false);
  const submitReport=async(val:any)=>{
    const payload:any={
  title:val
    }
    await dispatch(createReport(payload))
      setShowPopup(false);
  }
  const handlenaviagte=(route:any)=>{
    routes.push(`${route}`)
  }
    return(
      <>
          <Popup
              title="Support"
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
              onSubmit={submitReport}
              question="kkkkkkk"
            />
           <footer className="w-full bg-transparent py-4 text-xs text-gray-500 z-20">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            
           <span>copyright symbol 2025</span>  A product of <a href="#" className="text-red-500">Brillovate Pvt. Ltd.</a> All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a onClick={()=>handlenaviagte("Privacy")}  className="hover:underline cursor-pointer">Privacy</a>
            {/* <a href="#" className="hover:underline">Refund Policy</a> */}
            <a onClick={()=>handlenaviagte("Term&condition")}  className="hover:underline cursor-pointer">Terms of Use</a>
            <a onClick={()=>setShowPopup(true)} href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
      </>
    )
}