"use client";
import { createReport } from "@/api/Users";
import Popup from "@/app/Component/ManageExam/Component/Report";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Footer = () => {
  const dispatch = useDispatch();
  const routes = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const submitReport = async (val: any) => {
    const payload: any = {
      title: val,
    };
    await dispatch(createReport(payload) as any);
    setShowPopup(false);
  };
  const handlenaviagte = (route: any) => {
    routes.push(`${route}`);
  };
  return (
    <>
      <Popup
        title="Support"
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={submitReport}
        question="kkkkkkk"
      />
      <footer className="w-full  font-dm-sans bg-transparent py-4 text-xs text-gray-500 z-20 sticky bottom-0">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-28 flex flex-col  sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            A product of{" "}
            <a href="https://brillovate.com" target="blank" className="text-red-500">
               ⓒ Brillovate Pvt. Ltd.
            </a>{" "}
            All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link
              href={"/Privacy"}
              className="hover:underline cursor-pointer"
            >
              Privacy
            </Link>
            {/* <a href="#" className="hover:underline">Refund Policy</a> */}
            <Link
              href="/Term&condition"
              className="hover:underline cursor-pointer"
            >
              Terms of Use
            </Link>
            <Link
              // onClick={() => setShowPopup(true)}
              href="/support"
              className="hover:underline"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
