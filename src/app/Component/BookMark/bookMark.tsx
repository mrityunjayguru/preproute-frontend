"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import QuestionWiswView from "./component/QuestionWiswView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getboockMark } from "@/api/boockMark";
import SocialMedia from "../Home/_componets/social-media";
import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";

function BookMark() {
  const bookMarkdata = useSelector(
    (state: any) => state?.bookMark?.boockMark || []
  );

  console.log(bookMarkdata);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getboockMark({}));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-6 sm:px-8 md:px-12 lg:px-28 pb-12">
        <div className="relative bg-[#E8F4F8] rounded-lg px-8 py-5 mb-12 flex justify-between items-center">
          <div className="">
            <h1 className="text-[#FF5635] text-2xl md:text-3xl font-medium font-poppins">
              Bookmarked Question
            </h1>
            <p className="text-md text-gray-700 font-dm-sans max-w-xl">
              Understand your strengths and improve where it matters.
            </p>
          </div>
        </div>
        {bookMarkdata.map((val: any, index: number) => (
          <QuestionWiswView
            key={val?._id || index}
            question={val?.questionDetails || val?.question}
            examName={val?.examName || val?.paperDetails?.examName || ""}
            paperName={val?.paperName || val?.paperDetails?.paperName || ""}
            attemptDate={val?.attemptDate || val?.createdAt || val?.attemptedOn}
          />
        ))}
      </div>

      {/* Footer Section - Orange with Logo and Social Media */}
      <section className="bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 py-2 sm:py-5 lg:py-6 xl:py-8">
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

export default BookMark;
