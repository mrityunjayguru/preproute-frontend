"use client";
import React, { useEffect, useState } from "react";
import SummaryTabs from "./component/SummaryTabs";
import { useSelector, useDispatch } from "react-redux";
import { getTopic } from "@/api/Topic";
import { AppDispatch } from "@/store/store";

import SocialMedia from "../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import Image from "next/image";

function UserResult() {
  const examResult = useSelector((state: any) => state.question?.result?.data);
  const dispatch = useDispatch<AppDispatch>();

  console.log(examResult);

  const getData = async () => {
    const payload: any = {};
    await dispatch(getTopic(payload));
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between ">
      {/* Top Header Bar */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-28">
        <div className="relative h-[140px] bg-[#F0F9FF] rounded-2xl px-6 sm:px-10 py-2  flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl  font-medium text-[#FF5635] font-poppins">
              Performance Analytics
            </h2>
            <p className="text-black font-dm-sans">
              Understand your strengths and improve where it matters.
            </p>
          </div>
          <div className="text-right flex flex-col justify-end items-end">
            <h2 className="text-xl font-medium text-gray-900 font-poppins">
              <span className="text-black">
                {examResult?.examdetail?.examname || "Mock Tests"}{" "}
              </span>
              <span className="text-[#FF5635] font-medium  text-xl sm:text-xl md:text-2xl">
                {examResult?.examdetail?.examType || "Mock Tests"}
              </span>
            </h2>
            <p className="text-black font-dm-sans text-sm mt-1">
              Attempted on{" "}
              {formatDate(examResult?.examdetail?.examDate) || "25 Dec 2025"}
            </p>
          </div>
        </div>

        {/* Summary Tabs */}
        <div className="mt-6">
          <SummaryTabs data={examResult} />
        </div>
      </div>
      <section className="w-full bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <SocialMedia />
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserResult;
